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
        // Scan and Connect button (combined)
        const scanConnectBtn = document.getElementById('scan-connect-btn');
        if (scanConnectBtn) {
            scanConnectBtn.addEventListener('click', () => this.scanAndConnect());
        }
    }

    async scanAndConnect() {
        try {
            console.log('[Setup] Starting scan and connect...');
            this.statusUI.connecting('Scanning for devices...');
            
            // Request device - this will show the browser's device picker
            const server = await this.ble.connect(
                null, // No specific device name
                '0000ff00-0000-1000-8000-00805f9b34fb' // Service UUID
            );
            
            this.selectedDevice = this.ble.device;
            console.log('[Setup] Device selected:', {
                name: this.ble.device.name,
                id: this.ble.device.id
            });
            
            this.statusUI.connecting('Connecting to device...');
            
            // Log available services before attempting to connect
            console.log('[Setup] Waiting a moment for services to be ready...');
            await new Promise(resolve => setTimeout(resolve, 300));
            
            console.log('[Setup] Fetching available services before protocol init...');
            try {
                const services = await this.ble.getAvailableServices();
                console.log('[Setup] Services available on device:', services.length);
                services.forEach((service, index) => {
                    console.log(`[Setup]   [${index + 1}] ${service.uuid}`);
                });
            } catch (e) {
                console.log('[Setup] Could not fetch services:', e.message);
                console.log('[Setup] This might be normal - some devices don\'t expose services via getPrimaryServices()');
                console.log('[Setup] Will attempt to access service directly...');
            }
            
            // Initialize protocol
            console.log('[Setup] Initializing protocol...');
            this.protocol = new Protocol(this.ble);
            await this.protocol.initialize();
            console.log('[Setup] Protocol initialized successfully');
            
            // Set up notification handler
            console.log('[Setup] Setting up notification handler...');
            await this.protocol.onNotification((data) => {
                this.handleDeviceResponse(data);
            });
            
            this.statusUI.success('Connected successfully!');
            console.log('[Setup] Connection successful!');
            
            // Update UI
            document.getElementById('scan-connect-btn').disabled = true;
            document.getElementById('send-config-btn').disabled = false;
            this.formUI.setEnabled(true);
            
        } catch (error) {
            console.error('[Setup] Scan and connect error:', error);
            if (error.name === 'NotFoundError') {
                this.statusUI.warning('No devices found. Make sure your device is powered on and in pairing mode.');
            } else if (error.name === 'SecurityError') {
                this.statusUI.error('Permission denied. Please allow Bluetooth access.');
            } else if (error.message.includes('Service') && error.message.includes('not found')) {
                try {
                    console.log('[Setup] Service not found, fetching all available services...');
                    const services = await this.ble.getAvailableServices();
                    const serviceList = services.map(s => s.uuid).join('\n');
                    console.log('[Setup] Available services:', serviceList);
                    this.statusUI.error(`${error.message}\n\nAvailable services:\n${serviceList}`);
                } catch (e) {
                    console.error('[Setup] Error fetching services:', e);
                    this.statusUI.error(`Connection failed: ${error.message}`);
                }
            } else {
                this.statusUI.error(`Connection failed: ${error.message}`);
            }
        }
    }

    handleDisconnect() {
        this.statusUI.warning('Disconnected from device');
        this.protocol = null;
        
        // Update UI
        document.getElementById('scan-connect-btn').disabled = false;
        document.getElementById('send-config-btn').disabled = true;
        this.formUI.setEnabled(false);
    }

    async handleFormSubmit(data) {
        console.log('[Setup] ========================================');
        console.log('[Setup] FORM SUBMISSION STARTED');
        console.log('[Setup] ========================================');
        console.log('[Setup] Form data received:', data);
        
        if (!this.protocol || !this.ble.isConnected()) {
            console.error('[Setup] Cannot send config - not connected');
            this.statusUI.error('Not connected to device');
            return;
        }

        console.log('[Setup] Connection verified - protocol and BLE are ready');

        // Get the send config button and update its state
        const sendBtn = document.getElementById('send-config-btn');
        const originalText = sendBtn ? sendBtn.textContent : 'Send Configuration';
        const originalClasses = sendBtn ? sendBtn.className : '';

        try {
            // Update button to show sending state
            if (sendBtn) {
                sendBtn.textContent = 'Sending...';
                sendBtn.disabled = true;
                sendBtn.classList.remove('btn-success');
            }
            
            this.statusUI.connecting('Sending configuration...');
            
            // Prepare config object based on mode
            console.log('[Setup] Preparing configuration object...');
            console.log('[Setup] Current mode:', this.mode);
            
            const config = {
                mode: this.mode,
                timestamp: Date.now()
            };

            // Add WiFi configuration (common to all modes)
            if (data.wifiSsid) {
                config.wifiSsid = data.wifiSsid;
                console.log('[Setup]   Added WiFi SSID:', data.wifiSsid);
            }
            if (data.wifiPassword) {
                config.wifiPassword = data.wifiPassword;
                console.log('[Setup]   Added WiFi Password: [hidden]');
            }

            // Add mode-specific configuration
            if (this.mode === 'shelf' || this.mode === 'label') {
                console.log('[Setup] Processing shelf/label mode configuration');
                // Shelf label mode - simple text label
                if (data.labelText) {
                    config.labelText = data.labelText;
                    console.log('[Setup]   Added labelText:', data.labelText);
                }
                // Legacy shelf mode with NEMO config
                if (data.nemoApiEndpoint) {
                    config.nemoApiEndpoint = data.nemoApiEndpoint;
                    config.nemoToken = data.nemoToken;
                    config.nemoSensorId = data.nemoSensorId;
                    config.sensorLocation = data.sensorLocation;
                    console.log('[Setup]   Added NEMO config:', {
                        endpoint: data.nemoApiEndpoint,
                        sensorId: data.nemoSensorId,
                        location: data.sensorLocation
                    });
                }
                config.refreshInterval = parseInt(data.refreshInterval);
                console.log('[Setup]   Refresh interval:', config.refreshInterval);
            } else if (this.mode === 'fun') {
                console.log('[Setup] Processing fun mode configuration');
                config.refreshInterval = parseInt(data.refreshInterval);
                console.log('[Setup]   Refresh interval:', config.refreshInterval);
                // Add API endpoints configuration
                if (data.apis) {
                    config.apis = data.apis;
                    console.log('[Setup]   Added APIs config:', data.apis);
                }
            } else if (this.mode === 'sensor') {
                console.log('[Setup] Processing sensor mode configuration');
                // Sensor mode - NEMO API configuration
                config.nemoApiEndpoint = data.nemoApiEndpoint;
                config.nemoToken = data.nemoToken;
                config.nemoSensorId = data.nemoSensorId;
                config.sensorLocation = data.sensorLocation;
                config.refreshInterval = parseInt(data.refreshInterval);
                config.temperatureUnit = data.temperatureUnit || 'C';
                console.log('[Setup]   NEMO config:', {
                    endpoint: data.nemoApiEndpoint,
                    sensorId: data.nemoSensorId,
                    location: data.sensorLocation,
                    refreshInterval: config.refreshInterval,
                    temperatureUnit: config.temperatureUnit
                });
            }

            console.log('[Setup] Final configuration object:', config);
            console.log('[Setup] Configuration object keys:', Object.keys(config));
            console.log('[Setup] Configuration size (estimated):', JSON.stringify(config).length, 'characters');

            // Send configuration
            console.log('[Setup] Calling protocol.sendConfig()...');
            const startTime = performance.now();
            await this.protocol.sendConfig(config);
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            console.log('[Setup] Configuration sent successfully!');
            console.log('[Setup] Send duration:', duration.toFixed(2), 'ms');
            console.log('[Setup] ========================================');
            
            // Update button to show success state
            if (sendBtn) {
                sendBtn.textContent = 'Configuration Sent!';
                sendBtn.classList.remove('btn-primary');
                sendBtn.classList.add('btn-success');
                sendBtn.disabled = false;
            }
            
            this.statusUI.success('Configuration sent successfully!');
            
        } catch (error) {
            console.error('[Setup] ========================================');
            console.error('[Setup] CONFIGURATION SEND FAILED');
            console.error('[Setup] ========================================');
            console.error('[Setup] Error:', error);
            console.error('[Setup] Error message:', error.message);
            console.error('[Setup] Error stack:', error.stack);
            
            // Reset button to original state on error
            if (sendBtn) {
                sendBtn.textContent = originalText;
                sendBtn.className = originalClasses;
                sendBtn.disabled = false;
            }
            
            this.statusUI.error(`Failed to send configuration: ${error.message}`);
        }
    }

    handleDeviceResponse(data) {
        console.log('[Setup] ========================================');
        console.log('[Setup] DEVICE RESPONSE RECEIVED');
        console.log('[Setup] ========================================');
        console.log('[Setup] Raw response data:', data);
        console.log('[Setup] Response type:', typeof data);
        console.log('[Setup] Response keys:', data ? Object.keys(data) : 'null');
        
        if (data && data.status) {
            console.log('[Setup] Response status:', data.status);
        }
        
        if (data && data.message) {
            console.log('[Setup] Response message:', data.message);
        }
        
        console.log('[Setup] Full response object:', JSON.stringify(data, null, 2));
        console.log('[Setup] ========================================');
        
        if (data.status === 'ok') {
            this.statusUI.success('Device confirmed configuration');
        } else if (data.status === 'error') {
            this.statusUI.error(`Device error: ${data.message || 'Unknown error'}`);
        } else {
            console.log('[Setup] Unknown response status, displaying anyway');
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
