---
layout: base.njk
title: Welcome to Denton Works
description: One person's journey through wrenching, coding, and microelectronics projects! This is where I document my adventures and share my work with the lofty goal of making the world a better place. Or maybe just fixing some old broken stuff and learning new things along the way.
---

<div class="hero">
    <h1 class="hero__title">Welcome to Denton Works</h1>
    <p class="hero__subtitle">My journey through wrenching, coding, and microelectronics projects! This is where I document my adventures and share my work with the lofty goal of making the world a better place. Or maybe just fixing some old broken stuff and learning new things along the way.</p>
</div>

<div class="sections">
    <section class="section section--wrenching">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title">Wrenching Projects</h2>
                <p class="section__description">Classic car restoration and mechanical projects. Currently working on a <strong>1968 Thunderbird</strong> restoration - see <a href="{{ '/wrenching/thunderbird-restoration/' | url }}">thunderbird-restoration</a> for details.</p>
                <a href="{{ '/wrenching/' | url }}" class="section__link">View All Projects →</a>
            </div>
            <div class="section__image">
                <img src="{{ '/images/fz-sticker.png' | url }}" alt="FZ Sticker" style="max-width: 100%; height: auto; border-radius: 8px;">
            </div>
        </div>
    </section>

    <section class="section section--coding">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title">Coding Projects</h2>
                <p class="section__description">Software tools and automation projects, including <strong>NEMO lab management</strong> tools and <strong>AI chatbots</strong> - see <a href="{{ '/coding/nemo-merger/' | url }}">NEMO Merger</a> and <a href="{{ '/coding/chatbot/WorkLog/' | url }}">WorkLog Bot</a> for details.</p>
                <a href="{{ '/coding/' | url }}" class="section__link">View All Projects →</a>
            </div>
            <div class="section__image">
                <div class="placeholder-image">💻</div>
            </div>
        </div>
    </section>

    <section class="section section--microelectronics">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title">Microelectronics</h2>
                <p class="section__description">Modern electronics integration for classic cars and embedded systems projects - see <a href="{{ '/microelectronics/Smart-T-Bird/' | url }}">Smart-T-Bird</a> for the Thunderbird electronics project.</p>
                <a href="{{ '/microelectronics/' | url }}" class="section__link">View All Projects →</a>
            </div>
            <div class="section__image">
                <div class="placeholder-image">⚡</div>
            </div>
        </div>
    </section>

    <section class="section section--general">
        <div class="section__content">
            <div class="section__text">
                <h2 class="section__title">General Knowledge</h2>
                <p class="section__description">Daily learnings, project ideas, and miscellaneous thoughts - see <a href="{{ '/general/Today-I-Learned/' | url }}">Today-I-Learned</a> for daily discoveries.</p>
                <a href="{{ '/general/' | url }}" class="section__link">View All Content →</a>
            </div>
            <div class="section__image">
                <div class="placeholder-image">📚</div>
            </div>
        </div>
    </section>
</div>