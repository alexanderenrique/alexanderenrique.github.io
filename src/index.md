---
layout: base.njk
title: Denton Works
description: One curious engineer's journey through wrenching, coding, and microelectronics projects
---

<div class="hero">
    <h1 class="hero__title">Welcome to Denton Works</h1>
    <p class="hero__subtitle">One curious engineer's journey through wrenching, coding, and microelectronics projects</p>
</div>

<div class="sections">
    <section class="section section--eink">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title">E-Ink Display</h2>
                <p class="section__description">Configure and install firmware for ESP32 battery-powered e-ink displays. Use the <a href="{{ '/guides/e-ink/#e-ink-portal' | url }}">e-ink display portal</a> to set up your displays wirelessly via Bluetooth Low Energy (BLE), or install firmware directly from your browser.</p>
                <a href="{{ sources.eInkDisplay.repo }}" class="section__link" target="_blank" rel="noopener noreferrer">GitHub &amp; PCBs →</a>
                <a href="{{ '/guides/e-ink/#e-ink-portal' | url }}" class="section__link">E-Ink Display portal →</a>
            </div>
            <div class="section__image">
                <img src="{{ '/images/IMG_9717.jpeg' | url }}" alt="E-Ink Display">
            </div>
        </div>
    </section>

    <section class="section section--nemo-mqtt">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title">NEMO MQTT &amp; Tool Display</h2>
                <p class="section__description">Real-time tool status from NEMO to wall-mounted ESP32 displays over MQTT: Django plugin, bridge service, and firmware. Read the <a href="{{ '/guides/nemo-mqtt/' | url }}">project overview</a> for architecture and links to the bridge package and hardware notes.</p>
                <a href="{{ sources.nemoMqtt.repo }}" class="section__link" target="_blank" rel="noopener noreferrer">GitHub &amp; PCBs →</a>
                <a href="{{ '/guides/nemo-mqtt/' | url }}" class="section__link">NEMO MQTT →</a>
            </div>
            <div class="section__image">
                <img src="{{ '/images/IMG_0030.jpeg' | url }}" alt="NEMO MQTT tool display">
            </div>
        </div>
    </section>

    <section class="section section--alternator-555">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title">Alternator 555 Timer</h2>
                <p class="section__description">A compact analog delay board for classic cars with upgraded alternators. Holds the field off for ~10 seconds after start so V-belts get traction before the load hits, no microcontroller, no firmware. Built for my <a href="{{ '/wrenching/thunderbird-restomod/' | url }}">Thunderbird restomod</a>.</p>
                <a href="{{ sources.alternator555Timer.repo }}" class="section__link" target="_blank" rel="noopener noreferrer">GitHub &amp; PCBs →</a>
                <a href="{{ '/projects/alternator-555-timer/' | url }}" class="section__link">Project page →</a>
            </div>
            <div class="section__image">
                <img src="{{ '/images/555_pcb.png' | url }}" alt="Alternator 555 Timer PCB layout">
            </div>
        </div>
    </section>

    <section class="section section--desktop-chime">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title">Desktop Chime</h2>
                <p class="section__description">An ATtiny3226 desktop chime that strikes eight notes on the hour. A battery-backed RTC keeps time with no Wi‑Fi, a knob picks the song, and solenoids hit the bars. Read the <a href="{{ '/guides/desktop-chime/' | url }}">build guide</a> for assembly, the BOM, and how to set the clock.</p>
                <a href="{{ sources.desktopChime.repo }}" class="section__link" target="_blank" rel="noopener noreferrer">GitHub &amp; PCBs →</a>
                <a href="{{ '/projects/desktop-chime/' | url }}" class="section__link">Project page →</a>
            </div>
            <div class="section__image">
                <div class="placeholder-image" aria-label="Desktop chime photos coming soon"></div>
            </div>
        </div>
    </section>

    <section class="section section--ideas">
        <div class="section__content section__content--stack">
            <div class="section__text">
                <h2 class="section__title">Not So Good Ideas</h2>
                <p class="section__description">Things I thought were a good idea but weren't, and this is my attempt to broaden human knowledge. Because what doesn't work is almost as important as what does work.</p>
            </div>
            <div class="idea-list">
                <a class="idea-card" href="{{ '/projects/nitro-sharpener/' | url }}">
                    <h3 class="idea-card__title">Nitromethane Pencil Sharpener</h3>
                    <p class="idea-card__description">A model-engine sharpener for the desk. Fast spinning parts, fumes you cannot tame, and fuel that evaporates.</p>
                    <span class="idea-card__cta">Project page →</span>
                </a>
                <a class="idea-card" href="{{ '/projects/esp32-updi-programmer/' | url }}">
                    <h3 class="idea-card__title">ESP32 UPDI Programmer</h3>
                    <p class="idea-card__description">An ESP32 that was supposed to program ATtiny chips over UPDI. It mostly taught me to buy a real programmer.</p>
                    <span class="idea-card__cta">Project page →</span>
                </a>
                <a class="idea-card" href="{{ '/projects/pagemap/' | url }}">
                    <h3 class="idea-card__title">PageMap</h3>
                    <p class="idea-card__description">A PDF reader that treats each page like a map, running on an ESP32-S3. The tiles worked. Reading did not.</p>
                    <span class="idea-card__cta">Project page →</span>
                </a>
            </div>
        </div>
    </section>

    <section class="section section--blog">
        <div class="section__content section__content--stack">
            <div class="section__text">
                <h2 class="section__title">Work logs</h2>
                <p class="section__description">Work logs documenting projects across coding, wrenching, microelectronics, and general learnings. Explore <a href="{{ '/coding/' | url }}">coding projects</a> like NEMO lab management tools, <a href="{{ '/wrenching/thunderbird-restomod/' | url }}">Thunderbird restomod</a>, <a href="{{ '/microelectronics/T-bird_electronics/' | url }}">T-Bird electronics</a>, and <a href="{{ '/general/Today-I-Learned/' | url }}">daily discoveries</a>.</p>
                <a href="{{ '/work-logs/' | url }}" class="section__link">Browse work logs →</a>
            </div>
            {% set mode = "compact" %}
            {% include "work-log-stats.njk" %}
        </div>
    </section>
</div>