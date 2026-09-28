---
layout: page
permalink: /projects/esp32-updi-programmer/
tags: [esp32, attiny, updi, programming]
---

<div class="hero">
  <h2 class="hero__title">ESP32 UPDI Programmer</h2>
  <p class="hero__subtitle">An ESP32 that was supposed to program ATtiny chips over a single wire. The host would send a HEX file. The ESP32 would speak UPDI. Any build system could plug in. The ATtiny never answered.</p>

  <div class="btn-row">
    <a class="btn btn--primary" href="{{ sources.esp32UpdiProgrammer.repo }}" target="_blank" rel="noopener noreferrer">GitHub repo →</a>
    <a class="btn btn--secondary" href="{{ '/microelectronics/ESP32_UPDI_Programmer/' | url }}">Work log →</a>
  </div>
</div>

<div class="grid grid--3">
  <div class="card">
    <h3 class="card__title">HEX in, UPDI out</h3>
    <p class="card__description">A Python CLI streams Intel HEX over USB serial. The ESP32 never parses HEX, and the computer never speaks UPDI.</p>
  </div>
  <div class="card">
    <h3 class="card__title">One wire, tied together</h3>
    <p class="card__description">UPDI is a single pin. RX and TX get tied through a 4.7 kΩ resistor, so the ESP32 hears its own echo.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Silence is the error</h3>
    <p class="card__description">If the ATtiny doesn't talk, it just doesn't talk. There is no useful failure message to debug against.</p>
  </div>
</div>

## Why I thought this was a good idea

The engine sensing node on the Thunderbird uses an ATtiny3216. Programming it means UPDI, which is Microchip's single-wire debug interface. I already had ESP32 boards on the bench, and the thought was simple: if there is an Arduino programmer, there might as well be an ESP32 one. How hard can it be.

The split was the part I still like. Any build system that can emit a `.hex` file — PlatformIO, Arduino, Make, CI — hands that file to `attiny-uploader`. The CLI talks a small ASCII protocol at 115200 baud. The ESP32 firmware owns the UPDI stack (`UpdiPhy` → `UpdiLink` → `UpdiNvm`) and writes the target. Optional pins for reset, power, and a UART bridge were there so bring-up wouldn't mean rewiring every time.

```
[ Any build system ] --> firmware.hex --> attiny-uploader --USB--> ESP32 --UPDI--> ATtiny3216
```

UPDI itself is GPIO 17 on the ESP32, through a **4.7 kΩ** series resistor, to the ATtiny UPDI pin. Grounds tied. That is the whole "programmer."

## What actually happened

The first firmware, thrown together in a hurry, sent nothing the chip understood. The hard part is the feedback: a dead target and a wrong baud look the same. Silence.

Tying RX and TX together is correct for a single-wire bus, and it feels wrong the whole time you are doing it. The ESP32 always hears itself. That echo is useful once you know to expect it, and it is a trap before you do.

I got repeating `0x55` bytes across the wire. I did not get a signature back from a fresh 3216. Three chips, same silence. I bought an oscilloscope.

The scope took a day to become useful. Once it was, a slow blink sketch and a 10 ms square wave looked fine, and `0x55` at 115200 showed up as bits about 8.4 µs wide. The actual programmer did not. There is a long pause, then a short burst, and either the burst is wrong or the scope isn't catching it. After a couple of days of that I put the project on the back burner and went back to a known-good programmer.

Later ATtiny work, including the [desktop chime]({{ '/projects/desktop-chime/' | url }}), just uses SerialUPDI with an MPLAB SNAP. That was the whole lesson.

## What I'd tell someone else

Buy the programmer. A SNAP, or any SerialUPDI adapter people already trust, is a tool. An ESP32 bridge is a second project, and it will block the first one.

If you do build a bridge anyway:

- Prove the wire with a scope before you trust a protocol stack. `0x55` at the baud rate you claim is the cheapest test that means something.
- Expect the echo. On a single-wire bus the transmitter is also the receiver.
- Don't treat "no response" as a firmware bug until you have seen the target's pin move. The chip is allowed to ignore you.
- Keep the HEX parser on the computer. That part of the design was right. The ESP32 should be a dumb UPDI modem, not a build system.

## Wiring, for the record

| Signal | ESP32 GPIO | Target |
|--------|------------|--------|
| UPDI | GPIO 17 | ATtiny UPDI, via 4.7 kΩ |
| Reset (optional) | GPIO 16 | ATtiny RESET, active low |
| Power enable (optional) | GPIO 18 | Load switch |
| Bridge RX / TX (optional) | GPIO 25 / 26 | Target UART |
| GND | GND | ATtiny GND |

## Quick links

- **Repo:** [smart_tbird / ESP32_UDPI_Programmer]({{ sources.esp32UpdiProgrammer.repo }})
- **Work log:** [ESP32 ATtiny UPDI Programmer]({{ '/microelectronics/ESP32_UPDI_Programmer/' | url }})
- **The board I was trying to program:** [Engine sensing node]({{ '/microelectronics/engine_sensing_node/' | url }})
