---
layout: page
title: "Work logs"
description: "Running notes, day-by-day progress, and the messy middle"
permalink: /work-logs/
---

<div class="grid grid--2">
  <div class="card">
    <h3 class="card__title">Coding</h3>
    <p class="card__description">Software tools, automation, and programming experiments.</p>
    <a href="{{ '/coding/' | url }}" class="section__link">Browse coding logs →</a>
  </div>

  <div class="card">
    <h3 class="card__title">Microelectronics</h3>
    <p class="card__description">Embedded systems, boards, firmware, and lab hardware.</p>
    <a href="{{ '/microelectronics/' | url }}" class="section__link">Browse microelectronics logs →</a>
  </div>

  <div class="card">
    <h3 class="card__title">Wrenching</h3>
    <p class="card__description">Restoration projects, fabrication, and mechanical notes.</p>
    <a href="{{ '/wrenching/' | url }}" class="section__link">Browse wrenching logs →</a>
  </div>

  <div class="card">
    <h3 class="card__title">General</h3>
    <p class="card__description">Today-I-learned, project meta, and everything else.</p>
    <a href="{{ '/general/' | url }}" class="section__link">Browse general logs →</a>
  </div>
</div>

{% set mode = "full" %}
{% include "work-log-stats.njk" %}
