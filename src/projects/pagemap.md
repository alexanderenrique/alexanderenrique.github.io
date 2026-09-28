---
layout: page
permalink: /projects/pagemap/
tags: [esp32, pdf, lvgl, reader]
---

<div class="hero">
  <h2 class="hero__title">PageMap</h2>
  <p class="hero__subtitle">A PDF reader that treats a page like a map. Pan and zoom the original layout on a 7-inch ESP32-S3. No reflow, and no PDF parser on the chip. It never felt like reading.</p>

  <div class="btn-row">
    <a class="btn btn--primary" href="{{ sources.pageMap.repo }}" target="_blank" rel="noopener noreferrer">GitHub repo →</a>
  </div>
</div>

<div class="grid grid--3">
  <div class="card">
    <h3 class="card__title">Pages, not reflow</h3>
    <p class="card__description">Figures, tables, and two-column papers stay where the PDF put them. Zoom in on a graph the way you zoom in on a map.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Tiles, not pages</h3>
    <p class="card__description">A desktop tool rasterizes each page into a zoom pyramid of 256×256 JPEGs. The ESP32 only decodes what is on screen.</p>
  </div>
  <div class="card">
    <h3 class="card__title">The wrong computer</h3>
    <p class="card__description">An 800×480 panel and 8 MB of PSRAM can show a tile. They cannot make turning the page feel instant.</p>
  </div>
</div>

## The concept

I wanted a portable reader for papers and textbooks that did not reflow the page into a column of text. Engineering PDFs are the layout. If you throw that away, the figures stop meaning what they meant.

An ESP32 cannot parse a PDF, and it should not try. So PageMap splits the work the way a map app does:

1. On a computer, `docpack` rasterizes each page at 300 DPI, builds a dyadic zoom pyramid (`z0` overview up through the full-resolution level), and chops every level into 256×256 JPEG tiles.
2. That package goes on a microSD card: `manifest.json`, a cover, and one directory per page.
3. On a Waveshare ESP32-S3 7-inch touch LCD (800×480, 8 MB PSRAM), the firmware asks which tiles intersect the viewport, decodes those JPEGs, and composites them. Pinch, drag, turn the page.

The device never holds a full high-resolution page. That part is the right idea for this chip. Memory stays bounded. A corrupt tile can be a grey square instead of a crash.

## Why it wasn't

The reader behaved like a tile cache, because it was one.

**Copying a book took forever.** One textbook became thousands of tiny JPEGs. FAT32 is miserable at that. The copy to the SD card was the slow part, not the card's speed class. Packing each page's tiles into a single `tiles.bin` (a header, an offset table, then concatenated JPEGs) fixed the copy. It did not fix reading.

**Page turns painted one square at a time.** You could watch the grid fill in. A page turn should be a page, then the next page.

**Zooming flashed grey.** Tiles would show the right image for a moment and then go back to empty grey, several panels at once. The cache, the viewport, and the display were not agreeing about which pixels were current.

**Panning was sluggish.** Scrolling around a zoomed page worked, and it felt like work. An 800×480 RGB panel, software compositing, and SD reads on every gesture is a lot to ask of an ESP32-S3 if what you wanted was to read.

**Dynamic zoom is not a thing at this compute level.** It had to be thousands of JPEGs with discrete zoom levels because I don't think there is any way that the ESP32 could dynamically compute the scaling. Maybe someone proves me wrong...

There were smaller versions of the same mistake along the way. A 64 GB card can show up as a few hundred megabytes if an old partition is all the firmware mounts, because it mounts the first FAT volume and ignores the rest. Cards bigger than 32 GB arrive as exFAT, which this firmware cannot mount. None of that is the concept failing. It is the tax you pay for pretending an SD card is a library.

A tablet already does this. A laptop already does this. The constraint I chose — ESP32, no PDF on the device, pre-tiled JPEGs — produced a worse reader than the thing I was trying not to carry.

## What was still true

- Precompute the expensive work. Rasterizing a PDF on the ESP32 was never going to be the design.
- Decode only the visible region. A full-page bitmap at 300 DPI does not fit, and you do not need it.
- Do not store a zoom pyramid as one file per tile on FAT32. Tens of thousands of small files will dominate copy time no matter how fast the card is. A seekable blob per page is the boring fix.
- Format the card as one FAT32 volume on an MBR partition, covering the whole device. Anything else and the reader sees a slice of the card.
- If the interaction you want is "turn the page and it is there," this hardware is the wrong place to build it.

## Quick links

- **Repo:** [PageMap]({{ sources.pageMap.repo }})
- **Hardware:** Waveshare ESP32-S3-Touch-LCD-7, 800×480, GT911 touch, SPI microSD, 8 MB octal PSRAM
