---
layout: page
permalink: /projects/nitro-sharpener/
tags: [nitro, engine, sharpener, safety]
---

<figure class="lead-photo">
  <img src="{{ '/images/nitro-motor.jpeg' | url }}" alt="Saito model airplane engine on a bench, with a red 3D-printed flywheel on the crank">
  <figcaption class="lead-photo__caption">Saito engine with a PLA flywheel, before it exploded into my eye</figcaption>
</figure>

<div class="hero">
  <h2 class="hero__title">Nitromethane Pencil Sharpener</h2>
  <p class="hero__subtitle">A model airplane engine on the desk, turning a pencil sharpener. It ran. It was loud, acrid, and scary, and it does not belong indoors.</p>

  <div class="btn-row">
    <a class="btn btn--secondary" href="{{ '/microelectronics/nitro-sharpener/' | url }}">Work log →</a>
  </div>
</div>

<div class="grid grid--3">
  <div class="card">
    <h3 class="card__title">Spinning things</h3>
    <p class="card__description">Anything turning that fast will put you in the emergency room unless you are very careful. A 3D-printed flywheel is not careful.</p>
  </div>
  <div class="card">
    <h3 class="card__title">The fumes</h3>
    <p class="card__description">Nitro exhaust is irritating in a way that I don't think any muffler can fix. It's nitric oxide after all. I do not think there is a way to make it pleasant enough to run inside.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Methanol</h3>
    <p class="card__description">The fuel is largely methanol, and methanol loves to evaporate. It also siphons out of a tank that sits above the carburetor.</p>
  </div>
</div>

## The idea

I wanted a nitro engine on my desk, doing something silly. A pencil sharpener is a simple mechanical load, so that was the job. A Saito four-stroke seemed like the civilized version of a Cox: easier to choke, easier to muffle, a throttle you can move, and maybe less oil flung around the room. The plan was an electric starter, a servo on the throttle, and enough exhaust plumbing that I could run it inside.

## What happened

It did start. With a DC motor on the crank and exhaust pressure on the tank, it ran for a few seconds, then later for real. It was loud, I got messages from my neighbors. The whole thing felt like it could not be tamed, and I boxed it.

Before that, a 3D-printed flywheel filled with BBs came apart while the engine was running. I was not wearing safety glasses. I spent the rest of the day in the emergency room. Three ophthalmologists and six weeks of eye drop later and I pretty much made a full recovery. The redesign after that was laser-cut steel, and no more printed parts at those speeds. The project still went in a box. The safety margin was never going to be there for a desk toy.

## What I'd tell someone else

Things spinning very quickly will land you in the emergency room unless you are very careful. Safety glasses are the minimum, and a plastic flywheel at nitro RPM is not a design, it is a grenade. I do not think there is a way on earth to make the nitro fumes less irritating to the point where you could run this indoors. And the fuel is largely methanol, which loves to evaporate, so even a quiet engine would still be a puddle and a vapor problem on a desk.

I guess you could fuel inject it with the worlds smallest drip of fuel injection to avoid the carburetor puddling problem. BUt even so, the sheer speed and noise of these little engines is astonishing.

## Quick links

- **Work log:** [Nitro powered pencil sharpener]({{ '/microelectronics/nitro-sharpener/' | url }})
