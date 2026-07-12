---
layout: page
title: "ESP32 ATtiny UPDI Programmer"
categories: [microelectronics]
tags:
  - electronics
  - thunderbird
  - esp32
  - attiny
  - updi
  - programming
  - tooling
---

## Project Overview

A toolchain-agnostic ATtiny programming rig for the Smart Thunderbird project. An ESP32 dev board acts as a UPDI bridge; a Python CLI (`attiny-uploader`) streams Intel HEX firmware over USB serial. The host never speaks UPDI and the ESP32 never parses HEX. That split keeps either side swappable and lets any build system (PlatformIO, Arduino IDE, Make, CI) plug in as long as it produces a `.hex` file.

Primary target MCU: **ATtiny3216** (engine sensing node and other T-Bird sensor boards).

**Repo:** [smart_tbird/ESP32_UDPI_Programmer](https://github.com/alexanderenrique/smart_tbird/tree/platformIO/ESP32_UDPI_Programmer)  
**Work log:** [denton.works/microelectronics/ESP32_UPDI_Programmer/](https://denton.works/microelectronics/ESP32_UPDI_Programmer/)

```
[ Any Build System ] --> firmware.hex --> attiny-uploader (CLI) --USB Serial--> ESP32 --UPDI--> ATtiny3216
```

## Hardware wiring

| Signal | ESP32 GPIO | Target connection |
|--------|------------|-------------------|
| UPDI | GPIO 17 | ATtiny UPDI via **4.7 kΩ** series resistor |
| Target reset (optional) | GPIO 16 | ATtiny RESET (active low) |
| Target power (optional) | GPIO 18 | Load switch / MOSFET enable |
| Bridge RX (optional) | GPIO 25 | Target UART TX |
| Bridge TX (optional) | GPIO 26 | Target UART RX |
| GND | GND | ATtiny GND |

Provide target power from the board or through the optional power-control pin.

## Software layout

```
ESP32_UPDI_Programmer/
├── cli/                  # attiny-uploader Python package
│   └── attiny_uploader/  # hexfile, protocol, transport, uploader, cli
├── firmware/             # ESP32 PlatformIO project
│   └── src/
│       ├── updi/         # PHY, link, NVM layers
│       ├── command_parser.cpp
│       ├── stream_receiver.cpp
│       ├── uart_bridge.cpp
│       └── hw_control.cpp
└── test_attiny3216/      # blink + serial smoke-test firmware
```

### CLI commands

| Command | Purpose |
|---------|---------|
| `upload` (default) | Stream HEX to target; `--verify`, `--reset` |
| `read-signature` | Confirm MCU identity (3216 → `1E 95 21`) |
| `erase` | Chip erase |
| `reset` | Pulse target reset |
| `serial-monitor` | Bridge USB ↔ target UART (GPIO 25/26) |
| `test-run` | Stub that returns `NOT IMPLEMENTED` |

Global flags: `--port` (required), `--baud`, `--verbose`, `--json` (for CI).

### Host/device protocol

ASCII line commands at 115200 baud; programming data sent as 128-byte binary chunks with `OK` acks per chunk.

| Host sends | Device responds |
|------------|-----------------|
| `HELLO` | `OK ESP32-UPDI v1.0` |
| `BEGIN PROGRAM size=N addr=0xADDR` | `OK` |
| `<128-byte chunk>` | `OK` |
| `END PROGRAM` | `OK` |
| `VERIFY` | `OK` or `ERROR addr=0xXXXX` |
| `READ_SIGNATURE` | `OK 1E 95 21` |
| `ERASE` / `RESET` | `OK` |
| `SERIAL ON` / `SERIAL OFF` | `OK` |
| `POWER ON` / `POWER OFF` | `OK` |

## Build-system integration

PlatformIO custom upload:

```ini
upload_protocol = custom
upload_command = attiny-uploader --port $UPLOAD_PORT $SOURCE
```

Manual flow after build:

```bash
pio run
attiny-uploader --port /dev/ttyUSB0 --verify --reset .pio/build/<env>/firmware.hex
```

## Up Next

- Wire up a permanent programmer bench setup (ESP32 + 4.7 kΩ + breadboard headers)
- Flash engine sensing node firmware end-to-end via `attiny-uploader`
- Use `serial-monitor` to read ATtiny UART debug output through the bridge
- Integrate custom upload into the engine sensing node PlatformIO env
- Implement `test-run` for production-style smoke tests (blink, serial, signature check)

-----------------------------------

## Work Log

### 06/29/2026
**Main Task:** Square waves!

**Notes:**
- I slept on it, and decided to take a step way, way way back. I wrote a blink LED sketch at 0.125 Hz, which is 4 seconds mind you
- I learned to double check what directory you're uploading from in PIO. I uploaded from the wrong directory several times without noticing
- Once I got big old square waves on the LED, I moved to basic 10ms signals which felt good
- Then 0x55 repeating at 115200 baud, cool to see the bits at 8.4us and like be able to measure it
- Once that worked I moved to the actual programmer, which just wasn't sending anything useful at all. Like nothing
- It's weird/challenging because there is a pause orders of magnitude longer at the begginning then a bust of packets. And either it aint working or I haven't figured out how to capture it yet
- I'm thinking this may go on the back burner for a bit, I should start with a known good programmer and go from there.

### 06/28/2026
**Main Task:** Got the Ocilliscope, how does this thing work?

**Notes:**
- Took me a hot second, first day I didn't get anything useful or sensical from it on the first day
- I did learn how you're supposed to clip the leads though which was useful
- Started learning the menu's and what everything does
- Just got humbled, again. 


### 06/26/2026
**Main Task:** Actual first entry

**Notes:**
- I deceided that if there's an Arduino programmer out there, there had might as well be an ESP32 based one! How hard can it be (hahahah)
- I threw together something on cursor, it didn't work at all and the hard part was that you don't get any feedback, like if the ATtiny doesn't talk, it doesn't talk and I have no idea why
- I leared about tying the Rx and TX lines together to talk to the UPDI which makes sense if you think about it, just feels weird
  - So the ESP32 always hears its own echo which is kinda a good thing for debugging
- I got it to send and receive 0x55, which is good but nothing from the 3216
- I deceided to buy and oscilliscope which arrives Sunday

### 06/26/2026
**Main Task:** Document the ESP32 UPDI programmer project

**Notes:**
- Project is at v1.0. ESP32 firmware prints `READY ESP32-UPDI v1.0` on boot
- Python CLI is installable via `pip install -e .` from `cli/`; pytest coverage for HEX parsing and protocol handshake
- Firmware UPDI stack: `UpdiPhy` → `UpdiLink` → `UpdiNvm`, with `StreamReceiver` handling chunked program writes and `CommandParser` dispatching ASCII commands
- Optional extras baked in: target reset, power gating, UART bridge. Useful for bring-up without rewiring.
- `test_attiny3216/` has blink (PB1 LED) and serial (PA1 TX → ESP32 GPIO25) smoke tests for validating the pipeline
- Solves the "how do I program the ATtiny3216" blocker called out on the engine sensing node work log
