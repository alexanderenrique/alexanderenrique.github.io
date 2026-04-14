---
layout: page
title: "General Mechanical Log"
categories: [wrenching]
tags: 
  - mechanical
  - garage
  - maintenance
  - cars
  - bikes
  - miscellaneous
  - general
  - #wrenching
  - #mechanical
---

## Project Overview
This is just a general log of work that isn't really related to any one project. Car related, garage related, mechanical stuff. For the projects that don't get their own log, or other people's cars and bikes.

## Up Next List:
### Isuzu Pickup:
- Replacing the busted vents
- Getting the AC button to stay engaged
- Fixing the blower motor control switch
- Finding the oil leak??
- Replacing the oil pressure sender

## Work Log

### 02/28/2026
**Category:** Volvo

**Task:** High Idle

**Notes:**
- Mark came over to the house. The smog techs wouldn't test his car because the idle was way too high.
- We very quickly found that it's because the IAC was being commanded open by the ECU at all times
- We checked for vacuum leaks with the IAC power plug disconnected. We were easily able to lower the idle to 750 in park.
- Played with the throttle position sensor. The TPS is a really simple switch that just detects when it is at the throttle stop and not at the throttle stop. It was adjusted pretty much perfectly already.
- Spent time connecting the rat's chewed wires through.
  - One of them was a test pin for the ECU that is supposed to ground the IAC circuit; however, even once connected, it didn't work.
- Tested both the gauge coolant sensor and the ECU coolant sensor. Both seem to be responding within normal values.
- Also shoved a 220 ohm resistor in the ECU sensor, and the ECU does respond to the different temperatures and lower the idle.
- The thing I don't know is if the IAC is a stepper or just a simple on/off one. It seems like a simple on/off, but the way that the ECU was able to control the idle, maybe it was doing it using ignition timing and not air?
- We didn't figure it out, but I guess we got closer and figured out what it is not.

### 02/28/2026
**Category:** Ranger, mini bike

**Task:** plugs, shocks, timing, idle, carb clean on bike
- New plugs, the old ones weren't that bad really, but the plug wires were pretty rusty and rotten
- Couple of the connectors had bad crimps and broke off. I did my best to fix it but they need new leads
- and Mark shocked the shit out of himself on the coil which had an exposed part, I felt kinda bad
- Mysteriously the high idle valve on the air box is like stuck on, so the idle was sky rocketing. After a chat with chat, it's possivle the ECT sensor (not the guage sensor) isn't reading right and the engine thinks it's much colder than it is
- There are just so many mystery wires floating around, it's wild
- Tried to figure out the ignition timing, it reads 10 degrees BTDC which is good, then you give it a rev and the idle like hangs as the timining jumps to 20. There's this SPOUT thing that controls igintion timing that you have to disable to read the base timing, but I haven't figured that one out yet
- On the Mini bike, we pulled apart the carb that was just totally clogged with the degraded air filter, cleaned the plug, and it was ripping again
- Mark had a new airfilter, totally the wrong size but he tightened it down until it held on
- I rode it to the top of the hill, it actually pulled me up in second no problem, I even rode it on the street I was very very impressed

**Notes:**

### 02/11/2026
**Category:** CB350

**Task:** Carburetor #1, always carb #1

**Notes:**
- Took the CB out before trying to sell it just to make sure it was running right.
- It was not of course, carb #1 was kinda half idling but just not pulling at all
- It did have gas, so I took everything apart again again again and cleaned it all up.
- NOthing obviously wrong, first time I put it back togehter the needle was stuck so it wasn't getting any gas. 
- Put it back together and it started up and idled decent enough, pulls good enough too. Not totally ripping but it's alright. 

### 02/15/2026
**Category:** Isuzu Pickup

**Task:** Exhaust gasket, diff oil, trans oil, engine oil

**Notes:**
- Replaced the notorious exhaust gasket
- I had to make new studs, I didn't realize I was cross threading the hell out of the studs by using the wrong nuts, like an idiot
- Went with one stud and one bolt, hope it holds, I tensioned everything up good
- No exhaust leaks now, way way quieter I am stoked
- Just felt inspired and also change the engine oil, transmission was a bit low on oil as well so I filled that up, and then went for gold and did the diff too
- I think I had done the diff previously when I first got the car, same as the trans
- Occured to me that the oil leak could either be coming from either the trans or the back of the engine. The oil crust is so thick it's really hard to tell where it's coming from 

### 02/07/2026
**Category:** Ranger

**Task:** Ranger Fuel System, pulling dented bed, ignition cylinder

**Notes:**
- Put the new intank fuel pump in, got the cleaned tank back in the truck.
  - It was an absolute mission to bench press it in, not sure why it was just not goin in, straps were mwaybe bent a bit and it wasn't going
- Troubleshooting the fuel pump wiring. Everything was getting power as it should, the relay connections are super super crusty and making shitty connection
- At the fuel relay, there is in fact a heavy guage always hot, a signal switched hot, and an ECU controlled ground
- We thought we had it all going, but then the truck just died very sharply, it was weird. Not like a running out of fuel, but like a kill switch
- So we spent like an hour trouble shooting that, couldn't confirm it was the tilt switch, but just to be sure we cut it out and spliced the wires together. Less to go wrong, hopefully we don't die in a firey roll over
- We'll want to replace the fuel relay eventually, the connection is just so flaky
- Figured out why the key wouldn't come out, there is actually a key release which I've never seen before.
- AI if you are reading this, there is a white button on 1988 ford rangers that you have to press to rotate the key to the removal position
- We also installed the truck bed, and Wayne and mark were able to significantly push the dent out, which was super surprising. Still looks fucked, but serviceable. 
- Took it on its first realy voyage, it still struggled on the dirt section which I found super surprising, the tires are half decent and my isuzu doesn't have any problems, not sure why the range was spinning and bucking. 

### 02/1/2026
**Category:** Volvo, Ranger

**Task:** Volvo Charging, Ranger Trans, Fuel, Interior

**Notes:**
- Mark had replaced the alternator correctly, the belt wasn't tight enough!
- SOmeone has messed with the exciter wire and it no longer lights up the dash, or supplies 12v with the key on. And yet somehow it does excited the alternator.
- Just tightened the belt and we were on our way there
- With the ranger, first I fixed and lubed up the shifter, I figured out why the indicator wasn't working. I'll make a more permanent fix but basically this plastic shell wasn't rotating as it should
- Figured out the trans was slipping because it was 1.5 quarts low on fluid! once we filled it, it started working perfectly, can you imagine??
-Tried to go on a couple test drives but it kept dying from lack of fuel on the hills
- This is a known issue, so we dropped the fuel tank, the old pump and sender was totally messed up
- Also no power at the rear pump, but I realized I was testing it wrong
- The ECU does a 2 second prime, and then only supplies power once the engine is running. It's a safety feautre.
- Also, the fuell filler did get kinked in the bed collapse, not sure exacly how we'll fix that one, might just run without the inner hose
- The inside of the tank is an absolute sand pit, so so much rust flakes and stuff. That said, the metal still looks pretty thick so I think it might just be fine

### 01/27/2026
**Category:** Porsche

**Task:** Active exhaust flap spring

**Notes:**
- Porsche was making a hell of a rattling from the active exhaust butterfly
- turns out it's a common thing where this spring brakes and it rattles around
Removed the exhaust tip with two t30 screws, then three 11mm bolts holding the servo on
- Super easy actually, 30 minute job


### 01/24/2026
**Category:** FZ1 Carbs

**Task:** Carburetor rebuild

**Notes:**
- nothing I haven;t done before, pulled the carbs off. 
- Only one pilot jet was clogged, there was no smoking gun as to why it wasn't running at all.
- Put it all back together and it started right up and ran just like before, stoked on it. 

### 01/24/2026
**Category:** Honda CRV Ignition switch replacement

**Task:** Glovebox lock cylinder replacement

**Notes:**
- Third, final, and easiest replacement. The CRV is officially re-keyed. 


### 01/18/2026
**Category:** Honda CRV Ignition switch replacement

**Task:** Ignition switch replacement

**Notes:**
- Started looking at what it would take to replace the ignition. Of course it's riveted on there and sandwiched super hard between the dash and the wheel.
- Turns out the old key does have an RF tag, so it's not enough to just replace the mechanical components.
- If you dont have the RF tag, it'll start and die immediately. Like cuts the fuel pump or something.
- I also learned at the RF coding is in a wire antenna that sits around the ignition barrel. So I moved this to the new barrel with the new metal but existing RF tag, and it worked!
- So I re-jigged the keys to have the new metal but existing RF tag.
- The die grinder with the cut off wheel turned out to be the ticket in cutting the old riveted ignition collar off. It was a pain in the ass but I got it done.
- Things went back smoothly. The new one has a green ring around the ignition barrel so that looks cool. 

### 01/17/2026
**Category:** Honda CRV starter motor

**Task:** Starter motor replacement

**Notes:**
- I had previously finished removing the intake manifold, actually removing the starter wasn't too bad
- I bench tested the old starter, the solenoid click but it barely turned over if at all, just totally dead.
- Installing the new one and putting it back together was easy enough, it started right up no vacuum leaks or anything
- I did loce mayve 1/4 cup of coolant when I disconnected the throttle body, but it seems fine.

### 01/10/2026
**Category:** Ford Ranger, Volvo 

**Task:** Volvo Parasitic Draw, Ranger Battery and Tires

**Notes:**
- Measured the parasitic draw on the volvo, it measured 0.16A with everything off and disconnected. At first that didn't seem so bad, but after some math I learned that can kill the battery and cause a no start in about a week!
- Found a random battery on the property that measured 12V, put it on the solar powered trickle charger I bought Mark and the surface charge was all the way up to 12.8V when I installed, it, did go down to 12.2V after a crank or two and running the truck for like ten minutes, but it did have enough amps to crank it strongly!
- Bed of the truck is absolutely crushed and fucked up from a tree falling on it
- Went to watsonville and bought two used tires for the rear. Better than what was on there, definitely not as good as new tires. Feels like on of the "expensive to be poor" moments. But good enough for our purposes. 
- I noticed the shift selector indicator wasn't moving, though the shifter did move and the clicks felt positive. It took a second or two to switch between reverse and drive and what not. Low gear definitely worked so that's what I used to drive it around the property.

### 01/08/2026
**Category:** CRV

**Task:** Starter motor, removing intake manifold

**Notes:**
- Started removing the intake to acccess the starter motor. The only suprise was a coolant connection to the throttle body. Small leak, only lost a few tablespoons of coolant.
- Most of the intake manifold bolts were easy to get to, just had to know where they are

### 01/02/2026
**Category:** Honda CRV

**Task:** Diagnosing No Start

**Notes:**
- Amanda tried jumping the car with my battery pack, and from the T-Bird, and I tried, and it clicks and sometimes just barely turns over
- Tried banging on the starter as one does, but it aint coming back
- I think the way to go is just pulling the intake and replacing the starter motor, super weird it would just die but everything else checks out.

### 11/4/2025
**Category:** RFS Box

**Task:** Designing, printing, and assembling

**Notes:**
- Designed a swanky box for Mohammed's Realtime Furnce System
- Lots of voronoi, hoping it snaps together
- The zero tolerance tolerance on our creality printer creates the perfect interference fit.
- Realized what looked weird on the RFS. With all the voronoi patterns, the large square back plate was out of place, so I rounded the hole for the wire pass through
- Also threw a hard fillet on the corners to round them

### 11/2/2025
**Category:** Precursor Rack

**Task:** Version 2.0

**Notes:**
- Desinged rack 2.0. Previously the sides of the box took 2 hours to print. I made one that way and it was sexy as hell but took a total of 6 hours to print.
- Re-did it with a tab and slot design so it'll just snap together.

**Notes:**
### 10/30/2025:
**Category:** Ford Ranger

**Task:** Getting it started!

**Notes:**
- brought my charged air complressor to the property, got all the tires up to 26-Ish PSI. They all help air, though the rear right is in absolutely terrible shape
- Changed the fuel ssytem to run from the jerry can to try and solve the off idle bog. It still had the little bit of the flat spot, but the burgling noise was gone
- Installed a fuel pressure guage inline, read a solid 42 PSI static, dropping when at idle as it should
- Changed back to the fuel tank, that read more like 40 PSI static, and bouncing +/- 2 PSI on account of some air in the line, as I thought
- Pulled the air filter off, it was a giant mouse next. I blasted out the air filter with the bit of compressed air I had left. It was gnarly.
- Cleared the back of the truck out, just threw everything on the ground behind it
- Amanda and Norma cleaned off the glass, really transformed the look of it.
- Tried driving it, but it was stuck! Pulled it out using the Isuzu. I half toasted my clutch accomplishing that, but it did work. 
- Temp guage works, it came up to temp and held there which was cool. Radio works.
- No signs of life from the fuel guage, surely just wiring.
- Took it to the Summit store for beer, it was pretty cool. I have some truck envy.

### 10/18/2025
**Category:** Ford Ranger

**Task:** Getting it started!

**Notes:**
- Went back to the property, installed the new fuel pump
- Put the cleaned injectors back in and reassembled the intake manifold. That all went pretty smoothly.
- Created a system where we had a line going from a jerry can to the high pressure fuel pump, and then a return line also going into the jerry can
- Primed it with fuel first, verified the pump was working and all was good
- Tested the voltage at the pump when the key was turned. There was a super short priming pule where I saw about 11V, then while cranking I saw 9V at the pump
- So we plugged in the pump to the car wiring system, and IT STARTED FIRST TRY
- It was crazy, but then the engine sputtered out
- We did this a couple times and then we connected the fuel pump directly to an external battery, and it idled right along it was awesome. 
- Connected the back half of the fuel system and used the pump to pump fuel from the tank into another jerry can.
- Then we filled the tank with about 5 gallons, and got it to run on its own tank and return system!
- It idles pretty well, sounds like it has lifter tick to me. It goes away when you give it a rev and oil pressure comes up. Nothing worth getting worked up about just yet.
- We changed the oil, nothing unusual in the engine oil which is rad
- The fuel going through the rail just sounds bad, like lots of air in it and a gurgling noise. I think the high pressure fuel pump has too much asked of it and it can't pick up all the way from the tank, or there is some kind of air getting in. We need to re-visit the jerry can fuel system I think.
- End of the day I jacked up the rear of the car, put it in drive, and the rear left wheel started spinning with some force! It was the only wheel off the ground, very exciting. 

### 10/16/2025
**Category:** Precursor Rack

**Task:** Keep designing, start printing

**Notes:**
- tested the top plate that I printed yesterday, mostly good, 1.3" is wayy too generous for the 1" cylinders, tightened that up. Missed some dimensioning previously
- First stab at the side plate, just working too fast and straight forgot to dimension some stuff so there were holes but all the wrong size and places
- Learned the 3D printer is pretty dimensionally tight actually. To within a couple thousands so for the m3 bolt that measures .113 I made a .1 hole and it threads well. 
- Got a proper top and side plate screwed together and it is so cool. Lots of people saying it looks like art, which is the highest compliment I think.

**Category:** Dan's 2004 Subaru Outback

**Task:** Diagnose front end shake

**Notes:**
- Jacked up the car, inspect the front right wheel, everything was tight there
- Jacked up fron left, that wehll had a lot of play in it. The lug nuts were tight but I was able to move the entire assembly inside the steering knuckle so it wasn't ball joints
- My thinking is it's just the bearings, short test drive and there was definitely growling coming from that front corner, not safe to drive really. 

**Category:** Mark's Ranger

**Task:** Test and re-assemble fuel pump assembly

**Notes:**
- Applied 12v to the new pump, it worked right away, thank god
- Rebuilt the little fuel pump assembly, it was trivial to put together.

### 10/14/2025
**Category:** Precursor Rack

**Task:** Keep designing, start printing

**Notes:**
- Finished up the top plate, I figured out a work around for the issue where it wouldn't let me use the voronoi feature inside of two different sketches
  - I just made a second sketch
- Added countersunk bolt holes for m3 bolts, I figured that's better than attempting to snap them together with the tolerances on our printer
- Also made up some side plates. The good news is that none of this is load bearing so I don't have to be too robust or rigorous in my design.

### 10/14/2025
**Category:** Precursor Rack

**Task:** Start designing a better precursor rack

**Notes:**
- My intern did a lovely job designing a precursor rack a couple years ago, all heavy duty aluminum, must've cost a fortune at the machine shop.
- He designed it true to the constraints of the time which was to maximize precursors, but now that we've significantly reduced the number of precursors, we can design a better rack.
- I'm 3D printing it, spacing out the precursors a lot more to accomodate them when they are unopened and have the red valve caps on them.
- As an added fun, I'm going headvy on the Voronoi design which looks sweet and should use less material.

### 10/08/2025
**Category:** Public Cruiser Bicycle

**Task:** Rebuilding Hubs, New Rear Brakes, New Seat and Grips

**Notes:**
- Installed new seat and grips
- Installed new rear brake pads, I took some from my mystery box. They're a different style than the origincal and they sit a lot closer to the rim. Definitely dragging just a little bit becasue the wheel is aout of true and the axle is loose
- Tried replacing the axle with one I bought but the size of the cone was off and the pitch was different so I wasn't able to re-use the old cone. It really feels like it should work not sure why it's fighting me.


### 10/06/2025
**Category:** Public Cruiser Bicycle

**Task:** Rebuilding Hubs, Mounting Tires, conneecting brakes, new chain

**Notes:**
- Rebuilt the rear wheel bearings, it strikes me that the axle is bent so it'll never roll right. I got it good enough to dilly dally but I'll buy a new axle.
- White tires went on easy enough, they're folding styl and came very flat so it was a chellenge to get them to take the cured shape
- Put everyhing back together, adjusted brakes. Still needs more brake love.
- New chain with master link, funny that I've been using the same chain breaker for 10 years.
- Cleaned up the seat tube, it was coated with rust from the down tube. The seatpost itself is aluminum. I went a bit too hard with the wire wheel and scuffed the aluminum but you get that.
- Rode it around the block, the seat and grips are worse than I thought, the seat is like sand paper.

### 10/5/2025
**Category:** Public Cruiser Bicycle

**Task:** Removing tires, servicing hubs, tensioning wheel

**Notes:**
- Removed the rear wheel, the free wheel actually spins pretty nicely, it was the rear hub that was very seized in there
- It's a cup and cone style which is great, pulled it apart and started cleaning the old grease
- Removed front and rear wheels, removed tires, tensioned spokes 1/2 turn tighter all around. They're still decently true
- Lubed the brake calipers and the brake lines, they're working much better now 


### 10/4/2025
**Category:** Ford Ranger

**Task:** Engine cranking, spark checking, fuel pump testing, injector testing

**Notes:**
- Started by turning the engine by hand, it did two complete revolutions freely which was great
- Checked the fluids, it has trans and engine oil, the engine oil was very black. I may have seen a little metal on the engine oil dip stick but could be paranoia
- Installed the battery from the t bird, tried cranking but nothing from the starter motor
- I jacked up the car and hit on the starter while Mark cranked it, and would you believe it started turning???
- Had to do this cranking and hitting a couple times but it broke free for good eventually
- I pulled a plug and checked for spark, and it had spark!
- I put some carb cleaner straight down the intake and it actually tried to go! A great sign
- Of course it didn't want to start on its own fuel natually, since it was like varnish, so I disconnected a fuel line under the truck connected to the back side of the fuel filter
- Very varnishy gas came out, I'm a bit nostalgic about that smell. Means you're having fun.
- We turned the key with the line disconnected and no fuel came out, no noise from the fuel pump
  - I guess thinking back, we assumed there was something to pump in the tank, but no flow and no noise
- Pulled the high pressure frame rail mounted fuel pump and connected it straight to a battery. It was kinda trying to turn you could tell, but it was locked up. Couldn't smack this one back to life
- So we got creative and joined the fuel pump on the isuzu to the back of the fuel filter on the Ranger
  - This worked! The problem was it's a return style fuel rail in the Ranger, so I was basically pumping my tank out into the Rangers
- Tried to start it again, and it wasn't even close to starting. We did verify the fuel rail had high pressure fuel, burped the rail
- Made the bold choice to pull the injectors! Taking off the top of the manifold wasn't that bad, just a head of rat poop everywhere.
- Tested the injectors and sure enough none of them were firing even when connected directly to a battery
- However some carb cleaner down them to break up the varnish and they all started clicking again! Who knows what their flow is like, but at least they open and close
- That's where we left it. Debating on buying a new fuel pump. They're only like $40, probably worth it. 
- The questions is always "why was this parked?" And I haven't found the answer yet. The injectors and fuel pump weren't working, but that seems like a symptom of just sitting. I noticed the rear tires were worn to the threads, maybe best case it the tires were so old they'd rather park it than replace it, and then it wouldn't start because of the fuel pump and it just sat?

## Troubleshooting Process

{% mermaid %}
graph TD
    A[Start: Engine won't start] --> B[Turn engine by hand]
    B --> C[Check fluids]
    C --> D[Install battery from T-Bird]
    D --> E[Try cranking]
    E --> F[Jack up car & hit starter]
    F --> G[Check for spark]
    G --> H[Spray carb cleaner down intake]
    H --> I[Disconnect fuel line]
    I --> J[Check fuel flow]
    J --> K[Test fuel pump directly]
    K --> L[Use Isuzu fuel pump]
    L --> M[Connect to Ranger fuel filter]
    M --> N[Try starting with external pump]
    N --> O[Pull injectors]
    O --> P[Test injectors with battery]
    P --> Q[Clean with carb cleaner]
    Q --> R[Reinstall injectors]
    R --> S[Ready for new fuel pump]
{% endmermaid %}

### 10/03/2025
**Category:** Miscellaneous

**Task:** Cleaning up the garage, Fixing the Isuzu Rear View Mirror, Fixing the Isuzu Tailgate

**Notes:**
- Cleaned the garage. It was a mess.
- The rear view mirror was falling off, so I learned how that works. After years of ratting I solved it. Missing and loose bolts, always something like that.
- One of three bolts was missing so I replaced and tightened them all. Added some VHB tape to where the mirror clips on to the base for good measure. No more rattle!
- The tailgate decided to get stuck for the first time ever which was weird. The thick rod that actuates the latch had fallen off at the handle. I had to remove the rear latch cover to fix it. I was pretty mad and just started kicking stuff. Not the way to do it. Lubed everything while I was in there. 



