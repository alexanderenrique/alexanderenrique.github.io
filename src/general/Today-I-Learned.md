---
layout: page
title: "Today I Learned"
categories: [general]
tags: 
  - learning
  - knowledge
  - daily
  - discoveries
  - insights
  - tips
  - tricks
  - documentation
  - #learning
  - #knowledge
---

I'm learning just all the time and I think it's cool to look back and see what you learned and when.

## Learnings

### 03/18/2026
- Range-extender DHCP/subnet mistakes are a crash course in real LAN behavior; microcontrollers feel simple by comparison once the path is fixed
- Range extenders can run their own DHCP and strand IoT on a subnet; "Auto" can flip behavior between runs
- If the extender uplinks on 5 GHz guest Wi-Fi, clients can get an address in a different range that never reaches the collector on LAN
- Different SSIDs for main vs extended Wi-Fi trades seamless roaming for more deterministic device behavior
- Non-standard SSH plus a broken SSH setup cost hours to recover
- Same UI can work at home but misbehave in the lab until environment-specific tuning


### 03/16/2026
- Stripping the MQTT monitor API down to connection status reduces unnecessary exposure
- E-ink V3: SOT-223-4 P-FETs are workable to hand solder; MOSFET inrush can brown out an ESP32 until reset after power-up
- NTP time sync on battery tags can be flaky and needs more validation
- BLE payloads cap around 512 bytes — long messages need chunking or another channel
- Motorcycle oil massively overfilled can fill the airbox and weep everywhere; a small drain can restore correct level


### 03/14/2026
- On NEMO-Dev, embedded MQTT can win when system Mosquitto/Redis installs fight you for hours
- Moving to PostgreSQL with instant DB notifications can replace a separate Redis hop with only milliseconds added
- Django auto-imported plugin URLs may resolve to `/monitor` instead of `/mqtt/monitor`, so frontend API paths must match reality
- Wrong MQTT credentials actually break the secure broker link — useful confirmation that auth is enforced

### 03/13/2026
- Dev Redis options (system Redis, redislite, install-on-start binaries) were all brittle until leaning on the native DB path

### 03/12/2026
- Husqvarna front wheel: a transmission jack can lift the bike; axle is large 12 mm Allen plus four clamps; front caliper must clear to drop the wheel

### 03/11/2026
- A wheel marketed tubeless that leaks at the valve stem may still have a tube inside

### 03/10/2026
- SOT-223-4 is a practical hand-solder SMD package for power switching vs oversized through-hole FETs
- Gating both e-ink and SHT31 from supply cuts idle leakage; V2 tag used roughly 1% battery per day at 30 min refresh with ADC path gated

### 03/04/2026
- PyPI name collision led to renaming the plugin project to NEMO-MQTT-Bridge

### 03/03/2026
- Server-saved Django config can be overwritten when production settings come from GitLab — know the real source of truth
- Green/red for enable alone can mislead; conveying broken vs idle operational state matters

### 02/28/2026
- NEMO tool display: coloring the full border by tool status scales better than truncating long tool names
- MQTT plugin packaging: another `nemo-mqtt` existed for interlocks; secrets pushed in `config.h` mean rotating keys and tightening hygiene
- Thunderbird coolant senders can disagree a lot at the same temperature — always verify resistance vs gauge readout
- Ford Ranger / mini bike: stuck high idle can track a bad ECT reading; base timing on Fords needs SPOUT disconnected to read true base
- E-ink roadmap: coin cells cannot surge like LiPo; splitting "tag" vs full-feature boards is probably necessary

### 02/27/2026
- NEMO display: "current user" vs "last user" fits in-use state; lab name length distribution (median ≤12 chars, 95% ≤20) drives layout choices
- End-to-end MQTT + TFT worked first try on the bench — packaging and NEMO-Dev are the next cliff
- Thunderbird trunk dome light: circuit may be always-hot with ground through the shell — a real limit switch beats expecting the trunk to complete ground

### 02/26/2026
- HMAC: broker and publisher must hash the exact same bytes — parsing JSON before signing easily desynchronizes verification
- SHA-256 HMAC keys are just shared secrets; they are not fixed-length "password shapes"
- NEMO config must reload credentials cleanly after changes or you chase phantom auth failures
- Thunderbird door cards: heavy warp needs relief cuts (or reinforcement) before clips can hold

### 02/25/2026
- For this lab MQTT path, username/password plus HMAC beat fighting TLS on the collector for the same threat model
- E-ink: thinking hard about battery chemistry (coin vs pouch) and PCB forks for tags vs logger boards

### 02/24/2026
- Duplicate MQTT publish/subscribe paths are worth collapsing to one in and one out
- Firewall rules on the collector VM were the real blocker for external reach, not just Mosquitto

### 02/18/2026
- NEMO MQTT: hooking the existing usage-event signal reduces core NEMO patches vs a custom hook
- Redis stream is upstream of MQTT — if it hits Redis it should reach MQTT; the monitor can follow Redis instead of snooping its own broker
- KiCad: footprint time dominates simple boards; always re-verify critical mechanical dimensions before fab
- Pump monitor: cheap 5 V RS-485 ICs often want 5 V logic, not 3.3 V — MAX3485-class 3.3 V parts exist in quantity for low cost

### 02/17/2026
- Stanford OTL: rights hinge on more-than-incidental Stanford resources and on commercialization intent; laptop-only use skews incidental; non-commercial hobby path is simpler
- E-ink PCB V2: ceramic bulk cap can beat a huge electrolytic for hold-up; re-pinning in `hardware.h` fixed a silent display after a lifted battery ground taught "bad ESP" vs "bad screen"

### 02/16/2026
- `hardware.h` / `config.h` in firmware beats stuffing config in `.pio` that gets wiped on rebuild
- Verified touch pinout with a minimal script before locking the PCB
- NEMO display: Redis DB1 vs DB0 mismatch silently broke the bridge until the consumer pointed at the same DB
- Startup script that stops "all Mosquitto" can kill the ESP32's LAN broker on 1883 — reopen or protect that listener on NEMO start

### 02/11/2026
- OTA hosting: folder layout on the Pi plus a small upload script keeps manifests and firmware paths consistent
- Firmware/config version mismatch detection saves bricked loops
- CB350: carb #1 low power with fuel present can be a stuck needle — verify float/needle before chasing jets again

### 02/10/2026
- E-ink messages: word spacing is a render-pixel issue, not "more spaces" in the string
- Enclosure USB-C alignment takes more printed iterations than expected

### 02/07/2026
- Isuzu exhaust donut: wrong nuts on studs can cross-thread new studs — match thread and torque carefully
- Ranger in-tank pump install can fight straps and tank alignment; crusty fuel relay contacts mimic pump death; tilt sensor cut-out can cause instant stalls
- 1988 Ranger key removal uses a white button on the column — rotate only after pressing it

### 02/01/2026
- Thunderbird: cracked heater hose soft line can be shortened and re-clamped in a parking lot as a field fix
- Volvo charge light: loose alternator belt masquerades as exciter problems
- Ranger: low ATF (1.5 qt down) caused full slip; refilled and it shifted normally
- Ranger fuel pump prime is ~2 s then off until engine run — probe timing wrong and you think the pump is dead

### 01/30/2026
- NEMO merger: departments vs disciplines — disciplines may not flow through to billing reports the way departments do

### 01/27/2026
- Robot control systems require enabling servo motors before homing commands
- Pressure gauge communication systems use Rx/TX boxes for signal transmission
- Porsche active exhaust rattle is often a broken butterfly spring — tip comes off with T30 + three 11 mm bolts on the servo

### 01/24/2026
- FZ1 carbs: a single clogged pilot jet can kill running with no obvious smoking gun after rebuild
- Honda CRV re-key: third replacement (glovebox) finished the full lock set

### 01/21/2026
- Most ESP32 GPIOs can be remapped with care — breadboard validation before locking a dense PCB pinout
- Pump monitor SD on VSPI alongside display/touch worked when HSPI path refused to cooperate

### 01/20/2026
- Ellipsometry: Psi and delta represent phase change and amplitude ratio from material interaction
- MSE (Mean Squared Error) measures fit quality between model and experimental data, good range is 1-20 depending on sample complexity
- Thin film interference creates peaks and valleys in data when light travels through film, more peaks indicate thicker films
- Cauchy dispersion relation describes wavelength dependence of refractive index, usually increases at shorter wavelengths
- Effective medium approximation models rough surfaces by averaging optical constants from adjacent layers
- Complex refractive index (n + ik) and complex dielectric constant describe how materials affect light propagation and absorption
- Kramers-Kronig relationship ties real and imaginary parts of dielectric function - material can't respond until light interacts
- B-Spline layers use basis functions to model dielectric constants across photon energies
- Metals show flat data at 50-100nm thickness because they absorb everywhere, preventing interference features

### 01/18/2026
- Honda immobilizer: RFID antenna ring around the barrel must move with the new lock hardware; new metal + old transponder chip can satisfy the immo
- Riveted ignition collars often need a die grinder cutoff wheel and patience

### 01/17/2026
- CRV starter: bench test solenoid click with weak spin means replace, not more hammering

### 01/16/2026
- Breadboard SD wiring can be perfect yet fail until mechanical contact is sorted — flaky SPI is often physical

### 01/15/2026
- Sharing VSPI between TFT, touch, and SD is viable when a second SPI peripheral fights you

### 01/14/2026
- RTC coin cell: CR2025 is thinner than CR2032 but often fits electrically; battery rail is often regulated separately from main VIN
- Flashing ESP32-C3: disconnect UART link to a second MCU or flashing can fail mysteriously

### 01/13/2026
- RS-485 needs bias resistors (pull-up/down) and termination (~120 Ω) — plan for three resistors minimum on a segment

### 01/12/2026
- OSHWA certification for open source hardware
- FCC 15b certification required for selling electronic products, expensive ($3-5k)
- Stanford OTL (Office of Technology Licensing) process for IP disclosure
- Legal distinctions: bare PCBs need no FCC, kits are grey zone, assembled units require FCC and LLC
- Organizational alignment equals execution - culture matters more than strategy
- Culture is pattern of behavior reinforced over time, not beliefs but actions
- Variational autoencoders for defect detection: encoder -> latent space -> decoder, trained on normal wafers
- Ruthenium ALD: low resistivity, good for interconnects, no diffusion barrier needed
- FTIR fingerprint region 500-1500 cm-1 for material identification
- Diatoms use photonic crystals to manipulate light, absorbing at 400nm and reflecting UV
- DUV lithography uses KrF laser at 248nm, EUV at 13.5nm (basically xray)
- EBL proximity effect: electrons scatter up to 70um deep, requires energy compensation based on feature density
- PUF (Physically Unclonable Functions) use chip imperfections for security keys
- Loss aversion: pain from loss greater than joy from gain, affects bonus-based incentives
- Intrinsic motivation requires autonomy, mastery, relatedness, and purpose
- Removing pain points motivates better than adding new features
- UART to a remote head over long cable is an EMI problem for resale: fast edges matter more than baud; differential RS-485 tames radiated noise compared to single-ended UART

### 01/10/2026
- Parasitic draw near 0.16 A can kill a battery in about a week — do the math, not gut feel
- Surface-charged "good" 12 V spare can crank once then rest at 12.2 V — still useful if amps are there

### 01/09/2026
- Inter-ESP SPI vs a shared bus: MISO wiring can silence a display — pin conflicts are subtle
- Bit-banged SPI works but wire count adds up; half-duplex UART simplified a two-node link dramatically

### 01/08/2026
- CRV intake removal for starter access: throttle body coolant bypass hose will weep — expect a small coolant loss

### 01/07/2026
- NEMO API requires complete rate data to generate billing reports
- Filed invention disclosure with OTL for ESP32 e-ink module, navigating Stanford IP requirements
- Seeed XIAO ESP32-C3 is not pin-for-pin a drop-in for a generic ESP32-C3 module — check every net
- Paying a few dollars for an external antenna module can save days of Wi-Fi grief on C3-class boards
- Sharing HSPI with a second MCU on certain MISO pins can brick an SPI TFT until you move chip selects and MISO routing

### 01/06/2026
- ATtiny savings shrink vs ESP32-C3 once you count programming hassle and SMD assembly — dual-footprint boards can offer cheap-or-connected SKUs
- MCP6022 exists in DIP — through-hole op amps keep pump module kits hand-buildable

### 01/05/2026
- Houses shift striker plates and jambs; routers and die grinders are fair tools for re-hanging stubborn doors

### 01/03/2026
- Cheap sound-trigger modules fire on sharp transients (clap, door slam) more than sustained shop noise like an angle grinder — tune sensitivity and expectations

### 01/02/2026
- Repeated no-crank with good battery often means starter replacement, not more jump starts
- Garage noise-relay board: relay coil can pull ~50 mA — too much for a GPIO; energize the coil through low-side N-FET switching instead of sourcing from the pin

### 12/31/2025
- NEMO merger go-live: consumables visible, interlocks activated, final Badger qualifications uploaded into NEMO

### 12/29/2025
- ATtiny 402 bring-up: bit masks and configuring peripherals directly in C feels different from Arduino-style abstraction

### 12/18/2025
- Thunderbird: 195 °F thermostat still ran cool at the housing — thick gasket may let coolant bypass; gauge resistance curve may not match sender
- Pump monitor: CT V-RMS reads higher on bench supply than on a laptop USB feed — bias/reference sag matters; Squareline Studio free tier licensing takes a minute to parse

### 12/15/2025
- Splitting a remote pump head from a wall-mounted ESP32+TFT via RJ45 keeps vibration off the expensive half and standardizes cabling

### 12/14/2025
- Sampling rate vs kSPS, aliasing (high frequency folding down), and why piezo vibration sensing is mechanically picky

### 12/11/2025
- High-impedance resistor dividers sag badly under ADC load — a dual op amp can hold a stiff mid-rail bias and amplify small CT signals

### 12/9/2025
- Steinhart–Hart with two parameters can beat a bad three-parameter fit for NTCs when C is junk
- CT front-end: undersized coupling cap acts like a high-pass and kills low-frequency content you care about

### 12/8/2025
- CT clamps need a single conductor through the core — whole cord cancellation gives near-zero signal
- 2.2 Ω vs 2.2 kΩ in a divider is an expensive typo — math on expected node voltage finds it fast

### 12/7/2025
- Rapid pump-monitor prototype: CT on a split fan cord sanity-checks mV/A scaling

### 11/30/2025
- Smart T-Bird: ADC1 vs ADC2 on ESP32 — voltage divider + O2 on the wrong ADC path misbehaved; ADC offset/calibration is not "just ratio math"
- P-type dimming transistor rework beat the old PNP approach for backlight control

### 11/29/2025
- Classic ammeter: original design ran alternator output through the gauge; high-output alternator needs a shunt, not full current through the dial
- Instrument voltage regulator (IVR) output is pulsed — DMM average lies; grounding the sender wire still proves gauge sweep
- Started writing Modbus/RS-485 code by hand instead of only vibe-coding — sticks better

### 11/21/2025
- CAN stack size and MCU support pushed the car project to RS-485 modules that work on any ESP32 variant
- Learned about the RS-485 protocol, and how to use it to communicate with the ESP32s.
- Learned about how LEDs operate on a fundamental level. The whole current not scaling linearly with voltage is a trip.
- Learned about constant current dimming and how to use it to dim LEDs
- Learned about RSENSE and how to use the external resistor to guide how much current the IC will push
  - It isn't safe to set it to a high value and forget about it! You need to set it according to your current needs
- Learned about inductors on constant current boards, and the internal frequency clock type deals. They all play together, so interesting.

### 11/13/2025
- NEMO-to-Drive: billing row count ≠ usage-event count because consumables generate billing lines too
- Yearly CSV bug from only refreshing 40 days of data; duplicate `item_id` rows were script artifacts — NEMO enforces uniqueness server-side

### 11/8/2025
- LED tail-light bulbs may fail as both running and sequential turn signals — low draw + low running voltage vs incandescent expectations

### 10/06/2025
- Woollam lamp alignment: mirror held by one bolt and double-sided tape, UV beam focuses to tiny spot
- VCR o-rings can flatten from heat, causing vacuum leaks
- CpIn precursor should be bright yellow when fresh, grey indicates quality issues

### 11/26/2025
- Learned how the guages in the t bird work. They're just bimetallic springs. Lower resistance from sensor, more current flows through, more deflection of the spring, more movement of the pointer.

### 11/25/2025
- More about RS-485, it's the physical layer with the modbus protocol on top.

### 11/07/2025
- Learned that Web Socket Http, ModbusTCP and ProXr are all communications protocols, which I half knew, but I was able to decipher which protocol was being used by the standard port used on the SNSF interlocks. Probably. They can have differeent ports of course. 

### 11/3/2025
- Converting from OBJ to GLB, and how to use them in model-viewer
- React and CSS, like how they work together and interact

### 10/29/2025
- Really learned about traing on margin, I think I actually get it now.

### 10/16/2025
- Learned about TLS handshake and how it works.

### 10/15/2025
- Learned about Brewster angles again. 
  - p-polarized light (polarized in the plane of incidence) is not reflected — it all transmits.
  - s-polarized light (polarized perpendicular to the plane) still reflects.
  - So basically in ellipsometery: near the Brewster angle, the reflectance of p-polarized light drops sharply. Small changes in film thickness or refractive index cause large measurable changes in the reflected polarization.

### 10/14/2025
- learned about Voronoi and how to use them in onshape designs
- U, V, and Seed parameters.
  

### 10/13/2025
- learned about Jitter in the sense of retrying a connectino as a way to mitigate many seperate things trying to connect at the exact same time.
  - Evidentely plus or minus 10% is ideal, not too long and wasting time, not too short and not solving you "trampling herd" problem.

### 10/10/2025
- I feel like I really understood birefringence for the first time, thought I've tried to learn it countless times
- Learned in the context of ellipsometery of course

### 10/04/2025
- Ford Rangers use a dual pump fuel system.
- Hitting a starter motor with a wrench CAN actually work


### 10/02/2025
- how to buy a domain and link it to your github pages site
- about DNS and TXT records and how to set them up and kinda what they do ish


###10/1/2025
- learned about 11ty and other ways to build a website
- learned about mermaid.js and ways to spice up my page with diagrams

### 09/25/2025
- How python plugins are structured and how to make your own

### 09/24/2025
- Redis as an intermediary between NEMO and the MQTT service, the concept of message queues and how they work

#### 09/10/2025
- When you manually start a google VM, you are using one set of permissions. When you cloud scheduler starts it using the SA (Service Account) it has a different set of permissions. And the SA needs to have the privileges to say get credentials from GCP
- Also learned that at Harvard, if you work more than you job, you can get paid up to 1.25X your salary. Gonna be using that in the future.

#### 09/09/2025
- How to download and install modules from a tar.gz. file. Still don't really understand what they are, but there's tarballs and such?
- You really do need to use OAuth to schedule vm cron jobs in google cloud scheduler
  - sub bullet point, sometimes you need to slow down and use your brain

#### 09/08/2025
- TLS over MQTT and how the CA credentialing works. Security will always be a whole thing on computers huh?
- Learned about public and private I.P. addresses. Just because you can ping an address, doesn't mean you can access a specific port (like 8883 for SSL MQTT or 1833 for insecure MQTT)

#### 09/04/2025
- more about MQTT and how NEMO Merger can communicate almost instantly with the tool interlocks
- The NEMO API doesn't support any kind of filtering or pagination, if you ping it, it returns the full object

#### 09/03/2025
- Digital low pass filters, especially in terms of IMUs. You don't want all the jittery high frequency noise, so you can implement a low pass filter to just give you the real stuff - used in Smart-T-Bird project


#### 09/02/2025
- g forces in a passenger car without sticky tires is really pretty low I've been told, like less than 1g in acceleration, cornering, and braking
- It takes a serious track or electric vehicle to get you over 1g, or a fighter jet or f1 car - relevant for Smart-T-Bird IMU sensors
- grounding resistors for an LDR make a huge difference. Without the resistor, the LDR is basically always high, like maxed out. I think a 2K resistor ended up being the sweet spot. Almost all the way up - used in Smart-T-Bird auto-dimming display

#### 08/30/2025
- Seems obvious now, but you can't just use any old MOSFET or transistor for high side or low side switching. 
- The LED screen I have only has control over LED power, so I'll have to PWM the high side. No control over ground - used in Smart-T-Bird display control
- Learned about BJTs vs MOSFETs. So many different kinds and types of doping and everything else

#### 08/29/2025
- You can use an ESP32 C3 with CAN, you just need a module that goes from SPI to CAN. Lots of these modules already exist and have the transmitter built in. - used in Smart-T-Bird CAN bus communication 

#### 08/28/2025
- Temporary Voltage Spike diodes and how they work. They're like blow off valves for high instantaneous voltage spikes. I'll need to put one in front of my buck converter in my display - used in Smart-T-Bird power management

#### 08/27/2025
- Google cloud shell and how to set up cron jobs to turn the VM on an off. No need for it to stay on all the time just to run a job a couple times a day! - used in NEMO Merger automation

#### 08/24/2025
- RTOS and how that works, like FreeRTOS. I don't think I need it for any of my current work, but cool to know it exists
- Learned how to do GD&T in OnShape for the yoshimura flange project, to get it on the blog - see 3d-models for the final design


#### 08/23/2025
- Spanish Moss does not natively grow in California, it's actually a lichen called lace lichen, and it's the state lichen of California. The more you know!

#### 08/20/2025
- mkdocs is the truth, started learning about how to lay out a blog using it instead of github pages themes - used to build this index site

#### 08/17/2025
- working with github pages I started learning about layouts of webpages and .scss files

#### 08/10/2025
- I learned about jumbo mortgage loans, anything above about $1.1 million in the bay area
  

#### 08/05/2025
- the google OAuth doesn't work so well with a headless set up like in cron job. It needs to constantly open new ports or whatever on the local host for authentication. It would work for a couple hours and then silently fail
- Service accounts are the way to go for Cron Jobs

#### 08/05/2025
- Messing with the cron job I feel like I have a much better grasp of interacting with the terminal and using nano to modify files. I don't know many commands but definitely the common useful ones. 

#### 08/04/2025
- there are limits to the max power your wifi is allowed to have, set by the FCC. Basically if any one person has too powerful a device it can mess things up for everyone
- You can buy ESP32s without the integrated wifi antenna, and plug your own antennas in.
- The C3s just have totally horrible antenna, they don't connect for shit
- The programming language GO, I wonder if it could help me speed up some algo stuff. 
- cronjobs, set up my first one on the collector computer

#### 07/30/2025
- learned about serial communications, man that stuff is cool. Synchronous, asynchronous, UART, I2C, SPI. It's like you use it and kinda know what's happening but cool to learn it
  
#### 07/28/2025
- MQTT and how that works, kinda
- Started learning about PRAM and the best way to drive displays
- Sometimes deleting a token and reauthenticating is the way to go
- Manually advancing the LVGL clock will solve your problems
- Started learning about Data Structures and algorithms. Learned about "bigO" and the complexity of running nested loops, like how that increases exponentially
- Kinda started on recursive algorithms but those tie my head in a knot

#### 07/25/2025
- reflecting on a past learning, I got all mad at the higher ups because they weren't doing shit, but sometimes the higher ups are also fed up because their higher ups aren't doing shit. So while it's important for your voice to be heard, maybe give them the benefit of the doubt. Maybe. 

#### 07/24/2025
- learned about glancing angle x-ray spectroscopy for very thin films


#### 07/23/2025
- in PlatformIO and C/C++ header files are a lot like modules in python. Or like utils so that's where you put stuff you want to use globally
- I think I learned about build flags, but not sure I get it yet
- if there's errors in your IDE and lots of red lines it probably means your shit is broken
- learned about MISO, MOSI, IRQ, and general SPI interface stuff

  
#### 07/22/2025
- If you need .env and pydantic is being a dick about it, just export it

#### 07/21/2025
- Started this blog! learned about Jekyll and hosting pages on GitHub. I feel cool
- Pydantic is useful because it can super quickly enforce things. You could write lengthy code to enforce types, but Pydantic reduces the boilerplate code you need

#### 07/20/2025
- The best way to remove bushings is to destroy them
  - always start by heating the rubber to get it to release from the metal
  - Push out the rubber, or drill it out, or if you want cancer sooner just burn it out and carbonize it
  - Then remove the shell of the bushing by cutting a groove in it and hammering it out
  - Air hammers work ok, not as well as you'd want. Maybe mine just isn't that strong

#### 07/19/2025
- You can bend the hell out of a control arm with a hydraulic press. You can't just push the center of a bushing as hard as you can and hope it pops out
- MOSI/MISO. Master in slave out, slave out master in. 
- About the stack of code you need to go from arduino IDE to a proper gui
  - It's the driver for the screen, then a graphics package (like LVGL), and then a GUI editor
  - Screens are actually kind of hard
- It's a pain in the ass to set up arduino IDE in VS Code or Cursor


