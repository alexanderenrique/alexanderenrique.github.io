/**
 * BLE Core Module
 * Handles Web Bluetooth API interactions
 */

class BLECore {
    constructor() {
        this.device = null;
        this.server = null;
        this.service = null;
        this.characteristic = null;
        this.onDisconnected = null;
    }

    /**
     * Check if Web Bluetooth is available
     */
    isAvailable() {
        return navigator.bluetooth && navigator.bluetooth.getAvailability;
    }

    /**
     * Request device and connect
     */
    async connect(deviceName = null, serviceUUID = null) {
        try {
            console.log('[BLE] Requesting device connection...');
            console.log('[BLE] Service UUID:', serviceUUID || 'none');
            
            // Build filter options
            const options = {
                optionalServices: serviceUUID ? [serviceUUID] : []
            };

            // Use filters to only show devices with the specific service UUID
            // This filters out "unknown" devices that don't advertise our service
            if (serviceUUID) {
                options.filters = [{
                    services: [serviceUUID]
                }];
                console.log('[BLE] Using service filter:', serviceUUID);
            } else if (deviceName) {
                // If no service UUID but device name provided, filter by name
                options.filters = [{
                    name: deviceName
                }];
                console.log('[BLE] Using name filter:', deviceName);
            } else {
                // Fallback: if no filters specified, use acceptAllDevices
                // This should rarely be needed, but kept for backwards compatibility
                options.acceptAllDevices = true;
                console.log('[BLE] No filters specified, accepting all devices');
            }

            this.device = await navigator.bluetooth.requestDevice(options);
            console.log('[BLE] Device selected:', {
                name: this.device.name,
                id: this.device.id,
                gatt: this.device.gatt ? 'available' : 'not available'
            });
            
            // Set up disconnect handler
            this.device.addEventListener('gattserverdisconnected', () => {
                console.log('[BLE] Device disconnected');
                if (this.onDisconnected) {
                    this.onDisconnected();
                }
            });

            console.log('[BLE] Connecting to GATT server...');
            this.server = await this.device.gatt.connect();
            console.log('[BLE] GATT server connected');
            
            // Wait a bit for services to be ready
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Log available services after connection
            try {
                const services = await this.getAvailableServices();
                console.log('[BLE] Available services:', services.length);
                services.forEach((service, index) => {
                    console.log(`[BLE]   Service ${index + 1}: ${service.uuid}`);
                });
            } catch (e) {
                console.log('[BLE] Could not fetch services yet:', e.message);
                // If getPrimaryServices() fails, try accessing the optional service directly
                if (serviceUUID) {
                    console.log('[BLE] Attempting to access optional service directly:', serviceUUID);
                    try {
                        const service = await this.server.getPrimaryService(serviceUUID);
                        console.log('[BLE] Optional service accessible directly:', serviceUUID);
                    } catch (directError) {
                        console.log('[BLE] Optional service also not accessible:', directError.message);
                    }
                }
            }
            
            return this.server;
        } catch (error) {
            console.error('[BLE] Connection error:', error);
            throw new Error(`Connection failed: ${error.message}`);
        }
    }

    /**
     * Get all available services
     */
    async getAvailableServices(retries = 3, delay = 200) {
        if (!this.server) {
            throw new Error('Not connected to device');
        }
        console.log('[BLE] Fetching all available services...');
        
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const services = await this.server.getPrimaryServices();
                console.log('[BLE] Found', services.length, 'primary services');
                services.forEach((service, index) => {
                    console.log(`[BLE]   [${index + 1}] UUID: ${service.uuid}`);
                });
                return services;
            } catch (error) {
                console.log(`[BLE] Attempt ${attempt}/${retries} failed:`, error.message);
                if (attempt < retries) {
                    console.log(`[BLE] Waiting ${delay}ms before retry...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 1.5; // Exponential backoff
                } else {
                    throw error;
                }
            }
        }
    }

    /**
     * Get a service
     */
    async getService(serviceUUID, retries = 3, delay = 200) {
        if (!this.server) {
            throw new Error('Not connected to device');
        }
        console.log('[BLE] Getting service:', serviceUUID);
        
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                this.service = await this.server.getPrimaryService(serviceUUID);
                console.log('[BLE] Service found:', serviceUUID);
                
                // Log characteristics in this service
                try {
                    const characteristics = await this.service.getCharacteristics();
                    console.log('[BLE]   Characteristics:', characteristics.length);
                    characteristics.forEach((char, index) => {
                        console.log(`[BLE]     [${index + 1}] UUID: ${char.uuid}, Properties:`, {
                            read: char.properties.read,
                            write: char.properties.write,
                            notify: char.properties.notify,
                            indicate: char.properties.indicate
                        });
                    });
                } catch (e) {
                    console.log('[BLE]   Could not fetch characteristics:', e.message);
                }
                
                return this.service;
            } catch (error) {
                console.log(`[BLE] Service access attempt ${attempt}/${retries} failed:`, error.message);
                
                // If service not found and we have retries left, wait and retry
                if (attempt < retries) {
                    console.log(`[BLE] Waiting ${delay}ms before retry...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 1.5; // Exponential backoff
                } else {
                    // Final attempt failed - try to get available services for debugging
                    console.error('[BLE] Service not found after retries:', serviceUUID);
                    try {
                        const availableServices = await this.getAvailableServices(1, 0);
                        const serviceList = availableServices.map(s => s.uuid).join(', ');
                        throw new Error(`Service ${serviceUUID} not found after ${retries} attempts. Available services: ${serviceList || 'none'}`);
                    } catch (e) {
                        if (e.message.includes('Available services')) {
                            throw e;
                        }
                        throw new Error(`Service ${serviceUUID} not found. Could not fetch available services: ${e.message}`);
                    }
                }
            }
        }
    }

    /**
     * Get a characteristic
     */
    async getCharacteristic(characteristicUUID) {
        if (!this.service) {
            throw new Error('Service not selected');
        }
        console.log('[BLE] Getting characteristic:', characteristicUUID);
        this.characteristic = await this.service.getCharacteristic(characteristicUUID);
        console.log('[BLE] Characteristic found:', characteristicUUID);
        return this.characteristic;
    }

    /**
     * Read value from characteristic
     */
    async readValue() {
        if (!this.characteristic) {
            throw new Error('Characteristic not selected');
        }
        const dataView = await this.characteristic.readValue();
        return dataView;
    }

    /**
     * Write value to characteristic
     */
    async writeValue(value) {
        console.log('[BLE] ========================================');
        console.log('[BLE] WRITE VALUE TO CHARACTERISTIC');
        console.log('[BLE] ========================================');
        
        if (!this.characteristic) {
            console.error('[BLE] No characteristic selected!');
            throw new Error('Characteristic not selected');
        }
        
        console.log('[BLE] Characteristic UUID:', this.characteristic.uuid);
        console.log('[BLE] Characteristic properties:', {
            read: this.characteristic.properties.read,
            write: this.characteristic.properties.write,
            writeWithoutResponse: this.characteristic.properties.writeWithoutResponse,
            notify: this.characteristic.properties.notify,
            indicate: this.characteristic.properties.indicate
        });
        
        console.log('[BLE] Value to write:', {
            type: value.constructor.name,
            length: value.length || value.byteLength,
            isArrayBuffer: value instanceof ArrayBuffer,
            isUint8Array: value instanceof Uint8Array,
            isDataView: value instanceof DataView
        });
        
        // Convert to ArrayBuffer if needed for logging
        let arrayBuffer;
        if (value instanceof ArrayBuffer) {
            arrayBuffer = value;
        } else if (value instanceof Uint8Array) {
            arrayBuffer = value.buffer;
        } else if (value instanceof DataView) {
            arrayBuffer = value.buffer;
        } else {
            arrayBuffer = value;
        }
        
        const uint8Array = new Uint8Array(arrayBuffer);
        console.log('[BLE] Data preview (first 50 bytes):', Array.from(uint8Array.slice(0, 50)));
        console.log('[BLE] Data preview (hex, first 50 bytes):', 
            Array.from(uint8Array.slice(0, 50))
                .map(b => b.toString(16).padStart(2, '0'))
                .join(' '));
        
        if (uint8Array.length > 50) {
            console.log('[BLE] ... (showing first 50 of', uint8Array.length, 'bytes)');
        }
        
        console.log('[BLE] Attempting write operation...');
        const writeStartTime = performance.now();
        
        try {
            await this.characteristic.writeValue(value);
            const writeEndTime = performance.now();
            const writeDuration = writeEndTime - writeStartTime;
            
            console.log('[BLE] Write operation successful!');
            console.log('[BLE] Write duration:', writeDuration.toFixed(2), 'ms');
            console.log('[BLE] Bytes written:', uint8Array.length);
            console.log('[BLE] ========================================');
        } catch (writeError) {
            console.error('[BLE] ========================================');
            console.error('[BLE] WRITE OPERATION FAILED');
            console.error('[BLE] ========================================');
            console.error('[BLE] Error:', writeError);
            console.error('[BLE] Error name:', writeError.name);
            console.error('[BLE] Error message:', writeError.message);
            console.error('[BLE] Error code:', writeError.code);
            throw writeError;
        }
    }

    /**
     * Start notifications
     */
    async startNotifications(callback) {
        if (!this.characteristic) {
            throw new Error('Characteristic not selected');
        }
        await this.characteristic.startNotifications();
        this.characteristic.addEventListener('characteristicvaluechanged', callback);
    }

    /**
     * Stop notifications
     */
    async stopNotifications() {
        if (!this.characteristic) {
            return;
        }
        await this.characteristic.stopNotifications();
    }

    /**
     * Disconnect from device
     */
    async disconnect() {
        console.log('[BLE] Disconnecting...');
        if (this.device && this.device.gatt.connected) {
            await this.device.gatt.disconnect();
            console.log('[BLE] Device disconnected');
        }
        this.device = null;
        this.server = null;
        this.service = null;
        this.characteristic = null;
        console.log('[BLE] Connection state cleared');
    }

    /**
     * Check if connected
     */
    isConnected() {
        return this.device && this.device.gatt && this.device.gatt.connected;
    }
}

export default BLECore;
