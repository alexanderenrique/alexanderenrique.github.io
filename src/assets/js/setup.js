/**
 * Main Setup Script
 * Coordinates BLE connection and configuration
 */

import BLECore from './ble/ble-core.js';
import Protocol from './ble/protocol.js';
import Chunking from './ble/chunking.js';
import FormUI from './ui/form.js';
import StatusUI from './ui/status.js';

class EInkSetup {
    constructor() {
        this.ble = new BLECore();
        this.protocol = null;
        this.chunking = new Chunking();
        this.formUI = new FormUI('config-form');
        this.statusUI = new StatusUI('status-container');
        this.selectedDevice = null;
        this.devices = [];
        this.mode = this.detectMode();
        
        this.init();
    }

    detectMode() {
        const path = window.location.pathname;
        if (path.includes('/fun')) {
            return 'fun';
        } else if (path.includes('/sensor')) {
            return 'sensor';
        } else if (path.includes('/label')) {
            return 'label';
        } else {
            return 'shelf'; // Default to shelf label mode (legacy)
        }
    }

    init() {
        // Check Web Bluetooth support
        if (!this.ble.isAvailable()) {
            this.statusUI.error('Web Bluetooth is not supported in this browser');
            return;
        }

        // Set up event handlers
        this.setupEventHandlers();
        
        // Set up disconnect handler
        this.ble.onDisconnected = () => {
            this.handleDisconnect();
        };

        // Set up form submission
        this.formUI.onSubmit((data) => {
            this.handleFormSubmit(data);
        });
    }

    setupEventHandlers() {
        // Scan button
        const scanBtn = document.getElementById('scan-btn');
        if (scanBtn) {
            scanBtn.addEventListener('click', () => this.scanForDevices());
        }

        // Connect button
        const connectBtn = document.getElementById('connect-btn');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connectToDevice());
        }

        // Disconnect button
        const disconnectBtn = document.getElementById('disconnect-btn');
        if (disconnectBtn) {
            disconnectBtn.addEventListener('click', () => this.disconnect());
        }
    }

    async scanForDevices() {
        try {
            this.statusUI.connecting('Scanning for devices...');
            
            // Request device - this will show the browser's device picker
            const server = await this.ble.connect(
                null, // No specific device name
                '0000ff00-0000-1000-8000-00805f9b34fb' // Service UUID
            );
            
            this.selectedDevice = this.ble.device;
            this.statusUI.success(`Found device: ${this.ble.device.name || 'Unknown'}`);
            
            // Enable connect button
            document.getElementById('connect-btn').disabled = false;
            
        } catch (error) {
            if (error.name === 'NotFoundError') {
                this.statusUI.warning('No devices found. Make sure your device is powered on and in pairing mode.');
            } else if (error.name === 'SecurityError') {
                this.statusUI.error('Permission denied. Please allow Bluetooth access.');
            } else {
                this.statusUI.error(`Scan failed: ${error.message}`);
            }
        }
    }

    async connectToDevice() {
        try {
            if (!this.selectedDevice && !this.ble.device) {
                await this.scanForDevices();
            }

            this.statusUI.connecting('Connecting to device...');
            
            // Initialize protocol
            this.protocol = new Protocol(this.ble);
            await this.protocol.initialize();
            
            // Set up notification handler
            await this.protocol.onNotification((data) => {
                this.handleDeviceResponse(data);
            });
            
            this.statusUI.success('Connected successfully!');
            
            // Update UI
            document.getElementById('connect-btn').disabled = true;
            document.getElementById('disconnect-btn').disabled = false;
            document.getElementById('scan-btn').disabled = true;
            document.getElementById('send-config-btn').disabled = false;
            this.formUI.setEnabled(true);
            
        } catch (error) {
            this.statusUI.error(`Connection failed: ${error.message}`);
        }
    }

    async disconnect() {
        try {
            await this.ble.disconnect();
            this.handleDisconnect();
        } catch (error) {
            this.statusUI.error(`Disconnect failed: ${error.message}`);
        }
    }

    handleDisconnect() {
        this.statusUI.warning('Disconnected from device');
        this.protocol = null;
        
        // Update UI
        document.getElementById('connect-btn').disabled = false;
        document.getElementById('disconnect-btn').disabled = true;
        document.getElementById('scan-btn').disabled = false;
        document.getElementById('send-config-btn').disabled = true;
        this.formUI.setEnabled(false);
    }

    async handleFormSubmit(data) {
        if (!this.protocol || !this.ble.isConnected()) {
            this.statusUI.error('Not connected to device');
            return;
        }

        try {
            this.statusUI.connecting('Sending configuration...');
            
            // Prepare config object based on mode
            const config = {
                mode: this.mode,
                timestamp: Date.now()
            };

            // Add mode-specific configuration
            if (this.mode === 'shelf' || this.mode === 'label') {
                // Shelf label mode - simple text label
                if (data.labelText) {
                    config.labelText = data.labelText;
                }
                // Legacy shelf mode with NEMO config
                if (data.nemoApiEndpoint) {
                    config.nemoApiEndpoint = data.nemoApiEndpoint;
                    config.nemoToken = data.nemoToken;
                    config.nemoSensorId = data.nemoSensorId;
                    config.sensorLocation = data.sensorLocation;
                }
                config.refreshInterval = parseInt(data.refreshInterval);
            } else if (this.mode === 'fun') {
                config.refreshInterval = parseInt(data.refreshInterval);
                // Add API endpoints configuration
                if (data.apis) {
                    config.apis = data.apis;
                }
            } else if (this.mode === 'sensor') {
                // Sensor mode - NEMO API configuration
                config.nemoApiEndpoint = data.nemoApiEndpoint;
                config.nemoToken = data.nemoToken;
                config.nemoSensorId = data.nemoSensorId;
                config.sensorLocation = data.sensorLocation;
                config.refreshInterval = parseInt(data.refreshInterval);
            }

            // Send configuration
            await this.protocol.sendConfig(config);
            
            this.statusUI.success('Configuration sent successfully!');
            
        } catch (error) {
            this.statusUI.error(`Failed to send configuration: ${error.message}`);
        }
    }

    handleDeviceResponse(data) {
        console.log('Device response:', data);
        
        if (data.status === 'ok') {
            this.statusUI.success('Device confirmed configuration');
        } else if (data.status === 'error') {
            this.statusUI.error(`Device error: ${data.message || 'Unknown error'}`);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new EInkSetup();
    });
} else {
    new EInkSetup();
}
