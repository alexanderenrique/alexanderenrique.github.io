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
                <p class="section__description">Configure and install firmware for ESP32 battery-powered e-ink displays. Use the <a href="{{ '/e-ink/' | url }}">e-ink display portal</a> to set up your displays wirelessly via Bluetooth Low Energy (BLE), or install firmware directly from your browser.</p>
                <a href="{{ '/e-ink/' | url }}" class="section__link">E-Ink Display →</a>
            </div>
            <div class="section__image">
                <div class="placeholder-image">📱</div>
            </div>
        </div>
    </section>

    <section class="section section--nemo-mqtt">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title">NEMO MQTT &amp; Tool Display</h2>
                <p class="section__description">Real-time tool status from NEMO to wall-mounted ESP32 displays over MQTT: Django plugin, bridge service, and firmware. Read the <a href="{{ '/nemo-mqtt/' | url }}">project overview</a> for architecture and links to the bridge package and hardware notes.</p>
                <a href="{{ '/nemo-mqtt/' | url }}" class="section__link">NEMO MQTT →</a>
            </div>
            <div class="section__image">
                <div class="placeholder-image">📡</div>
            </div>
        </div>
    </section>

    <section class="section section--smart-scale">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title">Smart Scale</h2>
                <p class="section__description">Hot-plate safety using a load cell, temperature sensing, and a finite-state machine—status on a touchscreen, minimal manual taring. Start with the <a href="{{ '/smart-scale/' | url }}">overview</a>, then dive into the full notes and work log.</p>
                <a href="{{ '/smart-scale/' | url }}" class="section__link">Smart Scale →</a>
            </div>
            <div class="section__image">
                <div class="placeholder-image">⚖️</div>
            </div>
        </div>
    </section>

    <section class="section section--blog">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title">Blog</h2>
                <p class="section__description">Work logs documenting projects across coding, wrenching, microelectronics, and general learnings. Explore <a href="{{ '/coding/' | url }}">coding projects</a> like NEMO lab management tools, <a href="{{ '/wrenching/thunderbird-restoration/' | url }}">classic car restoration</a>, <a href="{{ '/microelectronics/Smart-T-Bird/' | url }}">electronics integration</a>, and <a href="{{ '/general/Today-I-Learned/' | url }}">daily discoveries</a>.</p>
                <a href="{{ '/coding/' | url }}" class="section__link">View Blog →</a>
            </div>
            <div class="section__image">
                <img src="{{ '/images/pandas3.png' | url }}" alt="Blog">
            </div>
        </div>
    </section>
</div>