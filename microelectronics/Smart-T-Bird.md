# Smart T bird work log


- [Smart T bird work log](#smart-t-bird-work-log)
  - [Project Overview](#project-overview)
  - [Scope of work:](#scope-of-work)
    - [Sensors and controllers I want:](#sensors-and-controllers-i-want)
  - [Current Tasks](#current-tasks)
  - [Up Next](#up-next)
  - [Work Log](#work-log)
    - [07/24/2025](#07242025)
    - [07/23/2025](#07232025)
    - [07/22/2025](#07222025)
  - [Back Burner](#back-burner)


## Project Overview
- I love me some data, micro electronics, and old cars so let's put them all together. 
- My dream is to have temperature data, PWM control of fans, and a cool hidden display where I can see all the readouts and what everything is doing, and also manually override sensors if say I want to put a fan on full blast or whatever else

## Scope of work:
### Sensors and controllers I want:
- Coolant temp and PWM fan control
- Trans cooler temp and PWM fan control
- Oil Temperature
- Battery voltage
- Display that is getting all the data wirelessly from the sensor network
- The sensor should autodim based on light conditions
- Bonues
  - Diff temp
  - fuel pressure eventually
  - drive shaft speed, could inform other parts of the project

## Current Tasks
- Figuring out the LGVL package on the ESP32
- Getting the arduino IDE set up

## Up Next


## Work Log

### 07/24/2025
- Got the touch screen working, but the component that integrates to LVGL is still not working. Not sure how those are related
- It works when I set the Baug rate to 96000 but not the default 115200, but I may just try that again
- LVGL and the regular touch out are related but different somehow. Like there is different code for LVGL to recognize a touch
- reducing the touch sensitivity to 100 from 600 could be a good thing, really light touch is kind of nice

### 07/23/2025
- short guide to PlatformIO
  
| Folder/File | Purpose/Contents |
|------------|------------------|
| .pio/ | Build output, temporary files (auto-generated) |
| include/ | Project-wide header files |
| lib/ | Custom libraries |
| src/ | Main source code |
| test/ | Unit tests |
| platformio.ini | Project configuration |

- first day of PlatformIO and I got the LVGL demo working, albeit with no touch yet but I feel great about it, learned a ton
- 

### 07/22/2025
- made a branch in Jeff's repo for my PlatformIO project, I think that is the way to go as opposed to Arduino CLI + VSCode. I just don't want to have to configure everything manually sounds scary
- Started playing with PlatformIO


##General notes:
- Screen pinout, from 1-X
  - VCC
  - GND
  - CS
  - Reset
  - DC/RS
  - MOSI
  - SCK
  - LED
  - MISO
  - T_ClK
  - T_CS
  - T_DIN
  - T_DO
  - T_IRQ


## Back Burner