# Nitro Powered pencil sharpener

## Project overview:
- I'm looking for a fun way to incorporate nitro engines into something fun and silly for my desk, and I thought, what better way than to do a nitro-powered pencil sharpener? Still thinking about other possible things a Nitro engine could drive, but a pencil sharpener seems like a good mechanical thing that's simple enough.
- First step is to make an engine stand and starting mechanism that is automatic
- Emphasis on making it as quiet and oil free as possible

## Specs:
- I was going to use a Cox engine, but lately I feel like a Saito FA series engine four-stroke can better meet my needs in terms of choke for starting, easy to muffle, and control the oil, variable throttle, etc.
- Design considerations include:
  - Easy starting via microcontroller
  - Exhaust muffling
  - Oil capture to feasibly run inside
  - servo-controlled shut-off
  - Servo controlled throttle

## BOM:
- Starter Motor Assembly:
  - 5000 RPM 895 motor
  - 12V, 5Ah LiFePo4 Battery
  - One way bearing
  - HTD 48 tooth cog
  - Drive belt
- Glow Plug Assembly
  - 10A 12V to 1.2V converter for glow plug
  - Glow plug connector

## parking on a downhill
- ~~Figure out if the high amp CV power supply will work for the glow plug (dont forget to add caps and maybe more resistors or something.)~~
- 
- ~~Design a test stand fo the engine~~
- ~~Get the flywheel working/printed up~~

### 05/15/2026
**Task:** Received flywheels
- The flywheels are exactly what I wantedm haven't had time to start the endinge yet becasue I first need to hack off the snout on the 80T gear
- Playing with the ratios and high torque motors, I think I'll control the big 895 motor with like 50% duty, that seems to spin the engine plenty fast
- I do wonder if there is a thing as too fast. I remmeber when I would jump a motorcycle with a car and the starter could have all the amperage it wanted, and it absolutely cranked like hell. It never actually started any fast cranking at mach jesus...

### 05/05/2026
**Task:** More purchasing, thinking, and eye drops
- I received the linear actuator, that's an interesing mechanism, fun tp play with, I'll need an H bridge to control it
- Also received the 80T pulley, that thing is the truth. I'll need to take to snout off of that to fit a flywheel of any thickness but we'll get there
- The 895 with a 30T cranked it over no problem.
- I'm still thinking some kind of hybrid tension and one way bearing set up, the one way bearing as a safety against driving the motor hard in reverse. 


### 04/30/2026
**Task:** More purchasing, thinking, and eye drops

**Notes:**
- Thinking more about the fast spinning things, I just cant think of an amazon one way bearing that I trust at 20,000 RPMs to not grenade
- I think the move is to *maybe* use a one way bearing as a kind of back up, but I want to disengage the belt from the motor and crank when the starter has done its job
- The best way to do this is by having a linear actuator put tension on the belt
  - This will also help with the amount of belt wrap around the smaller pulley
  - and when not engaged, the belt can just kind of float on top of the pulleys. I don't love it, but it's not a bad engineering option.
- Since I'm sending stuff to send cut send, I was wondering if I should start designing a DC/nitro motor mount more officially. I'm sure it will go through revisions but surely not as many revs as the flywheel.


### 04/30/2026
**Task:** Flywheel redesign, medicated eye drops

**Notes:**
- After a lengthy ER visit and being seen by not one, not two, but three ophthalmologists, I am projected to make a full recovery.
- Made some design choices while in the waiting room for the ophthalmologist.
  - First, no more spinning things that can fly apart. I'm going to opt for laser-cut steel flywheels with lots of engineering tolerances
  - Second, no more 3D printed things spinning very quickly, including fans. Like ever in my life, probably.
  - I instead opted for an external PC fan and duct system that I can just control with an ESP32 based on temperature.
  - I also found a Polaris hall effect sensor that I'll eventually be able to use to detect the RPMs.
  - And since I'm going with a steel laser-cut flywheel, I can just count the pulses of the spokes of the flywheel.
- I spent a lot of time designing flywheels that made me happy and calculating the mass of them in Onshape.
- I learned a lot about how to design strong spokes and curvature and reduce stresses in this system. A slight curve helps. You don't want to concentrate the stresses.
- I'll have a few different versions laser cut out of steel and see what works the best.
- I also reduced the voltage of the large motor, and even at lower voltages it still is able to crank the engine no problem, so I might use that trick to slow things down
- My current question is how a one-way clutch is going to work


### 04/30/2026
**Task:** Printing, Hospital Visit

**Notes:**
- Printed another flywheel, and this time I successfully filled it with about 100 g of BBs.
- I put this on the engine and started it with my new larger 875 or whatever motor.
- At 12 V with a 32th on the DC motor and a 60 on the crank, it spins pretty dang fast.
- I also swapped the way that the fuel lines work, so the fuel line is now much shorter to the tank, and I am using exhaust pressure to pressurize the fuel tank.
- It started after just a couple seconds of cranking with the DC starter.
- Then I gave it a rev, and the flywheel exploded in my face.
- I was not wearing safety glasses. I went to the emergency room. I've seriously fucked this one up.
- Always wear your safety glasses, kids.


### 04/27/2026
**Task:** Printing, more re-designs

**Notes:**
- Designed and 3D printed a basic throttle mechanism so that the throttle doesn't just move to a random position, looks swanky
- Printed another flywheel, this time filled with abou 50g of BBs
- I alos printed the stronger base, worked well
- I tried using the 775 motor to start it, but it just didn't have enough power at 1:1 gear ratio, like not even close
- That said I did learn that the GT2 belt may have just enough grip to drive it, may not need to go to the HTD, which would be nice becasue HTD stuff is expensive
- I did et it going for a while and it was revving hard! Heaps of smoke and noise it was awesome. With the super light flywheel it revved no problem
- It was kicking back a lot, I think I leaned I need to be more strategic with when to fire the glow plug
  - Like it need way more intertia driving the crank forward to get the engine to turn the right way
- Also learned a lot about DC motors, I opted to buy a hopefully overkill 80W motor turning at 5000 RPM free speed
  - My thought is that under load this may go to about 2500, and then I can gear it down a bit to achieve around 1,500 RPMs. The only way to know is to try!


### 04/27/2026
**Task:** CAD re-designs

**Notes:**
- Redesigned the engine mounting bracket, triangulated it, and I'm going to print it with thicker walls so it should be much stronger.
- Redesign the flywheel to accommodate the sprocket. It should fit around the Snout of the GT2 gear as well as kind of over the flange on the engine crankshaft side
- The flywheel is a little less useful now that I am going to be using the starter motor.
  - Should still serve for cooling and helping locate the GTD motor on the shaft. The actual shaft of the engine is just a little under 8mm.
- Made up an adapter to go from the 5mm gear motor to the 8mm gear.
- Open questions include if the 550 RPM is going to have enough speed to turn the engine fast enough to catch.

## Work Log
### 04/25/2026
**Task:** Getting it fired up

**Notes:**
- Big day. I mounted it to the stand and figured out a way to get my power supply to light off the glow plug.
- At first, I just had the probes touching the engine and the glow plug, but that proved unreliable. I crimped on a ring terminal to the ground and used the alligator clip on the top of the glow plug.
- I wasn't getting any pop, so I took apart the carburetor to make sure it was clean.
- Learned about how the idle and main adjustment needles interact with each other. Pretty cool little system.
- I spun and I spun and I couldn't get it to pop or anything, spinning it clockwise facing the engine, and I looked in the valve timing. It looked crazy wrong.
- Thinking it was the valve timing, I tore everything apart and set the valve timing myself.
- I did all this work, it was pretty cool, only to realize that I was actually spinning the engine in the wrong direction, and that's why the valve timing looked off.
- So, feeling like a total idiot, I put everything back together and tried to spin it and get it started.
- I got a couple little bangs on starter on brake clean, but I decided to wait until I got a real RC fuel tank.
- I received the fuel tank late in the afternoon. At that point, I had already cracked my engine stand from too much spinning. Engine does have a ton of compression.
- I was able to get it to rev up, and it did run for three or four seconds at one point, and that was awesome.
- The problem I'm facing now is that I need to redesign the engine stand, and the throttle is very loose, so it swings wildly between all the way open and closed, which makes starting a real challenge.

### 04/24/2026
**Task:** Engine stand, Flywheel V4?

**Notes:**
- Whipped up an engine stand really quickly. Super simple design for some M3 bolts.
  - The holes ended up being a little too small for M3, but luckily M2.5 fit perfectly.
- Printed another flywheel with the correct dimensions, and then another flywheel because the one before was too small to accommodate BBs.
- Put it on the test stand and tried to fiddle with making a hacked together fuel system, but it didn't really work.
- I learned that the fuel tank actually needs to be at or slightly below the intake nipple of the carburetor. There isn't really a float bowl like in any other carburetor. It just kind of sucks it in through a metering valve, and it can start a siphon and just drain all the fuel out. You'll make a big puddle and mess of fuel.

### 04/22/2026
**Task:** Flywheel/fan design, engine going

**Notes:**
- V1 wasn't even close lol but I tried
  - The ID was way less that 8mm, I made it like .115" instead of .315"
  - The 2" OD just looked totally wrong now that I've received the engine, 4" OD will be a lot more like it
- V2 Larger radius:
  - The fan blades look pretty skinny now that they are way longer, made those way thicker
  - The outer flywheel ring was also not quite wide enough to accomodate any BBs after accounting for all the wall thickness which was a bummer
- V3 has larger fan blades, much wider flywheel
- Received the engine yesterday, it's tight! Like doesn't spin very freely.
- I pulled the glow plug, just soaked it in WD40
- The intake valve was a little stuck, it made a nice popping sound when I cracked it open the first time. I think it's just gummy but salvageable

### 04/21/2026
**Task:** Flywheel/fan design

**Notes:**
- Started honing my mad Onshape skills
- Made a 2 in 1 flywheel and fan, no idea how well it will work
- I learned about concentric infills. My plan is to pretty much fill the outer flywheel with BBs
- The volume of the outer part is 1.1 ci, which is about 18 CC, if the BBs have a density of about 6 g/cm3 that'll be 108g which is on the heavier side but I think the density will actually be lower, and there will be some void space, TBD


### 04/14/2026
**Task:** Shaft coupling design

**Notes:**
- I opted for a 550 RPM 775 gear motor
  - With no load it pulls 0.3A, with me pinching the shaft pretty good it goes up to almost 0.6A
  - The LiFePo4 should have no problem supplying that much current
- I designed and 3D printed a shaft adapter to slide over the motor shaft and into the one way bearing
  


  ## Scratch pad

- Assuming a BB density of about 6g/CM3
- You could maybe use a GT2 belt system, but I worry it might not have the torque handling capability to get this thing started

Sharpener: https://www.officedepot.com/a/products/908996/X-ACTO-KS-Manual-Pencil-Sharpener/?utm_source=google&utm_medium=cpc&utm_campaign=lia_cor_evg_supplies-legacy_local_unid_prch_non-match&mediacampaignid=21410292864&utm_source=google&utm_medium=cpc&gclsrc=aw.ds&gad_source=1&gad_campaignid=21416747648&gbraid=0AAAAAD2Eb4e6eSWYh_-Gt0Nl_Da-Iuz3l&gclid=Cj0KCQjw37nNBhDkARIsAEBGI8OZy-Cy0GyGzFUxXbhURuRy-iOARFd0dqqnJuIPJbAugUorHhAPFNIaAiwsEALw_wcB


