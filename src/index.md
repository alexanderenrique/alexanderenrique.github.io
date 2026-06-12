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

    <section class="section section--blog">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title">Work logs</h2>
                <p class="section__description">Work logs documenting projects across coding, wrenching, microelectronics, and general learnings. Explore <a href="{{ '/coding/' | url }}">coding projects</a> like NEMO lab management tools, <a href="{{ '/wrenching/thunderbird-restomod/' | url }}">Thunderbird restomod</a>, <a href="{{ '/microelectronics/Smart-T-Bird/' | url }}">electronics integration</a>, and <a href="{{ '/general/Today-I-Learned/' | url }}">daily discoveries</a>.</p>
                <a href="{{ '/coding/' | url }}" class="section__link">Browse work logs →</a>
            </div>
            <div class="section__image">
                <img src="{{ '/images/pandas3.png' | url }}" alt="Blog">
            </div>
        </div>
    </section>
</div>