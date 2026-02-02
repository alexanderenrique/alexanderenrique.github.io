/**
 * Protocol Module
 * Handles communication protocol with e-ink display
 */

class Protocol {
    constructor(bleCore) {
        this.ble = bleCore;
        this.serviceUUID = '0000ff00-0000-1000-8000-00805f9b34fb';
        this.txCharacteristicUUID = '0000ff01-0000-1000-8000-00805f9b34fb';
        this.rxCharacteristicUUID = '0000ff02-0000-1000-8000-00805f9b34fb';
    }

    /**
     * Initialize protocol by connecting to service and characteristics
     */
    async initialize() {
        await this.ble.getService(this.serviceUUID);
        await this.ble.getCharacteristic(this.txCharacteristicUUID);
        
        // Set up RX characteristic for receiving data
        const rxChar = await this.ble.service.getCharacteristic(this.rxCharacteristicUUID);
        await rxChar.startNotifications();
        
        return true;
    }

    /**
     * Encode configuration data to JSON and then to ArrayBuffer
     */
    encodeConfig(config) {
        const json = JSON.stringify(config);
        const encoder = new TextEncoder();
        return encoder.encode(json);
    }

    /**
     * Decode ArrayBuffer to JSON
     */
    decodeResponse(dataView) {
        const decoder = new TextDecoder();
        const json = decoder.decode(dataView);
        return JSON.parse(json);
    }

    /**
     * Send configuration to device
     */
    async sendConfig(config) {
        if (!this.ble.isConnected()) {
            throw new Error('Not connected to device');
        }

        const data = this.encodeConfig(config);
        await this.ble.writeValue(data);
    }

    /**
     * Read response from device
     */
    async readResponse() {
        if (!this.ble.isConnected()) {
            throw new Error('Not connected to device');
        }

        const rxChar = await this.ble.service.getCharacteristic(this.rxCharacteristicUUID);
        const dataView = await rxChar.readValue();
        return this.decodeResponse(dataView);
    }

    /**
     * Set up notification handler for incoming data
     */
    async onNotification(callback) {
        const rxChar = await this.ble.service.getCharacteristic(this.rxCharacteristicUUID);
        await rxChar.startNotifications();
        rxChar.addEventListener('characteristicvaluechanged', (event) => {
            const data = this.decodeResponse(event.target.value);
            callback(data);
        });
    }
}

export default Protocol;
