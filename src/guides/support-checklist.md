---
layout: page
title: "Build & support checklist (hardware)"
description: "A practical doc checklist for building and supporting PCBs and assembled builds"
permalink: /guides/support-checklist/
---

## Core docs (every hardware project)

- **Project page**: what it is, who it's for, what's included, links to source files
- **Quickstart**: first power-on → first success
- **Parts checklist**: BOM with photos
- **Assembly guide**:
  - soldering order
  - inspection checklist
  - common mistakes
- **Firmware/software install**:
  - supported OS/browser requirements
  - flashing instructions
  - rollback/unbrick path
- **Configuration guide**:
  - defaults
  - recommended settings
- **Troubleshooting**:
  - symptom → cause → fix
  - status LEDs / on-screen indicators
- **FAQ**:
  - compatibility, safety, sourcing parts
- **Revision + compatibility matrix**:
  - PCB revision identifiers (silkscreen)
  - firmware version compatibility
- **Safety notes** (as applicable):
  - battery handling
  - ESD handling
- **Support policy**:
  - where to get help
  - what info to include (photos, versions, logs)

## E‑Ink Display specifics

- Hardware overview (board revs, display compatibility, sensor options)
- Battery guidance (supported cells, expected life ranges)
- BLE pairing/config flow (including failure modes)
- Portal usage guide (`/guides/e-ink/` flow)
- Firmware mode docs: sensor / fun
- Power/refresh behavior notes (expected refresh cadence, battery impact)

## NEMO MQTT specifics

- System prerequisites:
  - supported NEMO versions
  - PostgreSQL requirement (LISTEN/NOTIFY)
  - MQTT broker requirements
- End-to-end setup:
  - install bridge package
  - configure topics/auth/HMAC (if used)
  - verify with a test subscriber
- Network/security guidance (LAN/WAN, TLS/auth recommendations)
- Hardware integration:
  - supported ESP32/display combos
  - power/wiring notes
- Operational playbook:
  - how to update
  - how to diagnose outages
