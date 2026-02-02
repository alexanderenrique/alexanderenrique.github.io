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
            const options = {
                acceptAllDevices: !deviceName && !serviceUUID,
                optionalServices: serviceUUID ? [serviceUUID] : []
            };

            if (deviceName) {
                options.filters = [{ name: deviceName }];
            }

            if (serviceUUID && !deviceName) {
                options.filters = [{ services: [serviceUUID] }];
            }

            this.device = await navigator.bluetooth.requestDevice(options);
            
            // Set up disconnect handler
            this.device.addEventListener('gattserverdisconnected', () => {
                if (this.onDisconnected) {
                    this.onDisconnected();
                }
            });

            this.server = await this.device.gatt.connect();
            return this.server;
        } catch (error) {
            throw new Error(`Connection failed: ${error.message}`);
        }
    }

    /**
     * Get a service
     */
    async getService(serviceUUID) {
        if (!this.server) {
            throw new Error('Not connected to device');
        }
        this.service = await this.server.getPrimaryService(serviceUUID);
        return this.service;
    }

    /**
     * Get a characteristic
     */
    async getCharacteristic(characteristicUUID) {
        if (!this.service) {
            throw new Error('Service not selected');
        }
        this.characteristic = await this.service.getCharacteristic(characteristicUUID);
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
        if (!this.characteristic) {
            throw new Error('Characteristic not selected');
        }
        await this.characteristic.writeValue(value);
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
        if (this.device && this.device.gatt.connected) {
            await this.device.gatt.disconnect();
        }
        this.device = null;
        this.server = null;
        this.service = null;
        this.characteristic = null;
    }

    /**
     * Check if connected
     */
    isConnected() {
        return this.device && this.device.gatt && this.device.gatt.connected;
    }
}

export default BLECore;
