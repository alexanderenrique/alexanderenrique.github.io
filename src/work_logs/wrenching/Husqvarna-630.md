# Husqvarna 630 Work Log

## To-Do:
- Clean chain, general once over
- Flushing brake fluid
- Checking coolant, other fluids
- New Tires lol
- ~~Plugging front tire?~~
- Figuring out left side panel
- ~~Checking charging system~~
- ~~Faded polarizer on LCD readout?~~

## 05/17/2026
**Task:** Fairings, tank plumming, tire changing, rear turn signal wiring and connectors

**Notes:**
- spent almost an hour trying to re-connect the fuel tank corss over hose the way it was originally routed, but I ended up just making a new line from silicone. 
  - Which after a little review seems to be a pretty bad idea, I'll swap it out with something else
- Also added the fairings back
- Raghavan and I spent a couple hours changing tires, the front wasn't too bad and was almost perfectly balanced right away
- Rear tire was rock hard, and the inner tube was in bad shape so I ordered a new one and we decided to call it of the evening
- I also terminated the old turn signals and license plate light, I'm missing the couple of bolts that attach that so I wansn't able to put it on. 


## 04/12/2026
**Task:** Turn Signal wiring

**Notes:**
- added bullet connectors to the turn signal wiring, it's about to look a lot better with the new non-rusty and non-flush mount turn signals
- Removed the whole rear plastic thing. It'd look a ton better with a taily tidy, but I'll get there eventually
- Hot glued the dash back together, it's a little janky but could be worse. My hope is that it doesn't ever get too wet. 
- Just had a real nice meditative time in the garage

## 04/06/2026
**Task:** Crash Recovery: Neutral and fuel light battle

**Notes:**
- I believe I have won the Dash Lite battle. I soldered a jumper between a pin on a MOSFET and a resistor, and that has fixed my neutral and light issues.
- I learned that you can't really solder to vias very easily. These aren't even tented. 
- 


## 04/06/2026
**Task:** Crash Recovery: Neutral and fuel light battle

**Notes:**
- I swear I dream about this stuff
- More using my brain and probing around, really weird voltage behavior
- I found the 3.3v regulator, and it was doing its job perfectly, 12v in, 3.3v out. 
- As soon as I started probing the power rail's path, I saw weird voltage drops at most every step. Like across the very first MOSFET it dropped from 3.3v to 3v. I also followed the LED rail back, and I found where the broken trace must be. 
- The multimeter reads zero ohms between these this one resistor via and a MOSFET, but the voltage drops by 2V between them!
- I learned multimeteres only produce like 1 mA when measuring continuity, and load can cause these very fragile/broken connections to sag
- I back powered the LEDs and they work beautifully
- So I think I figured out what I need to jumper to bypass the broken trace. 

## 04/05/2026
**Task:** Crash Recovery: Fender, Battery, headlight, Neutral and fuel light battle

**Notes:**
- Installed the new "universal" fender, that was easy enough, just needed a little trimming in the rear so it wouldn't hit the frame
- Installed new battery, it fired right up with the new battery
- Re-pinned the headlight so that it would work with the Husky wiring, now high beam works and indicates as it should
- The REAL battle was neutral and fuel lights, iut really bugs me that those don't work. So naturally I went full crazy on it.
  - The neutral light is not a simple ground, instead it is a gear position indicator with different resistance correcponding to different gears. Mine Ohmed out fine, neutral was 330 ohm
  - Same on the low fuel light, I found a manual and it was reading pretty much what it should. With the tank tilted all crazy it was reading 1.3 kOhm, which should be empty
  - I probled the wires between the ECU and the head unit, all had continuity
  - It send a digital signal to the head unit, so it's not so easy to probe
  - I went full crazy and sawed the case in half with the dremel cut off wheel
  - Some green nasty stuff in there. 
  - I verified that the LEDs do work by carefully putting some voltage across them, and finding the vias that correspond to either side
  - It is low side switched, makes sense 

## 03/31/2026
**Task:** Crash Recovery

**Notes:**
- I binned it decently hard on Sunday, damage report isn't too bad:
  - Shattered headlight and front fender
  - Initially thought the bars were bent, but I think the fork had just twisted
  - Display holder pretty messed up. Maybe reusable, maybe design a new one
- I removed the broken plastics and headlight and everything
- Loosened the fork bolts and triple clamp nut
  - After some finagling I think I straightened everything out, one fork leg might be higher than the other by like a mm, but you get that
- Waiting on the new headlight and fender to come in, next week. Bought a universal front fender so some drilling required.

## 03/16/2026
**Task:** Overfilled oil

**Notes:**
- went on a ride yesterday, absolute ripper
- When I got back, I was leaking a ton of oil from the air box, and it was caoting the shock, swingarm, everything
- The oil level was way overfilled, I cleaned out the airbox, sprayed down the air filter with carb cleaner, absorbed as much oil as I could
- I think it may keep dripping for a time but hopefully it improves
- drained maybe 1 cup of oil from it to get the reading down to where it should be, wasn't that much at all. 
- I guess at least it's good that it has too much oil?? trying to figure out if it's a blowby problem or just over filled, I'll keep an eye on it

## 03/12/2026
**Task:** Fixing front flat

**Notes:**
- I used my transmission jack to lift the front end of the bike. After taking the wheels off the trans jack, it worked pretty well.
- Remove the four clamping bolts and the large 12 mm Allen. After that, you have to pound out the axle. I might make some kind of special tool for this later.
- I also had to remove the front brake caliper to be able to remove the wheel. It's super tight in there.
- Also cleaned up some of the faded black plastics with some shine, helped quite a bit, the aesthetics on this bike will need som love for sure.
- After removing the tire, swapping the front tube only took about 45 minutes, worked first time, just some sweat and blood.


## 03/11/2026
**Task:** Initial Assessment, Cleanup

**Notes:**
- Started scrubbing down the chain, it's not streched just filthy and caked in grease but it's cleaning up
- Tried to patch the nail hole in the tire. I learned/remembered how to use the plug kit for tubeless tires and was able to patch that hole, but then it was leaking like crazy from around the valve stem
- These are supposed to be tubeless wheels, but that kind of tells me that there's probably a tube in there.

