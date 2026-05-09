---
layout: page
title: "Selling & support checklist (hardware)"
description: "A practical doc checklist for selling and supporting PCBs and assembled builds"
permalink: /guides/support-checklist/
---

## Core docs (every hardware product)

- **Product page**: what it is, who it’s for, what’s included, buy CTAs
- **Quickstart**: first power-on → first success
- **What’s in the box**: parts / BOM checklist (with photos)
- **Assembly guide** (when customers source parts separately):
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
  - compatibility, safety, lead times
- **Revision + compatibility matrix**:
  - PCB revision identifiers (silkscreen)
  - firmware version compatibility
- **Safety notes** (as applicable):
  - battery handling
  - ESD handling
- **Support policy**:
  - where to get help
  - what info to include (photos, versions, logs)
- **Returns/warranty** (on Shopify or mirrored here)

## E‑Ink Display specifics

- Hardware overview (board revs, display compatibility, sensor options)
- Battery guidance (supported cells, expected life ranges)
- BLE pairing/config flow (including failure modes)
- Portal usage guide (`/guides/e-ink/` flow)
- Firmware mode docs: sensor / label / messages / fun
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
