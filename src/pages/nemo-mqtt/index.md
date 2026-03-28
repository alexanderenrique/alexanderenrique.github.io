---
layout: page
title: "NEMO MQTT & Tool Display"
description: "Real-time tool status from NEMO to wall-mounted displays over MQTT"
permalink: /nemo-mqtt/
---

## What this is

This project connects [NEMO](https://gitlab.com/nemo-community/nemo-ce) lab management to small ESP32 + TFT displays mounted near tools. When someone enables, disables, shuts down or puts a task a tool in NEMO, the display updates almost immediately—without polling a slow HTTP API.

## Why MQTT instead of REST

For the most up to date and satisfying user experience, tool enables and disable messages need to arrive to the display quickly (<2 seconds). MQTT is a massive increase over the rate at which data leaves NEMO. Polling the HTTP API for latest usage events can take five minutes, which is un-usably long for a display. The plugin reacts to Django signals, events land in NEMO's native PostgreSQL, and the bridge picks them up and publishes then to an external broker. Non-urgent data (next reservation, configuration text, etc.) can still come from the REST API on a relaxed schedule.

## Architecture (high level)

{% mermaid %}
flowchart LR
  subgraph nemo [NEMO server]
    UI[Tool on/off in UI]
    SIG[Django signals]
    PG[(PostgreSQL)]
  end
  subgraph bridge [Bridge & broker]
    BR[Bridge to MQTT]
    BK[MQTT broker]
  end
  subgraph edge [Lab floor]
    ESP[ESP32 display]
  end
  UI --> SIG
  SIG --> PG
  PG --> BR
  BR --> BK
  BK --> ESP
{% endmermaid %}

- **NEMO side:** A plugin (`NEMO_mqtt_bridge`) hooks the same kinds of events NEMO already uses for usage logging. Work is persisted in PostgreSQL installs reuse NEMO's database and operations stay simpler.
- **Infrastructure:** A bridge process consumes new rows / notifications from Postgres and publishes to **MQTT**. The broker can be embedded (e.g. during development) or Mosquitto in production, with optional username/password and **HMAC-signed** payloads where configured.
- **Edge:** Each display is an ESP32 subscribed to the right topics, rendering tool state, user, and timing on a TFT. Message size stays small because the MCU only needs a few fields per update.

## Security notes

Security is optional and configurable. MQTT ports are protected by username and PW. Messages use HMAC to verify that the message did infact come from NEMO. Timestamp checks limit trivial replay. The messages are sent across the net unencrypted, but this is an acceptable risk. The data displayed mirrors data that is already visible in NEMO.

## Implementing NEMO MQTT tool display end to end

### Prerequisites

**Minimum required:**

1. **NEMO**  
   [NEMO](https://gitlab.com/nemo-community/nemo-ce) lab management software.

2. **NEMO-CE**  
   _Must be configured to use PostgreSQL._  
   > **Note:** Some NEMO installs use SQLite, but this plugin requires PostgreSQL due to its use of the `LISTEN/NOTIFY` feature.  
   [Insert NEMO-CE link here]

3. **MQTT Broker**  
   - The broker can be run on the same machine as NEMO in small setups.
   - In many facilities, microcontrollers are not permitted on the public network.  
   - Example setup:  
     - A broker computer connects to both the public network (NEMO) and a private LAN (microcontroller displays), acting as a bridge between the two.

4. **Hardware**
   - **Microcontroller with display:**  
     - Example: 30-pin ESP32 Dev Board  
     - Custom PCB attached to a 4" TFT touch display (for touch capability)  
     - Other hardware variations are possible depending on requirements.


# Step-by-Step Setup Guide

Follow these steps to set up the NEMO MQTT tool display from end to end:

---

## 1. Install the NEMO MQTT Bridge Plugin

- Install the plugin from [PyPI](https://pypi.org/project/nemo-mqtt-bridge/) in your NEMO instance.
- In your `INSTALLED_APPS` (e.g., in your Django settings):
    ```python
    "NEMO_mqtt_bridge",
    "NEMO_mqtt_bridge.urls",
    ```
- Update your `start_nemo.sh` or requirements list to include:
    ```
    nemo-mqtt-bridge==2.1.2
    ```

---

## 2. Apply Database Migrations

- Run the following to create the required tables in PostgreSQL:
    ```
    python manage.py migrate NEMO_mqtt_bridge
    ```
- If you are using Docker, use the equivalent Docker command _(provide specific command as applicable)_.

---

## 3. Configure the Plugin in NEMO

- Navigate to:  
  `NEMO → Administration → Customization → MQTT Plugin`
- Here you can configure:
  - The **MQTT broker IP address**
  - Optional **username** and **password**
  - **HMAC verification key** (optional, for added security)

---

## 4. Set Up the Bridge (VM) Code

- Download & install the [VM code for the bridge process](https://github.com/alexanderenrique/NEMO-Tool-Display/tree/main/vm_server).
- This server code uses a heavy mosquitto binary that isn't suitable to be installed or run inside the docker container. You can run it inside a VM of course, just keep it seperate from the NEMO-CE Docker.

- Run:
    ```
    ./setup.sh
    ```
    - This installs dependencies and prompts you for:
      - MQTT ports
      - Username and password
      - HMAC key
- (Optional) To run the bridge at startup, use the provided systemd script.

---

## 5. Flash Firmware to ESP32 Display

- Flash the ESP32 with the provided firmware.
- Be sure to **set the Tool ID and name** in the firmware so the ESP32 subscribes to the correct MQTT topic.
- [PCB design is available here](https://github.com/alexanderenrique/NEMO-Tool-Display/tree/main/Tool-Display-PCB).  
  - Recommended: OshPark or any PCB manufacturer.They will need the Display-PCB.zip which includes all the files they need.
  - Note: Two capacitors are optional, but can help with stability.

---

## 6. (Optional) Assemble the Device

- [3D printed case is available here](_insert_link_).

---

You're ready to display live tool state from NEMO on your ESP32 display!
