/**
 * Chunking Module
 * Handles splitting large data into BLE MTU-sized chunks
 */

class Chunking {
    constructor(mtuSize = 20) {
        this.mtuSize = mtuSize;
    }

    /**
     * Split data into chunks
     */
    chunk(data) {
        const chunks = [];
        const totalChunks = Math.ceil(data.length / this.mtuSize);
        
        for (let i = 0; i < totalChunks; i++) {
            const start = i * this.mtuSize;
            const end = Math.min(start + this.mtuSize, data.length);
            const chunk = data.slice(start, end);
            
            chunks.push({
                index: i,
                total: totalChunks,
                data: chunk
            });
        }
        
        return chunks;
    }

    /**
     * Reassemble chunks back into original data
     */
    reassemble(chunks) {
        // Sort chunks by index
        chunks.sort((a, b) => a.index - b.index);
        
        // Verify we have all chunks
        const totalChunks = chunks[0].total;
        if (chunks.length !== totalChunks) {
            throw new Error(`Missing chunks. Expected ${totalChunks}, got ${chunks.length}`);
        }
        
        // Combine all chunk data
        const totalLength = chunks.reduce((sum, chunk) => sum + chunk.data.length, 0);
        const result = new Uint8Array(totalLength);
        
        let offset = 0;
        for (const chunk of chunks) {
            result.set(chunk.data, offset);
            offset += chunk.data.length;
        }
        
        return result.buffer;
    }

    /**
     * Send chunked data with flow control
     */
    async sendChunked(writeFunction, data, onProgress = null) {
        const chunks = this.chunk(new Uint8Array(data));
        
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            await writeFunction(chunk.data);
            
            if (onProgress) {
                onProgress({
                    current: i + 1,
                    total: chunks.length,
                    percent: Math.round(((i + 1) / chunks.length) * 100)
                });
            }
            
            // Small delay between chunks to prevent overwhelming the device
            if (i < chunks.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }
    }
}

export default Chunking;
