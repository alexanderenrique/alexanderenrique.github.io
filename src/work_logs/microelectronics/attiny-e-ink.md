# Running it back
## Outline:
This is going to be a more max effort version of the e-ink/denton's fun box display.

## Changes in this version:
- Removing the ESP32 for an Attiny (series TBD)
  - This removes the wifi and bluetooth config options
- Adding SD card for data
  - I can hold an absolute shit load of facts on a 32 GB SD card
  - I have a lot of facts cached on my server already that we can cycle through
- Adding button mounted at a 90 for various purposes
- Removing refresh rate config, you get what you get, maybe refresh every 11 hours
- Adding button allows refreshes on command. 
  - Double tap on the button to read temp and humidity

## BOM
- Attiny 3224
  - smaller than 3226, same flash and ram but smaller form factor
  - IC MCU 8BIT 32KB FLASH 14SOIC 
- Low Iq LDO
- BMS for charging battery
- LiPo pouch for smaller form factor
  - Running at 3.3V
- 3 (4?) p type mosfets for power gating
  - Gating: Voltage divider, display, SD card, temp sensor ?
- Voltage divider for battery percentage monitoring

## on the nice list:
- Nick and K
- Kyra and Clayton
- Eddie and Norma
- Me
- Graham and melissa
- Gabe and sofia
- Raghavan
- Anthony
- Lavendra (?)
- Neel (?)
- Carsen
- Ashley (?)

## notes:
- Current ID of the enclosure is 1.7"x3.8" or 43mmx96mm (-ish, this is slightly smaller but good assumption)
  - The LIPO pack I am considering is (29.0mm x 36.0mm x 4.8mm)
  - I believe this gives me a board area of 96mm-36mm= 60mm wide
  - And I can keep the height of 43mm or so tall, or maybe a bit less for clearance
- Want the PCB to take half this space, and the battery to take the other half for maximum flatness
  - Something like a 500 mAh battery could fit real nice
- It's be cool to make it magnetic or something too so it can stick to a fride, for bonus points

### open questions
- Should I use an internal Vref for the battery voltage divider?
  - like if the battery voltage drops will that mess with the reference and they'll like drift together and give false readings?
- Where do the e-ink pins need to be in relationship to the top of the PCB?
- Can any pin be used at the wake up interrupt pin for the button?


### Work Log

### 10/9/2026
**Task:** SSOP, layout improvements

**Notes:**
- SSOP
  - Briefly considered moving to a smaller form factor for the MCU
  - SSOP would save space, but like i already have a minimum width based on the connectors and buttons, and I don't really need to save that much space so I scrapped the idea
- Layout improvements
  - I feel like the terminal-esque font just isn't the move for consumer products
  - I also wanted to make sure that facts weren't being truncated, so I did a litle investigation
  - Moved the font type from the very terminal like font, so a serif with a bold title.
  - Also made it like the old display, where the first line is a red header, which I think looks pretty good. 

### 10/7/2026
**Task:** Schematic and PCB design, thinkin' about batteries, shipped and improvements already

**Notes:**
- Schematic and PCB design
  - Nailed it on the design. I'm feeling really good about it.
  - I learned how to import 3D models and assign them to footprints in KiCad, so I could actually see what my little button would look like.
  - I just sent it off for manufacture. I only did three boards because I'm sure there will be some things to correct.
- thinkin' about batteries
  - Lots of people have expressed interest in giving these away to friends, and so I want to do a big run of them and also give them away to my friends for Christmas.
  - Maybe I'm a cheap ass, but buying a bunch of 500 mA batteries was getting kind of expensive and running up the cost on the BOM
  - Running the numbers, something like a 150 mA battery should theoretically be more than enough power to power this thing for a year if I do my programming right
  - And it would save me at least a third of the cost of how much a 500 mA battery would cost, and it should keep the whole profile of this thing really low, which I am enthused about.
  - If I go for the lower amperage, 150 mA, I learned that the charge rate is equal to the capacity of the battery, so I'll have to choose a larger resistor for my BMS circuit do reduce the charging current
- shipped and improvements already
  - So I shipped it, walked away for like an hour and already realized some stuff
  - I learned there are power only USBC recepticles which I think would prove to be really, really useful in my case so I've already gone ahead and redisgned the board to accomodate those

### 10/6/2026
**Task:** Schematic and PCB design

**Notes:**
- Schematic and PCB design
  - I leared about the little MOSFETS on top of the battery pouch, they do draw some current which is a bummer but I think I can live with it
  - Given all the other saving and changes I've made I feel like a year of batterylif is attainable


### 10/5/2026
**Task:** Project inception

**Notes:**
- I've been wanting to re-do the e-ink display for a while but I couldn't quite figure how to do it so that it'd make me happy
- As I was reading the book Eddie gave me on leadership, he has it bookmarked super hard with all these quotes that I really think are great, and it would be so cool to have a desktop thing that can display these quotes, e-ink style
- What I decided on is to just scrap the WiFi, I don't care enough about earthquakes or where the ISS is
- Plus we can avoid all the config and bluetooth, and just have a little display you pop an SD card into, it displays facts, and that's it
- On a 32 GB SD card, you can put like 100 million quotes or fun facts, which is a lifetime
- Plus, with better power management and no Wifi or BLE we can actually have super, super long battery life
- I learned that humidity sensor have like pretty long response times, like some up to 8 seconds, and that's not even for full response, it take like 4x that time to get really accurate readings. There are some that have 2s response but I'm wondering if it's even worth it to have temp
