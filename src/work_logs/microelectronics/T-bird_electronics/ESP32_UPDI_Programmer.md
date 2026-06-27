---
layout: page
title: "ESP32 ATtiny UPDI Programmer"
categories: [microelectronics]
tags:
  - electronics
  - thunderbird
  - esp32
  - attiny
  - updi
  - programming
  - tooling
---

## Project Overview

A toolchain-agnostic ATtiny programming rig for the Smart Thunderbird project. An ESP32 dev board acts as a UPDI bridge; a Python CLI (`attiny-uploader`) streams Intel HEX firmware over USB serial. The host never speaks UPDI and the ESP32 never parses HEX — that split keeps either side swappable and lets any build system (PlatformIO, Arduino IDE, Make, CI) plug in as long as it produces a `.hex` file.

Primary target MCU: **ATtiny3216** (engine sensing node and other T-Bird sensor boards).

**Repo:** [smart_tbird/ESP32_UDPI_Programmer](https://github.com/alexanderenrique/smart_tbird/tree/platformIO/ESP32_UDPI_Programmer)  
**Work log:** [denton.works/microelectronics/ESP32_UPDI_Programmer/](https://denton.works/microelectronics/ESP32_UPDI_Programmer/)

```
[ Any Build System ] --> firmware.hex --> attiny-uploader (CLI) --USB Serial--> ESP32 --UPDI--> ATtiny3216
```

## Hardware wiring

| Signal | ESP32 GPIO | Target connection |
|--------|------------|-------------------|
| UPDI | GPIO 17 | ATtiny UPDI via **4.7 kΩ** series resistor |
| Target reset (optional) | GPIO 16 | ATtiny RESET (active low) |
| Target power (optional) | GPIO 18 | Load switch / MOSFET enable |
| Bridge RX (optional) | GPIO 25 | Target UART TX |
| Bridge TX (optional) | GPIO 26 | Target UART RX |
| GND | GND | ATtiny GND |

Provide target power from the board or through the optional power-control pin.

## Software layout

```
ESP32_UPDI_Programmer/
├── cli/                  # attiny-uploader Python package
│   └── attiny_uploader/  # hexfile, protocol, transport, uploader, cli
├── firmware/             # ESP32 PlatformIO project
│   └── src/
│       ├── updi/         # PHY, link, NVM layers
│       ├── command_parser.cpp
│       ├── stream_receiver.cpp
│       ├── uart_bridge.cpp
│       └── hw_control.cpp
└── test_attiny3216/      # blink + serial smoke-test firmware
```

### CLI commands

| Command | Purpose |
|---------|---------|
| `upload` (default) | Stream HEX to target; `--verify`, `--reset` |
| `read-signature` | Confirm MCU identity (3216 → `1E 95 21`) |
| `erase` | Chip erase |
| `reset` | Pulse target reset |
| `serial-monitor` | Bridge USB ↔ target UART (GPIO 25/26) |
| `test-run` | Stub — returns `NOT IMPLEMENTED` |

Global flags: `--port` (required), `--baud`, `--verbose`, `--json` (for CI).

### Host/device protocol

ASCII line commands at 115200 baud; programming data sent as 128-byte binary chunks with `OK` acks per chunk.

| Host sends | Device responds |
|------------|-----------------|
| `HELLO` | `OK ESP32-UPDI v1.0` |
| `BEGIN PROGRAM size=N addr=0xADDR` | `OK` |
| `<128-byte chunk>` | `OK` |
| `END PROGRAM` | `OK` |
| `VERIFY` | `OK` or `ERROR addr=0xXXXX` |
| `READ_SIGNATURE` | `OK 1E 95 21` |
| `ERASE` / `RESET` | `OK` |
| `SERIAL ON` / `SERIAL OFF` | `OK` |
| `POWER ON` / `POWER OFF` | `OK` |

## Build-system integration

PlatformIO custom upload:

```ini
upload_protocol = custom
upload_command = attiny-uploader --port $UPLOAD_PORT $SOURCE
```

Manual flow after build:

```bash
pio run
attiny-uploader --port /dev/ttyUSB0 --verify --reset .pio/build/<env>/firmware.hex
```

## Up Next

- Wire up a permanent programmer bench setup (ESP32 + 4.7 kΩ + breadboard headers)
- Flash engine sensing node firmware end-to-end via `attiny-uploader`
- Use `serial-monitor` to read ATtiny UART debug output through the bridge
- Integrate custom upload into the engine sensing node PlatformIO env
- Implement `test-run` for production-style smoke tests (blink, serial, signature check)

-----------------------------------

## Work Log

### 06/26/2026
**Main Task:** Document the ESP32 UPDI programmer project

**Notes:**
- Project is at v1.0 — ESP32 firmware prints `READY ESP32-UPDI v1.0` on boot
- Python CLI is installable via `pip install -e .` from `cli/`; pytest coverage for HEX parsing and protocol handshake
- Firmware UPDI stack: `UpdiPhy` → `UpdiLink` → `UpdiNvm`, with `StreamReceiver` handling chunked program writes and `CommandParser` dispatching ASCII commands
- Optional extras baked in: target reset, power gating, UART bridge — useful for bring-up without rewiring
- `test_attiny3216/` has blink (PB1 LED) and serial (PA1 TX → ESP32 GPIO25) smoke tests for validating the pipeline
- Solves the "how do I program the ATtiny3216" blocker called out on the engine sensing node work log
