---
layout: page
permalink: /projects/desktop-chime/
tags: [attiny, rtc, solenoids, chime, kicad]
---

<div class="hero">
  <h2 class="hero__title">Desktop Chime</h2>
  <p class="hero__subtitle">An ATtiny3226 chime that strikes eight notes on the hour. No Wi‑Fi, no NTP — a battery-backed RTC keeps time, and a knob picks the song.</p>

  <div class="btn-row">
    <a class="btn btn--primary" href="{{ sources.desktopChime.repo }}" target="_blank" rel="noopener noreferrer">GitHub repo →</a>
    <a class="btn btn--secondary" href="{{ sources.desktopChime.pcbs }}" target="_blank" rel="noopener noreferrer">PCB files →</a>
    <a class="btn btn--secondary" href="{{ '/guides/desktop-chime/' | url }}">Build guide →</a>
    <a class="btn btn--secondary" href="{{ '/microelectronics/desktop-chime/' | url }}">Work log →</a>
  </div>
</div>

<div class="grid grid--3">
  <div class="card">
    <h3 class="card__title">Chimes on the hour</h3>
    <p class="card__description">Hour mode plays Westminster, then strikes low C once for each hour. The MCP7940N keeps time through power loss.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Eight solenoid strikers</h3>
    <p class="card__description">A TBD62785APG source-driver bank pulses the coils for 30 ms. Per-note LEDs fade out through an RC network.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Songs on a knob</h3>
    <p class="card__description">An 8-position rotary selects Off, Hour, or a stored melody. Play starts the song. Sync snaps the clock near the hour.</p>
  </div>
  <div class="card">
    <h3 class="card__title">No network</h3>
    <p class="card__description">Set the clock once over UPDI. After that it runs from a 12 V wall adapter and a coin cell on the RTC.</p>
  </div>
</div>

<div class="grid grid--2">
  <div class="card card--gallery">
    <h3 class="card__title">Gallery</h3>
    <div class="placeholder-image" aria-label="Desktop chime photos coming soon"></div>
  </div>
</div>

## Why I Built It

I really like the sounds of clock towers and bells chiming at the hour. Having a full suite of bells on your desk doesn't make too much sense, so I wanted to build the next best thing. And while I'm at it, if you're going to have 8 tone bars, you'd might as well have 8 solenoids and make it play some songs!

The electronics are an ATtiny3226, an MCP7940N real-time clock, and eight solenoid strikers aimed at a xylophone or aluminum tone bars. Melodies live in the firmware as note and delay arrays. The knob chooses what plays; the clock decides when.

## Key Specs

### Core Hardware
- MCU: ATtiny3226, SOIC-20W (UPDI on PA0)
- Timekeeping: MCP7940N in a DIP-8 socket, 32.768 kHz crystal, coin-cell backup
- Solenoid drive: TBD62785APG, 8-channel source array, DIP-18 (50 V, 500 mA)
- Strike pulse: 40 ms, active-high
- Notes: high C, B, A, G, F, E, D, low C (hour strikes on low C)
- Song select: RDS7-8S 8-position rotary
- Controls: Play (SW2) and clock Sync (SW1)
- Power: 12 V in, AP63205WU buck to a fixed 5 V rail for the logic
- Programming: SerialUPDI (PlatformIO, megaTinyCore)

### Knob map

| Position | Behavior |
|----------|----------|
| 0 | Off. Playback stops immediately. |
| 1 | Hour. Westminster plus low-C strikes at `:00`. Play starts Westminster only. |
| 2 | Ode to Joy. Play starts the song. |
| 3 | Mary Had a Little Lamb. |
| 4 | Hot Cross Buns. |
| 5 | Twinkle, Twinkle, Little Star. |
| 6 | Frère Jacques. |
| 7 | High–low scale. Loops while selected. |

Sync (SW1) snaps the RTC to the nearest hour if you press it between `:55` and `:05`. Outside that window it does nothing.

## Design Choices
- 12V power
  - I would have loved to use 5V power directly, but the solenoids do not repliably operate at 5V, hence why they are driven at 12V and then there is a buck converter down to 5V for the Attiny
- RTC instead of NTP time server
  - I want to be able to use this at work or anywhere without having to connect to the internet, plus I just wanted a reason to use these RTCs I've had laying around
- DIP components
  - I wanted this to be a bit of a design piece. It's a silly fun project and DIP components just look so cool I think
- LED RC fading
  - I didn't want the LEDs to just flash for 30 ms, that wouldn't look very cool or match the vibe, so I added rather large capacitors and resistors to get the LED to fade out slowly while still using the same signal pulse that fires the solenoid
- No 4.7kOhm I2C resistor on the RTC
  - This was kinda just a mess up, I think it should've had them, but I feel like I could get away without them. The time updates can be super super slow, and it won't live in an electrically noisy enviroment

## Source files

<div class="card">
  <h3 class="card__title">Repo, PCB, and firmware</h3>
  <p class="card__description">KiCad schematic and board are under <code>desktop-chime-pcb/</code>. Firmware is PlatformIO under <code>desktop-chime-code/attiny3226-chime</code>. Gerbers can be exported from the board file for whichever fab you use.</p>
  <a class="section__link" href="{{ sources.desktopChime.repo }}" target="_blank" rel="noopener noreferrer">Repository →</a>
  <a class="section__link" href="{{ sources.desktopChime.pcbs }}" target="_blank" rel="noopener noreferrer">PCB files →</a>
  <a class="section__link" href="{{ sources.desktopChime.firmware }}" target="_blank" rel="noopener noreferrer">Firmware →</a>
</div>

**Start here:** [Desktop Chime build guide]({{ '/guides/desktop-chime/' | url }})

## Documentation & support

<div class="related-content">
  <h3>Support checklist (placeholder)</h3>
  <div class="related-grid">
    <div class="related-card">
      <h4>Guide</h4>
      <p>Parts, soldering order, I2C pull-ups, UPDI flashing, clock set.</p>
    </div>
    <div class="related-card">
      <h4>Troubleshooting</h4>
      <p>"RTC stuck", "no strike", "wrong song", "Sync ignored".</p>
    </div>
    <div class="related-card">
      <h4>Revision/compatibility</h4>
      <p>PCB rev, ATtiny3226 vs earlier 3216 notes, solenoid voltage.</p>
    </div>
    <div class="related-card">
      <h4>Support</h4>
      <p>Photos of the board, UPDI log, and which rotary position you are in.</p>
    </div>
  </div>
</div>

**Build & support docs checklist:** [Build & support checklist (hardware)]({{ '/guides/support-checklist/' | url }})

## Quick links

- **Build guide:** [Desktop Chime]({{ '/guides/desktop-chime/' | url }})
- **BOM:** [desktop-chime-bom.csv]({{ '/guides/desktop-chime/desktop-chime-bom.csv' | url }})
- **Work log:** [Desktop Chime]({{ '/microelectronics/desktop-chime/' | url }})
- **GitHub:** [alexanderenrique/desktop-chime]({{ sources.desktopChime.repo }})
- **PCB:** [desktop-chime-pcb]({{ sources.desktopChime.pcbs }})
- **Firmware:** [desktop-chime-code]({{ sources.desktopChime.firmware }})
