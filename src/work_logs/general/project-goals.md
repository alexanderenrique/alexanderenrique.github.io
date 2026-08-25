
# Over all project goals

## MQTT Display:
### Goals:
- Before UGIM:
  - Have at least 10 monitors in high visibility places in the lab
  - Have the github very clean and polished
    - Have really tested the Broker Code, make sure everything is documented and repeatable
  - Tutorials and schematics on how to implement

### Status:
- Working demo on NEMO dev
- Rough enclosure design

### Up Next:
- Finish enclosure design
- Clean install on NEMO-Dev
- Get Funding approval
- Install on Live NEMO
- PCB Rev 2.0 (smaller, different boards?)
- Adding it to my website
- Adding a BLE config option??
- Installation guide on website

## e-ink Display:
### Goals:
- Before UGIM:
  - Have 5-ish displayed in high visibility areas
    - Gowning room, litho 2X, Mavericks?, ALD area?
  - Have the github very clean and polished
  - Tutorials on assembly, firmware and config
  - Website improvements, make it really clean and obvious
  - Tutorials and schematics on how to implement
  - Creating a web store where I can sell the kit??
  - Creating a little company that can help with support??

### Up Next:
- Finish enclosure design
- Ordering more PCBs, displays, ESP32s
  - Currently have 5 PCBs left, 4 screens
  - I've built 2, if I want to deploy 3 more my limiting factor is ESP32s
- Creating BOM
- Tutorials
- Getting the word out


# Weekly Goals

## Week [33] Starting 08/3
- T bird electronics:
  - Engine Node:
    - Hopefully receive board
    - Mock the TC routing
  - Display Node:
    - Mounted, wired int
  - 555 Timer:
    - Testing with relay instead of mosfet
- T Bird Wrap:
  - Finished removing trim, painting and sanding done
- T bird bumper:
  - Finalized the mounting bracket, sent out to laser cutting

## Week [31] Starting 07/13
- T bird electronics:
  - Engine Node:
    - ~~Hopefully have received and start populating the PCB~~
    - ~~Designing enclosure~~
  - Display Node:
    - ~~Have figured out the RS-485 between ESP32 and display as dummy test~~
    - ~~Bonus points for doing this with an Attiny~~
  - 555 Timer:
    - Print better enclosure
    - Water proof PCB
    - Make a second thin board
    - Install V2
- T Bird Wrap:
  - Finished painting and sanding, ready for wrap!
  - ~~Have ordered rest of wrap supplies~~
  - Have seriously thought about hitch

## Week [30] Starting 07/06
- T bird electronics:
  - Engine Node:
    - ~~Figure out the Attiny Programming~~
  - Display Node:
    - Learn Stone software, if they ever ship my order
    - Learn LVGL Pro, start making GUI
  - 555 Timer:
    - ~~Design larger enclosure, better fillet action~~
    - ~~Solder together~~
    - ~~install it! It'd better frickin work~~
- T Bird Wrap:
  - Finished painting and sanding, ready for wrap!
  - Have ordered rest of wrap supplies
  - ~~Have seriously thought about hitch~~

## Week [29] Starting 06/29
- T bird electronics:
  - ~~Ordering the digikey(with UPDI programmer)~~
  - Engine Node:
    - ~~Send out board for v1~~
  - Display node
    - Have it bread boarded
      - ~~Display Working~~
      - ~~PWM~~
      - LDR, verify analog inputs
- T Bird Wrap
  - ~~Have ordered wrap~~
  - pulled dent
  - ~~finished prepping front half~~

## Week [16] Ending 04/26
- E-ink
  - Soldering, cmon soldering is fun
- MQTT
  - Getting more (12?) Boards out for manufacture
  - Solid conceptual case, will need to modify exact dimensions later as the PCB moves
  - Placing order for Displays, USB cables, etc
- Tableau
  - ??? See what stanford IT can help with

### Focus for the week

## Week [15] Ending 04/19

### Focus for the week
- E-ink:
  - Actually finish soldering say 4 more
- MQTT:
  - Publish the latest version to nemo-dev
- Chat bot:
  - Finish SAML
- Tableau:
  - Start experimenting with the Tableu bridge to the dev server


### Result:
- Got MQTT implemented in 2.3.3, it works!
- Got SAML working thank god
- Did not do any soldering on the e-ink
- No work on Tableau

## Week [14] Ending 04/12

### Focus for the Week
- E-ink
  - Wrap up deploying the sensor project, I just wanna be done with these!
  - 3 boards left, finish soldering and deploying all but one
  - Getting the intern sensors correctly depoloyed
- MQTT:
  - Clean uninstall and re-install again
  - Add to git lab
  - Order more PCBs
  - Place order for more Displays, long USB cables, ESP32s, etc

### Result:
- E-ink:
  - Did zero work
- MQTT:
  - Launched plugin in prod, had a straight up bad time
  - figured out some major shit. The bridge was launchin inside django and it was being constantly created and destroyed by workers
  - 
  - feeling better about it now, how much testing is too much testing?
  - Worked on VM and display code a little
- Chat Bot:
  - Worked hard on SAML took a fair bit of time and energy. Still not there
- Tableau:
  - Got the blessing from IT and dev that the db replication is a good idea

## Week [13] (I crashed my motorcycle and my body hurts and I was in a bad mood for a week)

## Week [12] Ending 03/29

### Focus for the Week
- Deploying as many E-ink tags as I can (4?)  
  - ~~Finish soldering~~
  - ~~Printing enclosures~~
  - ~~Adding to nemo~~
- Testing power draw of e-ink tag (battery seems to be draining faster than I'd expect)
- ~~Clean un install and re-install of MQTT on nemo-dev~~
- Finalizing enclosure for MQTT display

## Week [11] Ending 03/22

### Focus for the Week
- ~~Display implementation of the shutdowns/tasks~~
  - ~~Updating the VM code to accomodate processing the new MQTT messages~~
  - ~~Testing the display~~
- Project approval from the boss to deploy MQTT
- ~~Soldering final (haha) e-ink basic~~
  - Measuring power consumption
  - Designing enclosure for final e-ink basic

### Retrospective
- Its always harder and mode fiddly than you think, but we learn!
- Learned a shit load about networking from the whole range extender, lots of things going on behind the scenes. I do love the deterministic nature of Microcontrollers

### Goals

#### Top Priorities
- Getting MQTT Plugin installed on Dev
- New case for e-ink sensors
- Boss sign off on my projects

### Retrospective
- Got MQTT on dev, way way harder than I thought
- Designed a new case v2.0 for the monitors

## Week [11] Ending 03/15

### Focus for the Week
- Getting MQTT Plugin working on Dev

### Goals

#### Top Priorities
- Getting MQTT Plugin installed on Dev
- New case for e-ink sensors
- Boss sign off on my projects

### Retrospective
- Got MQTT on dev, way way harder than I thought
- Designed a new case v2.0 for the monitors
