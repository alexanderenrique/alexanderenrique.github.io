# Smart T bird work log


- [Smart T bird work log](#smart-t-bird-work-log)
  - [Project Overview](#project-overview)
  - [Current Tasks](#current-tasks)
  - [Work Log](#work-log)
    - [07/28/2025:](#07282025)
    - [07/25/2025:](#07252025)
    - [07/24/2025](#07242025)
    - [07/23/2025](#07232025)
    - [07/22/2025](#07222025)
  - [Road Map](#road-map)
  - [Scope of work:](#scope-of-work)
    - [Sensors and controllers I want:](#sensors-and-controllers-i-want)
  - [Done](#done)
  - [Back Burner](#back-burner)


## Project Overview
- I love me some data, micro electronics, and old cars so let's put them all together. 
- My dream is to have temperature data, PWM control of fans, and a cool hidden display where I can see all the readouts and what everything is doing, and also manually override sensors if say I want to put a fan on full blast or whatever else


## Current Tasks
- ESP32 reading temperature



## Work Log

### 07/28/2025:
- HAHA I WON! got the touch working with LVGL, it was all about lvgl not "moving forward" in time like it wasn't actually polling the screen. Everything was configured correctly, good wiring, LVGL just wasn't checking the screen if you can believe it

### 07/25/2025:
- Still battling the touch screen in LVGL, just seems like a set up issue
- I deleted any mention of the esp32-C3 from the ini file, don't want to confuse anything
- Copied the suggested lv_conf.h from lvgl folder, so it's much more fine grained control
- removed the "build simple" build flag from the .ini, to make sure it uses my lvgl_config.h
- Commented out another lv_conf.h file that I found in the .pio/lvgl folder. I don't want it getting confused with different conf files.  

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

## Road Map
- ESP32 C3 reading temperature
- Broker ESP going with MQTT
- Broker talking to the C3 node
- Most basic UI to display temp
- two way communication, turn LED on and off
- OTA updates
- advanced features like PWM
- Power and wiring from car
- Planning sensor nodes, perfboard

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
  - Back up camera using LIDAR
  - Six axis IMU with a display for g forces and stuff
  - figuring out how to log and or transmit this data somewhere

## Done
- figuring out PlatformIO
- Creating a github repo (shout out jeff)
- wiring the touch screen
- getting basic touch working
- getting LVGL to read touch
- 
## Back Burner