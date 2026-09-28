---
layout: page
title: "Desktop Chime guide"
description: "Parts, assembly, and UPDI firmware for the ATtiny3226 desktop chime"
permalink: /guides/desktop-chime/
---

## What this is

A shelf chime that strikes tone bars with solenoids. An ATtiny3226 plays songs stored in firmware. An MCP7940N real-time clock, with its own coin cell, keeps the hour so the board never needs Wi‑Fi. Full specs are on the [Desktop Chime project page]({{ '/projects/desktop-chime/' | url }}).

## Architecture

{% mermaid %}
flowchart LR
  RTC["RTC (MCP7940N) + coin cell"] --> MCU["ATtiny3226"]
  KNOB["Song knob"] --> MCU
  PLAY["Play"] --> MCU
  SYNC["Sync"] --> MCU
  MCU --> DRV["8 Channel Solenoid Driver"]
  MCU --> LED["LEDs + RC fade"]
  DRV --> SOL["8 solenoids"]
  SOL --> BARS["Tone bars"]
  PWR["12 V in"] --> BUCK["AP63205 → 5 V"]
  PWR --> DRV
  BUCK --> MCU
  BUCK --> RTC
{% endmermaid %}

## Build flow

### 1. Get the board files

- **Repository:** [alexanderenrique/desktop-chime]({{ sources.desktopChime.repo }})
- **PCB:** [desktop-chime-pcb]({{ sources.desktopChime.pcbs }}) — open `desktop-chime-pcb.kicad_pro` in KiCad and export Gerbers, or send the project to a fab that accepts KiCad
- **Firmware:** [desktop-chime-code]({{ sources.desktopChime.firmware }}) — PlatformIO project in `attiny3226-chime`
- **BOM:** <a href="{{ '/guides/desktop-chime/desktop-chime-bom.csv' | url }}" download="desktop-chime-bom.csv">desktop-chime-bom.csv</a> — board parts from the KiCad export, plus the solenoids, coin cell, I2C pull-ups, and tone bars. Passives are 1206 unless the file says otherwise.

### 2. Parts that are not on the schematic

- Eight **12 V solenoids**, a **12 V** supply, a **coin cell** for BT1, and the bars or xylophone you want to hit
- You'll also have to design your own solenoid holder (remind me to upload my design and the xylophone I used)
- A **SerialUPDI** programmer, the MPlab SNAP is the go-to here. Maybe you've had better luck with other Attiny Programmers, but I haven't!

### 3. Solder the board

Order is not critical. A reasonable sequence:

1. 1206 passives: resistors, then capacitors, then the 4.7 µH inductor
2. SOIC parts: ATtiny3226 (U1) and the SOIC-16 diode (D5)
3. AP63205WU (U3, TSOT-23-6). Tin one pad, place the part, then solder the rest.
4. Through-hole: MCP7940N socket, TBD62785APG, tactile switches, rotary switch, LEDs, the 100 µF radial, pin sockets, coin-cell holder
5. Add the two I2C pull-ups from SDA and SCL to 5 V before you power the RTC
6. Leave the solenoids disconnected until each channel has been pulsed on the bench

### 4. Flash the firmware

Firmware is [PlatformIO](https://platformio.org/) with megaTinyCore (`board = ATtiny3226`, `upload_protocol = serialupdi`). From `desktop-chime-code/attiny3226-chime`, set the UPDI serial port (for example `/dev/cu.usbserial-XXXX`).

The main firmware does not overwrite a running clock on boot. Set the time once with the compile-time clock image:

```bash
pio run -e set_clock -t upload --upload-port /dev/cu.usbserial-XXXX
```

`set_clock` writes the firmware compile date and time into the MCP7940N, enables the oscillator and VBAT, and checks the readback. Success is three blinks on low C. Failure is one long blink.

Then flash the chime application:

```bash
pio run -e chime -t upload --upload-port /dev/cu.usbserial-XXXX
```

You can unplug power after that. The coin cell should hold the time.

Host tests for the rotary decoder, sync window, hourly schedule, and melodies:

```bash
./native/run_tests.sh
```

### 5. Bring-up

1. Confirm the external I2C pull-ups are fitted.
2. With the coils disconnected or current-limited, pulse CH1–CH8 and check the silkscreen order: high C, B, A, G, F, E, D, low C.
3. Walk the rotary through positions 0–7.
4. Position 1: move the RTC toward `:00` and confirm Westminster plus the hour count on low C, once.
5. Positions 2–6: press Play and confirm the song. On position 1, Play starts Westminster only.
6. Position 7: the high–low scale starts on its own and repeats until you leave the position.
7. Press Sync inside ±5 minutes of the hour and confirm the clock snaps. Outside that window, nothing changes.
8. Position 0 during playback: strikers go idle immediately.

Booting in Hour mode during minute `00` does not catch up a missed chime. Each hour fires at most once.

## Modes

| Position | Song / behavior |
|----------|-----------------|
| 0 | Off |
| 1 | Hour — Westminster and low-C strikes at `:00` |
| 2 | Ode to Joy |
| 3 | Mary Had a Little Lamb |
| 4 | Hot Cross Buns |
| 5 | Twinkle, Twinkle, Little Star |
| 6 | Frère Jacques |
| 7 | High–low scale, loops while selected |

**Play (SW2, PC3)** is active-low. It starts the song in positions 1–6 and restarts the scale in position 7.

**Sync (SW1, PA1)** is active-low. Inside `:55`–`:05` it snaps the RTC to the nearest hour.

## Pin map

| Function | Pin |
|----------|-----|
| High C (CH1) | PB2 |
| B (CH2) | PB3 |
| A (CH3) | PB4 |
| G (CH4) | PB5 |
| F (CH5) | PA7 |
| E (CH6) | PA6 |
| D (CH7) | PA5 |
| Low C (CH8) | PA4 |
| I2C SDA | PB1 |
| I2C SCL | PB0 |
| Rotary ×1 | PC1 |
| Rotary ×2 | PC0 |
| Rotary ×4 | PC2 |
| Play | PC3 |
| Sync | PA1 |
| UPDI | PA0 |

Solenoid outputs are active-high into the TBD62785APG. Strike width is 40 ms.
