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
---

## Project Overview
A plugin for NEMO that enables real-time tool status updates via MQTT messaging. Uses Redis as a message queue intermediary between NEMO and MQTT broker. Originally I wanted to use MQTT directly in the code, but that created additional dependencies and the developer thought it better to use the existing system of signals in Django. So I used Redis as a message queue intermediary, and that then creates an MQTT message.

### Notes for tomorrow:
- it's not actually connecting to port 1884 when I change the config, I think that's becasue of hard coded development setting
- On the config page, nothing is actually happening in the MQTT logs or event filters not sure why
- It WAS working on port 1883 but I think that's becasue it's hard coded in the plugin
- but when I change the borker port, the monitor DOES keep working so that is good
  
### High Level Architecture
{% mermaid %}
graph LR
    A@{shape: rounded, label: "Tool enabled/disabled by labmember"}
    A --> B(("NEMO Django Signal"))
    B --> C[("Redis Message Queue")]
    C --> D(("JSON to MQTT Service"))
    D --> E(("MQTT Broker"))
    E --> F["NEMO Tool Display Hardware"]
    G["MQTT customization page"] --> E
{% endmermaid %}

### Key Components
- Django signals for event handling
- Redis pub/sub for message queueing 
- MQTT service for converting from JSON to MQTT message
- Plugin MQTT broker for distributing messages to subscribed clients
- SSL/TLS security for MQTT messages to VM broker
- MQTT monitor page for displaying messages in a user friendly way

### Configuration
- Broker connection settings
- SSL/TLS certificates

## Up Next:
- Is there auto reconnect if the NEMO MQTT disconects or Mosquitto dies?
- Connecting to a truly seperate MQTT broker
- Testing SSL/TLS
- Making the monitor format easier to read by humans instead of a dense JSON object


## Work Log

### 10/24/2025
**Main Task:** Config page cleanup and testing fixes

**Notes:**
- Had too many projects on the brain lately, and this one just feels like a party trick so it went to the back burner.
- Today I cleaned up the config page, there were lots of settings that were not needed
  - Don't need to select which version of TLS, 1.2 is fine
  - Less authentication options like username and password, only need the CA certificate
- Making it so that is passe all the tests
  - It was failing one of the redis test because it was connect to redis so it couldn't verify the retry logic, leading to a failed test.
- Learned abut tests, and their purpose in software development.
  - Tests are a way to verify that the code is working as expected
  - can help you pin point what dependencies you need or where you're falling short

### 10/16/2025
**Main Task:** TLS implementation and monitor page fixes

**Notes:**
- Got the TLS working and connecting, the certificate I generated was missing some key parts.
- Had to learn a lot about how the whole TLS hadnshake occurse but that's ok because it's not restricted to MQTT, it's a general thing that happens in all network communication.
- The TLS was working but then the monitor page wasn't getting the messages
  - It was configured statically to a certain port to get it working but now it pulls the latest from the db
- This project is so damn confusing becasue even my monitor page acts as its own broker so I have brokers and connections all over the place all starting and stopping and competing for ports. 
- The next step is to make sure the "VM" is actually recieving messages over TLS.

### 10/15/2025
**Main Task:** TLS troubleshooting and debugging

**Notes:**
- I kinda don't want to work on it anymore but I want to push this across the finish line.
- The TLS just wan;t working even a little bit, like it was a shell method so everything broke when I enabled it
- Started grinding through the iterations to get it working.

### 10/14/2025
**Main Task:** MQTT broker refactor and connection logic improvements

**Notes:**
- I did a pretty big refactor at the end of the day, cleaning up the way the MQTT broker starts and killing old instances of mosquitto.
- Of course it didn't work right away and there was some collateral damage in the form of a customization file, luckily github had my back
- Way better connection and retry logic with exponential delay and jittering.
- Added debugging to make sure it picks up when it connects and disconects
- Really hard testing things all on the same machine, it'd be nice to have a seperate instance of mosquitto and all these things.

### 10/13/2025
**Main Task:** Dynamic MQTT port configuration

**Notes:**
- Un-hardcoded the MQTT port.
- Now there is a django signal so that when you save the config in the NEMO page, the cached mqtt port is actually delted
  - This prompts the MQTT to check the port from the DB and updates it
  - Pretty clever right?
- It does seem to work now that the port is dynamic, I was able to get it going on port 1884
- There are challenges in having everything on the same machine. Like when I do the quick restart of mqtt broker it kills all instances of mosquitto which kills whatever connection NEMO had to the broker.

### 10/09/2025
**Main Task:** Duplicate initialization fixes and package creation

**Notes:**
- Ok so debugging why Django is doing its job perfectly and publishing all the messages exactly as it should, but the moniotr page (which is basically a dummy subsriber) is not receiving all of the messages. It's always werid to me when something half works on a computer. Like where is it going?
- Ok so it turns out that the JSON to MQTT service was something that was running outside of the plugin and I think that was causing issues
  - I wanted the mqtt to be outside of the django sure, but it WAS a seperate script that lived in a different directory that had to be stopped and started seperately to consume the redis and publish them. 
- Still battling the multiple django initializations. I remember it was a battle previously, and now that the MQTT and Redis are inside of the django project I needed to add flags so that it only initializes the plugin once. 
- THE DUPLICATES EVERYWHERE!
- Had this problem also with the duplicate redis.
  - I learned that you can have multiple redis DBs, so what I did was move the nemo DB in redis to DB1 as to not interfere with the default DB0.
  - Like if someone wants to install this and their Redis is already turned on, I don't want to just clobber it.
- Holy cow I think I got it working for reals how good is that?
- I cleaned up the work space and made it a proper pypi package which looks great but I may have jumped the gun becasue there's more testing to do. 

### 10/08/2025
**Main Task:** Monitor page frontend work

**Notes:**
- Mostly spent time figuring out the front end of the mqtt/monitor page. The java script wasn't loading correctly, fixed the messges fading after 5 seconds, added a bunch of debug to the mqtt/monitor page.
- Another issue was the API, I learned that the 

### 10/07/2025
**Main Task:** Plugin installation and integration

**Notes:**
- heaps of progress! I got the plugin installed in the NEMO-CE and installed the URLS and everything seems to be working.
- I still need to work on the mqtt/monitor page. It's close, the messages are showing up but they're at the top and kind of fade away for no reason? Th UI isn't what I want it to be.
- This is just a bloody confusing project to me because things need to talk to eachother in so many different ways, like Django config needs to feed to the mqtt publisher setting and Django also talks to redis which feeds the MQTT publisher etc.
- It's also confusing because I'm developing the package in one work space, and then it's pip installed in the nemo-ce, but I've also made a symlink between them which I've never done before. So I have to constantly ask myself if my changes just didn't work, or it hasn't updated or what
- Same with the constant issue of multiple Django servers, Redis ques and MQTT brokers on different ports.
- I tried using Symlink to connect the mqtt plugin inside of NEMO to the plugin development environment, but it didn't work.
- I ended up with a short shell script that deletes the old plugin and redownloads the new one.

### 10/06/2025
**Main Task:** MQTT service fixes and package structure

**Notes:**
- Not sure what I was on about withe the MQTT working last time, it definitely was not working. 
- Redi was recieving the message but not sending it to the broker. 
- Cursor was trying tp implement some garbage Django integration into the MQTT part to I made a simple MQTT plug in and it started working. 
  - Makes me think actually, MQTT publisher needs to know the port of the broker where to send it, which it gets fron the config in the NEMO page.
  - So am I getting the port from the config in the NEMO page?
- Made encompasing start and stop scripts. A problem I learned about with this is that you can have a bunch of instances of Redis and MQTT running at the same time, and they will fight eachother over the port. So you need to make sure you kill the old instances before starting the new ones.
- I get it now, I was running into problems becasue my package envirnment lives outside of the django project, so it wasn't getting the config information it needed from nemo
- What I need to do is pip install the package in the Django project, and then it will have access to the config information from the NEMO page.
  - Kinda slows down the development process, but it's a necessary evil.
- Also added a standalone MQTT broker to keep things going.

### 09/29/2025
**Main Task:** Python package creation

**Notes:**
- Don't you love it when you leave something and come back to it and like magically you left it in a working state, and you're ready to go onto the next big thing?
- Fired it up this morning and basically the MQTT was working nicely, and my broker was able to pick it up using 1883.
- Created a new repo and project to make a python package, my first package!
- Package install went well, I got it installed on a test project and it seems to work.

### 09/26/2025
**Main Task:** Redis learning and testing

**Notes:**
- Working on this more, learning about the whol "redi" thing which acts an an intermediary between NEMO and the MQTT service. Messages are sent to the redi and consumed by the MQTT so you can't trust the redi logs, you need to look at the MQTT. Which is what matters anywas. 

### 09/25/2025
**Main Task:** Initial plugin development and architecture changes

**Notes:**
- Got something coded up as a plugin, starting the testing phase, getting it to work the way I want
- Well I got this crazy error where eveytime you initialize Django, like two instances of the MQTT plugin happen and then they fight eachother over connection to the port. I couldn't get it resolved so I changed architecture
- It's tough becasue in real life I don't think Django initializes that often but it feels like good practice to maybe keep it more seperate 

### 09/23/2025
**Main Task:** Django signals refactor

**Notes:**
- Per Mathieu's request, I'm changing to a django signals method so that I don't have MQTT dependencies directly in the code. It's more modular and easier to maintain.
- I'll need to add a bare minimum django.signal, to then trigger the MQTT plugin message.
- Clobbered my old work and started with the signals, the initial work always goes quickly and then it's testing it and getting what you want that takes a lot of fine tuning. 


### Detailed Architecture
#### Django

{% mermaid %}
graph LR
    A@{ shape: event, label: "User Starts Using Tool" } --> B@{ shape: cyl, label: "Django Saves UsageEvent to DB<br><small><i>(DB CALL)</i></small>" }
    B --> C@{ shape: rounded, label: "Signal Handler Receives UsageEvent Instance" }
    C --> D@{ shape: rect, label: "Signal Handler Creates object with user, tool, start, end, etc.<br><small><i>(JSON)</i></small>" }
    D --> E@{ shape: cyl, label: "JSON Goes to Redis" }
{% endmermaid %}

#### JSON to MQTT Service
{% mermaid %}
graph LR
    F@{ shape: cyl, label: "Redis has its own db to store the message<br><small><i>(JSON Event, stored in Redis DB1)</i></small>" }
    F --> G@{ shape: rect, label: "JSON to MQTT Service consumes message" }
    G --> H@{ shape: rect, label: "JSON to MQTT Service converts to MQTT<br><small><i>(MQTT Message)</i></small>" }
    H --> I@{ shape: cyl, label: "MQTT Broker distributes message to subscribed clients<br><small><i>(MQTT Message)</i></small>" }
    I --> J@{ shape: rect, label: "MQTTWebMonitor" }
    I --> K@{ shape: cyl, label: "Second external broker that lives on VM<br><small><i>(MQTT Message)</i></small>" }
{% endmermaid %}

#### MQTT Monitor Logic
{% mermaid %}
graph TD
    A@{ shape: rect, label: "MQTTWebMonitor subscribes to all<br>NEMO topics from the broker<br><small><i>(MQTT message)</i></small>" } --> B@{ shape: rounded, label: "MQTTWebMonitor recieves message<br><small><i>(MQTT message)</i></small>" }
    B --> C@{ shape: rect, label: "MQTTWebMonitor converts to python dictionary<br><small><i>(Python Dictionary)</i></small>" }
    C --> D@{ shape: win-pane, label: "MQTTWebMonitor stores in Memory<br><small><i>(Python Array)</i></small>" }
    D --> E@{ shape: event, label: "Web page loads /mqtt/monitor/" }
    E --> F@{ shape: rect, label: "Frontend JavaScript makes an<br>HTTP GET request to /mqtt/monitor/api/" }
    F --> G@{ shape: rounded, label: "Django view mqtt_monitor_api receives the request" }
    G --> H@{ shape: win-pane, label: "View accesses monitor.messages<br><small><i>(in-memory Python array)</i></small>" }
    H --> I@{ shape: rect, label: "View filters for MQTT messages only" }
    I --> J@{ shape: doc, label: "View returns JSON response<br><small><i>(JSON string)</i></small>" }
    J --> K@{ shape: rect, label: "JavaScript receives JSON response<br><small><i>(JSON string)</i></small>" }
    K --> L@{ shape: rect, label: "JavaScript parses JSON into JavaScript objects<br><small><i>(JavaScript objects)</i></small>" }
    L --> M@{ shape: rect, label: "JavaScript processes and formats the data" }
    M --> N@{ shape: display, label: "JavaScript updates HTML DOM to display messages<br><small><i>(HTML elements)</i></small>" }
{% endmermaid %}


### Django Plugin Startup Process
{% mermaid %}
graph TD
    A@{ shape: event, label: "Django Startup" } --> B@{ shape: rounded, label: "AppConfig.ready()" }
    B --> C@{ shape: diam, label: "Already Initialized?" }
    C -->|Yes| D@{ shape: rect, label: "Skip Initialization" }
    C -->|No| E@{ shape: rect, label: "Migration Check" }
    E --> F@{ shape: diam, label: "Migration Command?" }
    F -->|Yes| G@{ shape: rect, label: "Skip MQTT Init" }
    F -->|No| H@{ shape: rect, label: "Import Signal Handlers" }
    H --> I@{ shape: rect, label: "Import Customization" }
    I --> J@{ shape: rect, label: "Mark as Initialized" }
    J --> K@{ shape: cyl, label: "Initialize Redis Publisher" }
    K --> L@{ shape: rect, label: "Get MQTT Configuration" }
    L --> M@{ shape: diam, label: "Config Enabled?" }
    M -->|Yes| N@{ shape: rect, label: "Start JSON to MQTT Service" }
    M -->|No| O@{ shape: rect, label: "Start Service Anyway for Dev" }
    N --> P@{ shape: rect, label: "Auto MQTT Service Start" }
    O --> P
    P --> Q@{ shape: rounded, label: "Service Running" }
{% endmermaid %}