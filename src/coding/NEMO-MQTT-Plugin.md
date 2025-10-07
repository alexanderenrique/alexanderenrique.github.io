---
layout: page
title: "NEMO MQTT Plugin"
categories: [coding]
tags: 
  - nemo
  - mqtt
  - plugin
  - django
  - redis
  - broker
  - iot
  - real-time
  - tool-status
  - lab-management
  - ssl
  - #nemo
  - #lab-management
  - #coding
---

## Project Overview
A plugin for [[NEMO]] that enables real-time tool status updates via MQTT messaging. Uses Redis as a message queue intermediary between NEMO and MQTT broker. Originally I wanted to use MQTT directly in the code, but that created additional dependencies and the developer thought it better to use the existing system of signals in Django. So I used Redis as a message queue intermediary, and that then creates an MQTT message.

### Architecture
{% mermaid %}
graph LR
    A[NEMO Django Application] --> B[Redis Message Queue]
    B --> C[MQTT Publisher]
    A --> D[MQTT configuration page]
    D --> C[MQTT Publisher]
    C --> F[MQTT Broker]
    F --> G[NEMO Tool Display Hardware]
{% endmermaid %}

### Key Components
- Django signals for event handling
- Redis pub/sub for message queueing 
- MQTT client for broker communication
- SSL/TLS security for MQTT messages

### Message Flow
1. NEMO event triggers Django signal
2. Signal handler publishes to Redis queue
3. Redis consumer forwards to MQTT broker
4. Broker distributes to subscribed clients

### Configuration
- Broker connection settings
- Redis connection settings
- SSL/TLS certificates
- Topic structure

## Up Next:
- Getting the message monitoring working, like a seperate page so it's super easy for non-techies to see what's going on
- Testing SSL/TLS


## Work Log

### 10/06/2025
- Not sure what I was on about withe the MQTT working last time, it definitely was not working. 
- Redi was recieving the message but not sending it to the broker. 
- Cursor was trying tp implement some garbage Django integration into the MQTT part to I made a simple MQTT plug in and it started working. 
  - Makes me think actually, MQTT publisher needs to know the port of the broker where to send it, which it gets fron the config in the NEMO page.
  - So am I getting the port from the config in the NEMO page?
- Made encompasing start and stop scripts. A problem I learned about with this is that you can have a bunch of instances of REDIS and MQTT running at the same time, and they will fight eachother over the port. So you need to make sure you kill the old instances before starting the new ones.
- I get it now, I was running into problems becasue my package envirnment lives outside of the django project, so it wasn't getting the config information it needed from nemo
- What I need to do is pip install the package in the django project, and then it will have access to the config information from the NEMO page.
  - Kinda slows down the development process, but it's a necessary evil.
- Also added a standalone MQTT broker to keep things going.

### 09/29/2025
- Don't you love it when you leave something and come back to it and like magically you left it in a working state, and you're ready to go onto the next big thing?
- Fired it up this morning and basically the MQTT was working nicely, and my broker was able to pick it up using 1883.
- Created a new repo and project to make a python package, my first package!
- Package install went well, I got it installed on a test project and it seems to work.

### 09/26/2025
-Working on this more, learning about the whol "redi" thing which acts an an intermediary between NEMO and the MQTT service. Messages are sent to the redi and consumed by the MQTT so you can't trust the redi logs, you need to look at the MQTT. Which is what matters anywas. 

### 09/25/2025
- Got something coded up as a plugin, starting the testing phase, getting it to work the way I want
- Well I got this crazy error where eveytime you initialize Django, like two instances of the MQTT plugin happen and then they fight eachother over connection to the port. I couldn't get it resolved so I changed architecture
- It's tough becasue in real life I don't think Django initializes that often but it feels like good practice to maybe keep it more seperate
- 

### 09/23/2025
- Per Mathieu's request, I'm changing to a django signals method so that I don't have MQTT dependencies directly in the code. It's more modular and easier to maintain.
- I'll need to add a bare minimum django.signal, to then trigger the MQTT plugin message.
- Clobbered my old work and started with the signals, the initial work always goes quickly and then it's testing it and getting what you want that takes a lot of fine tuning. 