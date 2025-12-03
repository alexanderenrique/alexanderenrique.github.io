---
layout: page
title: "1968 Thunderbird Restomod"
categories: [wrenching]
tags: 
  - thunderbird
  - restoration
  - classic-car
  - 1968
  - ford
  - interior-work
  - vacuum-system
  - electrical-work
  - engine-work
  - transmission-work
  - body-work
  - road-trip
  - project-car
  - #electronics
  - #3d-printing
  - #can-bus
---

## Project Overview
- I bought this T-Bird from a guy in Watsonville, CA. Fired right up, had basically straight pipes with glasspack (cherry bomb) mufflers and it was loud as heck. Should have been a giveaway that something was really wrong when he told me it didn't have reverse. This lead to a whole transmission rebuild. Other accomplishements and improvements can be seen at the bottom of the page.

## Before the Christmas Road Trip!

### Must Do:
- ~~Radiator and cooling system~~
- Window trims and weather stripping
- Comprehensive flat kit
- Flushing the brake lines
- Inspecting rear brakes and bearings
- change plugs, measure compression, deduce compression ratio

### Massive but not critical:
- Wrapping the car
- New starter motor
- Windshield washer bottle

### Nice to Have Smaller Tasks:
- Verify temperature gauge is accurate
- Fuel level reading accurately
- Automatic parking brake release
- Passenger side blank off plate
- Driver side sun shade so it doesn't rattle
- Window switches
- Oil leak from front of engine
- "knee breeze" cable
- Switching between defrost and forward vent
- Getting some fix a flat in a can in case of flat
- Finish the front seatbelts
- Spare alternator fused wire

## Up Next:
- Testing the IVR, seeing if grounding the sensors gets us 100 percent values
- Adding shunt resistor to the alternator cable, wiring to the guage
- Vented gas cap, the old fashioned way


### Spares Box:
- Ignition coil
- Fuel pump (mechanical or electrical, whatever we're running at the time)
- Cap and rotor
- Few plug wires
- Keep a few old plugs
- Fusible link
- Fuses


## Work Log

### 11/30/2025
**Main Task:** IVR voltage

**Notes:**
- Had the clever idea to measure the voltage at the coolant temp guage, problem is the IVR doesn't output a stable voltage, it's a contact thaat switches on and off. Multi meter couldn't read it.

### 11/29/2025
**Main Task:** Just learning

**Notes:**
- Learned why my current guage wasn't reading anything. It's because there's no current running through it.
  - Back in the day, all the alternator voltage ran through the guage on its way to the battery. The current difference would move the needle.
  - I'll need to add a shunt resistor between the battery and alternator and take the current difference from there
  - Obviously the guage can't handle a 140A from the new alternator going through it
- Also learned about the IVR, could be the reason my temp and fuel guages read low, not enough current going through them cause the voltage is too low. 
- Started coding in the modbus, actually writing my own code and learning like way way way more than just having cursor do all the work.

### 11/13/2025
**Main Task:** LED tail lights, floppy door card

**Notes:**
- Tried installing LEDs in the tail lights, they don't play nicely with the circuitry. As running lights, the voltage is too low to activate them, and they don't draw enough current to do the rolling light effect
- add it to the way back burner to create an LED controller circuit. 

### 11/8/2025
**Main Task:** Adding trans fluid

**Notes:**
- Made it to pismo
- 12.9 MPG
- Odometer reads 5% low, which is slightly less than the 7% low the speedometer reads. Splitting hairs but that's who I am.
- Added a quart of trans fluid, it wasn't as low as I thought it would be.
- Fiddled with the idle screws on the carb. The passenger side was 1.5 turns out, drivers was 2 turns. Honestly it was pretty good, I couldn't make it better. Played with lowering the idle as well but it was fine.
  - I'll hook up a proper vacuum guage to it for real tuning. All circuits impact the cruise, but I think the main jet is the biggest factor.
- Started loosening the choke, I think it stays on way too long and causes smoking. 


### 11/7/2025
**Main Task:** Roadtrip Stories, Loose Trans cooler lines

**Notes:**
- Drove up to Berekeley, I couldn't tell what was going on but something was smoking a bit on and off
- Pulled into the parking garage at UC Berekeley and there was a puddle of trans fluid under the car.
- Jacked it up, the supply line was very loose and the return line was ok-ish
- I tightened both up, ran it a bit and didn't see any leaks
- The problem is that the pressure varies based on engine RPMS and maybe load? So just sitting at idle there's not much pressure

### 11/5/2025
**Main Task:** Radiator replacement

**Notes:**
- Installed the upper mounts. Replaced the old rubber with like door weather stripping lol. It's thicker and I'm thinking it'll be up to the job temperature wise but mostly messing around.
- Tightened the Transmission pan bolts, it's leaking from that gasket again! They were all 1/4 turn loose, I guess that's just the gasket settleing but it's annoying
  - I still want to laser cut som re-inforcing tabs for the stamped steel pan so I can really wail on those bolts.
- Installed the new lower rad hose. It's ever so slightly kinked and about a thumb width away from the power steering belt. Shouldn't be an issue though. "A miss is as good as a mile"
- New transmission cooler lines, routing was pretty easy, though they aren't very well secured
- Added heat shielding that was left over from the maverick to where the rubber lines get close to the header
- I had the thought that the lines are rated for the pressure no problem, but I don't know about the rating at temperature. 
- I also don't know which one is supposed to be supply and return, but I feel like it doesn't matter *too* much?
  - Update I read the forums, front fitting is the supply, which I have plumbed in to the lower port
  - I like this, because then the trans cooler in the rad will fill with trans fluid before flowing back
  - Other way around and the fluid would just dribble through the radiator and then be returned, not filling the heat exchanger.
- The rear fitting for the trans cooler was loose I was able to wiggle it, but it wasn't leaking? 

### 11/3/2025
**Main Task:** Radiator replacement

**Notes:**
- Sandblasted the brackets I made yesterday
- Painted them
- PTFE tape on the 1/8 barbs for the trans cooler lines
- Finished making up the fan brackets. 

### 11/2/2025
**Main Task:** Radiator replacement

**Notes:**
- Chopped up the radiator I bought,there were these 1/4" bars on the top and bottom lke stand offs butt they weren't right
- Re-made the radiator support mounts, got the old flux core welder out which is always fun
- Started remanking the e-fan bracket. Using box section cut in half to make C-channel. 


### 11/1/2025
**Main Task:** Radiator replacement

**Notes:**
- Just went for it and chopped the trans cooler lines and removed the radiator
- 

### 10/28/2025
**Main Task:** Window Trims, Radiator Flush

**Notes:**
- Flushed the oxalic acid out of the radiaotr, it was quite green which was interesting. Like a dull green.
- Installed sound deadening inside the driver door on the outside. There was already some sounds deadening sprayed on but I figure this will help
- Added butyl and foam sound deadenint to the door car, the epoxy had cured. One corner had already cured and it was ben so that's permanent now.
- Re-installed the door card. The clips inside the rotten door card was a nightmare. I added think I should've re-inforced the clip holes with epoxy and maybe a 3d printed thing.
- Added a foam gasket to help the door car seal. It's just so warped I'm not sure if it's recoverable really.
- Installed the vertical window seal with the black gasket material. Seems to be holding in there well. It's all glue, no real mechanical connection.
- Adjusted the window limits, it was too high in the rear and had to push the window out.
- Door closes beautifully now, no rattle at all it's wonderful.
- Played with the window switches, still can't figure out the pinout. 
- Put the switches back where they belong, now to install the arm rest.


10/24/2025
**Main Task:** Window Trims, Radiator Flush

**Notes:**
- Made up a super thin 2 part epoxy and poured it on the door card. Placed the big ABS sheets on it with some really heavy stuff to try and flatten it.
- Not sure I poured enough, I made 60g worth or about a 1/2 cup. I could get away without it but this'll help the crumbling.
- Drained the coolan from the radiator and engine, must've flushed it every which direction for ten minutes. Brown water just would not stop flowing out.
- Removed the thermostat to encourage flow from every direction
- Flushed the heater core, also heaps of brown water
- 

### 10/23/2025
**Main Task:** Window Trims

**Notes:**
- Fixed the driver door that wouldn't open from the outside. There is an e clip missing that allowed this pin to ecer so slightly slide out. I couldn't find an e clip so I used a piece of wire. Better than nothing, and if it breaks in the future I'll know what it is
- Put the door back togeterh except for the door card
- Worked to attached the interior window trim/ I tried the included staples, rivets that didn;t work, and settled on my own kind of staple. It doesn't look that great but hopefuly no one sees it.

### 10/22/2025
**Main Task:** Window Trims

**Notes:**
- Started pulling apart the driver door to install the new window trim
- It's low key a nightmare, I dissasembled way too much of the door and window mechanism before realizing you don't need to remove the window to access the trim
- Not that I know how it works, should be much easier on the passenger side. Which is also not nearly as bad as the driver side.
- The kit I got doesn't include the vertical rubber which is a bummer, so another $50 there
- Lubed the window mechanism while I was in there. 
- Becasue of everything I took apart, I'll need to readjust the limits of the window travel. There a front and read stopped that are adjustable, as awell as a low limit stop.
- Measured up for a replacement radiator, found a 3 row option for like $150 that was $100 cheaper than the other options
- The door card is a fiber board that is just crumbling apart, so I'm going to have to do some work to restore it.
  - Penertrating epoxy to harden it up, and then I think I'm going to bond it to ABS plastic sheet.

### 09/30/2025
**Main Task:** Vacuum headlight switch installation

**Notes:**
- Made a mounting bracket for the vacuum control headlight switch, started plumbing it in.
- Lots of T-s and plumbing. I went to test it and realized the vacuum wasn't even connected
- I also want to get the automatic parking brake release working again, I know it works I'd just disconnected it previously

### 09/27-28/25
**Main Task:** Pismo road trip - 450 mile test drive

**Notes:**
- Not really an update, but I drove it 450 miles down and back from Pismo and it worked just about flawlessly. A few issues and things that I want to fix, but all in all really solid and I'm happy about it.
- No obvious leaks from the trans but I still need to get under it and really check
- Some small leak from the front of the engine, could be oil pan or front main seal.

### 09/26/2025
**Main Task:** Passenger seat belt installation and speaker relocation

**Notes:**
- Finished installing the passenger seat belt
- Wired up the 6x9s that were previously under the front seats into the back. I was able to kind of wedge them between the wheel arch and the back of the parcel shelf, and the magnet in the speaker kinda helps them stay. I guess they're in there

### 09/25/2025
**Main Task:** New tires and speaker system completion

**Notes:**
- Went to the tire shop and got new tires, they absolutely fuck they look so sick. I put them on and I really like the steely look. But then I put the hubcaps on and it felt even more right
- Finished mounting the seatbelt on the passenger side
- Finished installing the speaker cups. They do sound worse than the 6x9s, but at least the seat move freely now the way they should. I think that's worth it to me.

### 09/24/2025
**Main Task:** Post-alignment test drive

**Notes:**
- Got it back from the alignment shop, might just be my perception but it feels like generally way tighter. Not only pulling straight and steering straight, but less clunks.

### 09/23/2025
**Main Task:** Speaker cup reprint and alignment appointment

**Notes:**
- Reprinted the speaker cup, it's the right depth now
- Dropped the t bird off at the alignment shop, should be done tomorrow
- Took the old steel tires to the tire shop and they dismounted them for me, now just a shit load of hours with the wire wheel and painting before the trip. Tires come in tomorrow.

### 09/22/2025
**Main Task:** Speaker cup depth correction

**Notes:**
- Somehow the speaker cup that I made was too shallow. Not sure how that happened, I really measured with a straight edge and I thought I gave myself clearance. Went from 1.75" to 2.1" cup depth.

### 09/21/2025
**Main Task:** Transmission cooler fitting repair and seat belt planning

**Notes:**
- Rough day on the t-bird, making progress but certainly trying.
- I tried the new NPSM fitting, and it threads in but it still has a slight taper! Like 40 thou but the factory is truly straight, I'm losing my mind with it.
- So I cut it down and then tried to slam the fitting in, but that's when it wouldn't go in even a little and I realized the taper issue
- In my attempt to force it in, I kind of rolled the threads inside inside the trans and I couldn't get the old fitting in.
- Started losing hope but I chipped away at it, kinda unrolled it with a pick and cleaned it out, but it came good eventually, super stressful I was kicking myself
- Got it all back together
- Swapped the trans pans, the bolts on the old trans pan were straight loose! yeah that'd cause a leak, but whatever I still installed the new pan and gasket
- Went in fine, does seem to be slightly deeper but not massively, I think it's fine. It'll take a lot of fluid to fill, at least 6 quarts came out.
- Pulled the seats and started figuring out how I want to do the seat belts.
- Not going to be easy, will be making some modifications to the seat trim, but I want to do it safely and not compromise that.
- While I was at it I went on a side quest to figure out why the seats don't slide. It's the massive 6x9s and the box, like I thought.
- So I tested my small speakers, and they will fit nicely underneath the seats. I'd rather have the seats slide than great speakers up front.
- I might put the old 6x9s in the back if I can fit them somehow.

### 09/09/2025
**Main Task:** Transmission cooler fitting identification

**Notes:**
- Pulled the fittings for the trans cooler, turns out they are 1/4" NPSM, not 1/8 NPSM, so I bought a different adapter to go from 1/4" NPSM to -6AN to fit my 90 degree fitting

### 08/25/2025
**Main Task:** Additional blank off plate printing

**Notes:**
- Printed another blank off plate, used the last of four different spools of white

### 08/24/2025
**Main Task:** Rear ashtray blank off plate design and installation

**Notes:**
- Designed and 3D printed a blank off plate for the rear ashtrays, use VHB tape and it's really stuck on there. Nice

### 08/20/2025
**Main Task:** Brake rattle fix and rear ashtray removal

**Notes:**
- After a bit of time away, I received the rubber isolators and installed them. Behold, no more terrible rattle.
- I did notice that the "top" spring clip on both brake calipers was broken. I thought it was a feature the last few times I removed it, turns out just straight broken. I'll replace them some day maybe. I left the passenger side, and just removed the driver side to avoid it rattling around loose. I realized it on the second side, the drivers side
- Measured up the rear speaker area, the hole is something like 5" square. Really unsure how it mounts
- Removed the rear ashtrays, and added some foam strips to take up any slack between the metal and the bolstering that could cause a rattle
- I do like the ashtrays, but the plastic they are made out of is just so brittle and I don't think it's worth it to try and fix it. I'll design and 3D print a blank off plate so it looks complete

### 08/13/2025
**Main Task:** Brake rattle diagnosis

**Notes:**
- Sometimes you just have to step away for a bit. It was the brakes!
- I did a test where I hit a bunch of bumps while very lightly hitting the brakes, not a rattle, certainly not the loose change sound
- I did some googling and it looks like I'm totally missing these rubber isolators that go on the slide pins. They weren't there when I took the brakes apart
- I can't wait for them to arrive, about a week though.

### 08/10/2025
**Main Task:** Suspension reassembly completion

**Notes:**
- Put everything back together, big day.
- It's all nice and tight in the suspension, but the rattle is still there!! I'm not sure what's causing it but I'll get to the bottom of it
- Double checked the shocks and everything, current though is that something is just loose inside the body work
- I also learned the parking brake disengagement is vacuum operated, so now that needs to be done manually if you want to remove the parking brake.
- The fucking rattle just can't be suspension related, there must be some loose bolts or something in there

### 08/08/2025
**Main Task:** Suspension reassembly

**Notes:**
- Started putting everything back on the car! This is the good bit where the painted shiny stuff goes together
- Everything went smooth, had to do some work jogging my memory on how the sway bar went in and how the brakes go together
- The driver's side *crushed* LCA definitely has more play than the other side, but I was able to tighten the bolt to the point where it grabbed the inner part of the bushing and will hold.
- Did my best to align the UCAs where they were before, and keep the tie rods to the correct length.
- The strut rods are interesting because it seems like they aren't really meant to be adjusted. Often you have nuts on either side of the bushing to move the rod forward and back relative to the car, but this one doesn't have that.
- The strut rods don't line up with the LCA until you tighten them down and pull them forward
- I'm refraining from tightening any bushings until it's sitting at ride height

### 08/07/2025
**Main Task:** Tie rod adjusting sleeves restoration

**Notes:**
- Sand blasted the tie rod adjusting sleeves and painted them, they look nice

### 08/06/2025
**Main Task:** Strut rod restoration and steering inspection

**Notes:**
- Sand blasted and painted the strut rods.
- Removed the tie rod ends, they were super easy to unthread which was surprising
- With the bare minimum of inner tie rods installed, I gave the rack a wiggle and everything else feels pretty good and tight. There is a little bit of lash in the steering box, but really quite good on the old car scale
- Not finding any good replacements for the bump stops but I don't think I'll let that hold me back, just gonna send it. They can be added later if I really want

### 08/04/2025
**Main Task:** Bushing installation and strut rod removal

**Notes:**
- Started pressing in bushings, very satisfying
- Even my wonky arm accepted the bushing with a little violence
- Removed the strut rods, and the sway bar came out with it naturally. They're real rusty
- I'm missing some bump stops on the strut rod on one side, and I destroyed the one on the UCA ball joint bolt accidentally
  - I guess I wonder how necessary they are? I mean they were installed from factory so they must be a good-ish idea
  - Not sure if I can source replacements

### 07/25/2025
**Main Task:** Control arm and brake component painting

**Notes:**
- Just lots to paint, finished painting the control arms, brake brackets, hub dust cap, etc.
- Sandblasted and painted the rotor shields

### 07/24/2025
**Main Task:** Control arm sandblasting and painting

**Notes:**
- Continued sandblasting the control arms, painted them black
- Received the strut rod bushings

### 07/19/2025
**Main Task:** Bushing removal and sandblasting

**Notes:**
- Started working on sand blasting and pushing the bushings out. It went bad, I bent the fuck out of one of the arms with a hydraulic press. I felt bad.
- I fixed the hydraulic press too, just to mess my parts up
- Sand blasting went fine, the knuckles turned out really nice, and I just love cleaning stuff up on the sand blaster

### 07/18/2025
**Main Task:** Front suspension and steering disassembly

**Notes:**
- Totally ripped apart the suspension and steering on the t-bird, it really didn't give me too much trouble




## Back Burner
- Oil pan gasket, welding in bung
- Adding relays to headlights
- Fixing door
- Headlight covers vacuum
- Windshield washer bottle
- Door seals
- Window Felts
- New Spark plugs
- EFI conversion
- Adding fusible link to Alternator wiring
- Making a good spares box
- Making spare alternator wire
- Cleaning/ organizing trunk junk
- New wheels and tires
- Speakers in the back
- Wiring in Wideband O2 Sensor
- Arduino project, adding sensors - see Smart-T-Bird for details

## 3D Models & STL Files

Custom 3D printed parts designed for this project:

- **Rear Ashtray Blank Off Plate** - Custom blank off plate to replace brittle rear ashtrays
- **Windshield Wiper Knob** - Replacement for broken windshield wiper control knob

3d-models - View all 3D models and download STL files

## Accomplishments
- New ignition coil
- Fixed windshield wiper knob with 3D printed version
- New windshield wipers
- Blower motor and controls working
- Turn signal bulb out in dash
- Turn signal working intermittently
- Alternator upgrade
- Add coolant overflow
- Exhaust clunking
- Flushing coolant
- Brake light on dash
- Fuel gauge
- Changing headlight bulbs
- Drive a bit more, change trans fluid
- Adding worm clamps to trans cooler lines
- Change oil
- Change oil filter
- Rotors and pads
- Change diff fluid
- Better power lines
- Better grounds
- Bleed the brakes, inspect
- Dash lights
- Rebuild trans
- Clock
- Ammeter
- Electric fan conversion
- Adding switched power post to engine bay
- Check ignition timing
- Making the horn work
- Finishing driver exhaust
- Get the gas gauge reading properly
- Fixing blend door actuator
- Cleaning up vacuum lines underhood
- Rear shocks
- Rear coil springs
- Make the shifter linkage work better
- Weld in O2 sensor bung
- rebuilding the front steering and suspension. It was making an alarming clunk over bumps, and the lower ball joints were definitely cooked. 
- Adding vibration dampeners to brake calipers
- 3D printed blank off for rear ashtrays
- Getting an alignment with all my new steering parts
- New Wheels and Tires
- Adding speakers to the back
- leaking trans (New fittings, hoses, trans pan)