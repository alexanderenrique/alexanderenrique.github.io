---
layout: page
permalink: /projects/attiny-e-ink/
tags: [attiny, e-ink, low-power, sd-card, kicad]
---

<div class="hero">
  <h2 class="hero__title">ATtiny E-Ink Display</h2>
  <p class="hero__subtitle">A low power e-ink display that shows a quote, then goes back to sleep. An ATtiny3226, an SD card, and a small LiPo — no Wi‑Fi, no Bluetooth, no app.</p>

  <div class="btn-row">
    <a class="btn btn--secondary" href="{{ '/microelectronics/attiny-e-ink/' | url }}">Work log →</a>
    <a class="btn btn--secondary" href="{{ '/projects/e-ink-display/' | url }}">The ESP32 version →</a>
  </div>
</div>

<figure class="board-figure">
  <model-viewer
    class="board-viewer"
    src="{{ '/assets/models/attiny-e-ink.glb' | url }}"
    alt="ATtiny e-ink display circuit board"
    camera-controls
    auto-rotate
    interaction-prompt="none"
    exposure="1.5"
    shadow-intensity="0.5"
    environment-image="neutral"
    tone-mapping="commerce"
    background-color="#f6bd60">
  </model-viewer>
  <figcaption class="section__caption">Board model from KiCad. Drag to orbit.</figcaption>
</figure>

<div class="grid grid--3">
  <div class="card">
    <h3 class="card__title">Quotes on a card</h3>
    <p class="card__description">A microSD holds the text. A 128 MB SD card can hold a lifetime of quotes, and changing them doesn't take a programmer.</p>
  </div>
  <div class="card">
    <h3 class="card__title">No radio</h3>
    <p class="card__description">The ESP32, Wi‑Fi, and Bluetooth setup are gone. The button refreshes the screen. There is nothing to pair.</p>
  </div>
  <div class="card">
    <h3 class="card__title">A year on a small cell</h3>
    <p class="card__description">A ~150 mAh pouch is the target. The radio is gone, the refresh is infrequent, and the loads that don't need to be on get gated off.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Flat on purpose</h3>
    <p class="card__description">The board takes one half of the enclosure and the cell takes the other, so the whole thing stays ultra thin. Stick it to a fridge, place it on your desk</p>
  </div>
</div>

## Why I Built It

The [first e-ink display]({{ '/projects/e-ink-display/' | url }}) did a lot. It logged temperature and humidity, joined Wi‑Fi, and could be configured over Bluetooth. It was a good lab tool. After handing a few out to friends, the whole wifi and BLE configuration turned out to be more of a headache than it was worth. You change your wifi password and now the display doesn't work, or my Rasperry Pi server quits and the display doesn't work. I want something that people could edit really simply, and would just work.

I wanted to do a redesign at somepoint because I was baffled how bad the battery life of the ESP32 version was. It was also my first PCB design ever and I thought it could use a refresh. The impetus was a book with lots of highlighted quotes that I receied from my father in law. I wanted a small thing that could show one quote, e-ink style, and just stay there. Helping to keep these quotes top of mind. Once that was the job, the ESP32 stopped earning its keep. I don't care about earthquakes or where the ISS is, and I don't want a configuration app. Pop in an SD card, it cycles through whatever is on the card, and that's the product.

Taking the radio out is what makes the battery honest. Sleep hard, gate the parts that don't need to be awake, and a small pouch cell can last about a year if the firmware actually sleeps. A 500 mAh pack would have worked too, and it was getting expensive for a run of these. The smaller cell also keeps the profile low, which is the whole point of splitting the enclosure between board and battery.

## Key Specs

### Core Hardware
- MCU: ATtiny3226, 20-SOIC.
- Storage: microSD, 128 MB is a ton of pure text
- Wake: button mounted on the top. A press refreshes the screen.
- Refresh: User configurable but defaults to 7 hours, plus the button.
- Power: LiPo pouch at 3.3 V, a low-Iq LDO, and a BMS for charging
- Charge port: USB-C, power-only receptacle
- Power gating: P-channel MOSFETs for the display, the SD card, the battery divider
- Battery sense: resistor divider
- Target cell: 150 mAh nominal
- Enclosure, inside: about 43 × 96 mm. The board is roughly half of that, and the cell is the other half.

## Design Choices

The 3226 has been my go-to for non-wifi projects. I've come to really like the form factor and capabilities, as well as the UPDI does make flashing it really easy.

Nothing on this board speaks USB. After the first set of boards went out for fabrication I redrew the connector as a power-only USB-C receptacle. It only has to charge.

The loads are gated individually: display, SD card, the battery divider, and the sensor. A divider that sits across the cell all year is a leak, and an SD card that stays powered is worse. The top button refreshes the display on demand

A magnet on the back, so it can live on a fridge, is still a maybe.

## Status

Schematic and layout for the first spin are done. I imported the 3D models into KiCad and assigned them to the footprints, mostly so I could see the little button on the board before anything was ordered. Three boards from that revision are in fabrication. The power-only USB-C change is already in the next revision.

## Quick links

- **Work log:** [ATtiny e-ink]({{ '/microelectronics/attiny-e-ink/' | url }})
- **The display this replaces on the desk:** [Battery-powered ESP32 e-ink display]({{ '/projects/e-ink-display/' | url }})
