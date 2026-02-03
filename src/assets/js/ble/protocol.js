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
        console.log('[Protocol] Initializing protocol...');
        console.log('[Protocol] Service UUID:', this.serviceUUID);
        console.log('[Protocol] TX Characteristic UUID:', this.txCharacteristicUUID);
        console.log('[Protocol] RX Characteristic UUID:', this.rxCharacteristicUUID);
        
        await this.ble.getService(this.serviceUUID);
        console.log('[Protocol] Service connected');
        
        await this.ble.getCharacteristic(this.txCharacteristicUUID);
        console.log('[Protocol] TX characteristic connected');
        
        // Set up RX characteristic for receiving data
        console.log('[Protocol] Setting up RX characteristic...');
        const rxChar = await this.ble.service.getCharacteristic(this.rxCharacteristicUUID);
        console.log('[Protocol] RX characteristic found, starting notifications...');
        await rxChar.startNotifications();
        console.log('[Protocol] RX notifications started');
        
        console.log('[Protocol] Initialization complete');
        return true;
    }

    /**
     * Encode configuration data to JSON and then to ArrayBuffer
     */
    encodeConfig(config) {
        console.log('[Protocol] ========================================');
        console.log('[Protocol] ENCODING CONFIGURATION');
        console.log('[Protocol] ========================================');
        console.log('[Protocol] Input config object:', config);
        
        const json = JSON.stringify(config);
        console.log('[Protocol] JSON string:', json);
        console.log('[Protocol] JSON string length:', json.length, 'characters');
        console.log('[Protocol] JSON string size:', new Blob([json]).size, 'bytes');
        
        const encoder = new TextEncoder();
        const encoded = encoder.encode(json);
        console.log('[Protocol] Encoded ArrayBuffer length:', encoded.length, 'bytes');
        console.log('[Protocol] Encoded bytes (first 100):', Array.from(encoded.slice(0, 100)));
        if (encoded.length > 100) {
            console.log('[Protocol] ... (truncated, showing first 100 bytes)');
        }
        console.log('[Protocol] Encoded bytes (hex, first 100):', 
            Array.from(encoded.slice(0, 100))
                .map(b => b.toString(16).padStart(2, '0'))
                .join(' '));
        
        console.log('[Protocol] ========================================');
        return encoded;
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
        console.log('[Protocol] ========================================');
        console.log('[Protocol] SEND CONFIG STARTED');
        console.log('[Protocol] ========================================');
        console.log('[Protocol] Checking connection status...');
        
        if (!this.ble.isConnected()) {
            console.error('[Protocol] Not connected to device!');
            throw new Error('Not connected to device');
        }
        
        console.log('[Protocol] Connection verified');
        console.log('[Protocol] Encoding configuration...');
        
        const data = this.encodeConfig(config);
        
        console.log('[Protocol] Configuration encoded, preparing to write...');
        console.log('[Protocol] Data to write:', {
            type: data.constructor.name,
            length: data.length,
            isArrayBuffer: data instanceof ArrayBuffer,
            isUint8Array: data instanceof Uint8Array
        });
        
        console.log('[Protocol] Writing to TX characteristic:', this.txCharacteristicUUID);
        const writeStartTime = performance.now();
        
        try {
            await this.ble.writeValue(data);
            const writeEndTime = performance.now();
            const writeDuration = writeEndTime - writeStartTime;
            
            console.log('[Protocol] Write operation completed successfully!');
            console.log('[Protocol] Write duration:', writeDuration.toFixed(2), 'ms');
            console.log('[Protocol] Bytes written:', data.length);
            console.log('[Protocol] ========================================');
        } catch (writeError) {
            console.error('[Protocol] ========================================');
            console.error('[Protocol] WRITE OPERATION FAILED');
            console.error('[Protocol] ========================================');
            console.error('[Protocol] Error during write:', writeError);
            console.error('[Protocol] Error name:', writeError.name);
            console.error('[Protocol] Error message:', writeError.message);
            throw writeError;
        }
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
