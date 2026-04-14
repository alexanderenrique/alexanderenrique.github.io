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
  - 550 RPM 775 motor
  - 12V, 5Ah LiFePo4 Battery
  - One way bearing
  - HTD 48 tooth cog
  - Drive belt
- Glow Plug Assembly
  - 10A 12V to 1.2V converter for glow plug
  - Glow plug connector

## Work Log


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


