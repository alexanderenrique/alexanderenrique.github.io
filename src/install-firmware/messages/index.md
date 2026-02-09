---
layout: page
title: "Install Messages Firmware"
permalink: /install-firmware/messages/
categories: [microelectronics]
tags: [esp32, firmware, installation, messages]
---

## Install Messages Firmware

Install the Messages Mode firmware for your ESP32-C3 Display device directly from your browser. This firmware displays up to 10 custom messages that refresh on an interval.

### Current Version: 1.0.0

Connect your ESP32-C3 device via USB and click the button below to install the firmware:

<div style="text-align: center; margin: 2rem 0;">
  <esp-web-install-button manifest="{{ '/install-firmware/messages/manifest.json' | url }}">
    <button class="install-btn">
      Install Messages Firmware
    </button>
  </esp-web-install-button>
</div>

<script
  type="module"
  src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js">
</script>

