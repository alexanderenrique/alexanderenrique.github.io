---
layout: page
title: "3D Models & STL Files"
categories: [wrenching]
tags: 
  - 3d-printing
  - automotive
  - restoration
  - stl
  - cad
  - design
  - fabrication
  - thunderbird
  - custom-parts
  - replacement-parts
  - interior
  - exterior
  - #thunderbird
  - #electronics
  - #restoration
---

## T-Bird Designs

### Windshield Wiper Knob
<model-viewer 
    src="/assets/models/thunderbird-wiper-knob.glb" 
    alt="Windshield Wiper Knob 3D Model"
    camera-controls 
    auto-rotate
    interaction-prompt="none"
    exposure="1.5"
    shadow-intensity="0.5"
    environment-image="neutral"
    tone-mapping="commerce"
    style="width: 100%; height: 500px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 20px 0; background-color: #f6bd60;">
</model-viewer>

**Description**: Replacement for the broken windshield wiper control knob. There's like a metal sleeve on the inside of the factory knob that has a retaining clip to keep it on the shaft. You'll need to re-use the sleeve, should fit inside the new knob.

**STL File**: [Download STL](../../assets/models/thunderbird-wiper-knob.stl)

**Material**: PLA  
**Installation**: Press fit onto wiper control shaft  

## Tooling

### 2.5" v-band cap

<model-viewer 
    src="/assets/models/male-vband-25.glb" 
    alt="2.5 V-Band Cap 3D Model"
    camera-controls 
    auto-rotate
    interaction-prompt="none"
    exposure="1.5"
    shadow-intensity="0.5"
    environment-image="neutral"
    tone-mapping="commerce"
    style="width: 100%; height: 500px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 20px 0; background-color: #f6bd60;">
</model-viewer>

**Description**: A **male** cap designed to fit 2.5" v-band flanges for purge welding. When welding stainless steel or other materials that require back-purging with inert gas, this cap creates a seal against the v-band flange. Includes a small port for gas outlet. The flow port is the decimal of the 2.5 on the face of the flange. I thought that was pretty clever. I designed this and never really tested it, not a big purge welding guy, just never really have the need. 

**STL File**: [Download STL](../../assets/models/male-vband-25-cap.stl)

**Material**: You'll want to keep this far from your weld, lest it melt, but I guess you could use some higher temp filament. I used PLA. 

**Installation**: Clamps onto v-band flange with standard clamp  

## Lab Equipment

### Precursor Rack

<model-viewer 
    src="/assets/models/Precursor-Rack.glb" 
    alt="Precursor Rack 3D Model"
    camera-controls 
    auto-rotate
    interaction-prompt="none"
    exposure="1.5"
    shadow-intensity="0.5"
    environment-image="neutral"
    tone-mapping="commerce"
    style="width: 100%; height: 500px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 20px 0; background-color: #f6bd60;">
</model-viewer>

**Description**: Hold 6 Swagelok96-1070 precursor cylinders. I printed four of them and stuck them to a shelf inside a fire proof cabinet for precursor storage. VHB works well in my esperience with 3D prints. The spacing is large enough to accomodate all kinds of valves so long as the valve points out. Takes about 100g of material to print.

### Raspberry Pi with camera holder

<model-viewer 
    src="/assets/models/RFS-Box.glb" 
    alt="Raspberry Pi with camera holder 3D Model"
    camera-controls 
    auto-rotate
    interaction-prompt="none"
    exposure="1.5"
    shadow-intensity="0.5"
    environment-image="neutral"
    tone-mapping="commerce"
    style="width: 100%; height: 500px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 20px 0; background-color: #f6bd60;">
</model-viewer>

**Description**: Hold a raspberry pi inside a basic case, with a pedestal inside it to hold the foot of a basic webcam. It's used to monitor the furnace system tree lights. The lights tell you the status of the process. This info is then fed to NEMO to let lab users know the if their process has errored out, finished, or is in progress.

**STL File**: Coming soon

## 2002 Yamaha FZ-1

### Yoshimura Flange Adapter

<model-viewer 
    src="/assets/models/Yoshi-Flange.glb" 
    alt="Yoshimura Flange Adapter 3D Model"
    camera-controls 
    auto-rotate
    interaction-prompt="none"
    exposure="1.5"
    shadow-intensity="0.5"
    environment-image="neutral"
    tone-mapping="commerce"
    style="width: 100%; height: 500px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 20px 0; background-color: #f6bd60;">
</model-viewer>

**GD&T Drawing**: [Yoshi-Drawing.pdf](/images/Yoshi-Drawing.pdf)

**Description**: Flange to adapt a 2.5" exhaust pipe, like say a midpipe on an FZ1, to the 3 bolt flange found on a Yoshimura RS3 muffler. You can send it to your favorite laser cutting service and they'll cut you one out of stainless steel to then weld onto your custom midpipe. I found that a 2.5" SS pipe with a few lengthwise cuts gives it just enough wiggle to slide over the collector outlet.

**STL File**: [Download STL](../../assets/models/FZ1-yoshimura-rs3-flange-adapter.stl)

**Material**: Test print it from whatever, but you'll need to get it laser cut from stainless steel. 
**Installation**: Weld to your custom midpipe. 

#### Notes:
- So, you've forgotten how to convert from OBJ to GLB? You'll want to use assimp to convert it. 
  - assimp export input.obj output.glb

*Last updated: {{ git_revision_date_localized }}*