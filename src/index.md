---
layout: base.njk
title: Denton Works
description: One curious engineer's journey through wrenching, software, and microelectronics projects
---

<figure class="home-banner">
    <img src="{{ '/images/t-bird.jpeg' | url }}" alt="Light blue Thunderbird towing a dirt bike trailer across the desert">
</figure>

<div class="hero">
    <h1 class="hero__title">Welcome to Denton Works</h1>
    <p class="hero__subtitle">One curious engineer's journey through wrenching, software, and microelectronics projects</p>
</div>

<div class="sections">
    <section class="section section--hardware">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title"><a href="{{ '/projects/hardware/' | url }}">Hardware</a></h2>
                <p class="section__description">PCBs, firmware, and shop builds. From wall-mounted lab displays to classic-car electronics.</p>
                <a href="{{ '/projects/hardware/' | url }}" class="section__link">Browse hardware →</a>
            </div>
            <figure class="section__image">
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
                <figcaption class="section__caption">ATtiny e-ink display board. Drag to orbit.</figcaption>
            </figure>
        </div>
    </section>

    <section class="section section--software">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title"><a href="{{ '/projects/software/' | url }}">Software</a></h2>
                <p class="section__description">NEMO plugins</p>
                <a href="{{ '/projects/software/' | url }}" class="section__link">Browse software →</a>
            </div>
            <figure class="section__image">
                <div class="section__crop">
                    <img src="{{ '/images/monitors-screenshot.png' | url }}" alt="Hafnia thickness chart in the NEMO monitors plugin">
                </div>
                <figcaption class="section__caption">Lab mangement system plugins</figcaption>
            </figure>
        </div>
    </section>

    <section class="section section--ideas">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title"><a href="{{ '/projects/not-so-good-ideas/' | url }}">Not So Good Ideas</a></h2>
                <p class="section__description">Things I thought were a good idea but weren't, and this is my attempt to broaden human knowledge. Because what doesn't work is almost as important as what does work.</p>
                <a href="{{ '/projects/not-so-good-ideas/' | url }}" class="section__link">Browse not so good ideas →</a>
            </div>
            <figure class="section__image section__image--portrait">
                <img src="{{ '/images/nitro-motor.jpeg' | url }}" alt="Small nitromethane model engine">
                <figcaption class="section__caption">The nitromethane pencil sharpener motor</figcaption>
            </figure>
        </div>
    </section>

    <section class="section section--blog">
        <div class="section__content section__content--stack">
            <div class="section__text">
                <h2 class="section__title">Work logs</h2>
                <p class="section__description">Work logs documenting projects across software, wrenching, microelectronics, and general learnings. Explore <a href="{{ '/coding/' | url }}">software projects</a> like NEMO lab management tools, <a href="{{ '/wrenching/thunderbird-restomod/' | url }}">Thunderbird restomod</a>, <a href="{{ '/microelectronics/T-bird_electronics/' | url }}">T-Bird electronics</a>, and <a href="{{ '/general/Today-I-Learned/' | url }}">daily discoveries</a>.</p>
                <a href="{{ '/work-logs/' | url }}" class="section__link">Browse work logs →</a>
            </div>
            {% set mode = "compact" %}
            {% include "work-log-stats.njk" %}
        </div>
    </section>
</div>
