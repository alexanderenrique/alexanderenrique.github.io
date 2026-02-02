/**
 * Status UI Module
 * Handles status display and updates
 */

class StatusUI {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.messageEl = document.getElementById('status-message');
        this.indicatorEl = document.getElementById('status-indicator');
        this.init();
    }

    init() {
        if (!this.container) {
            return;
        }
    }

    /**
     * Update status message and indicator
     */
    update(message, type = 'info') {
        if (this.messageEl) {
            this.messageEl.textContent = message;
        }

        if (this.indicatorEl) {
            // Remove all status classes
            this.indicatorEl.className = 'status-indicator';
            
            // Add appropriate status class
            switch (type) {
                case 'success':
                    this.indicatorEl.classList.add('status-success');
                    break;
                case 'error':
                    this.indicatorEl.classList.add('status-error');
                    break;
                case 'warning':
                    this.indicatorEl.classList.add('status-warning');
                    break;
                case 'connecting':
                    this.indicatorEl.classList.add('status-connecting');
                    break;
                case 'ready':
                default:
                    this.indicatorEl.classList.add('status-ready');
                    break;
            }
        }
    }

    /**
     * Show success message
     */
    success(message) {
        this.update(message, 'success');
    }

    /**
     * Show error message
     */
    error(message) {
        this.update(message, 'error');
    }

    /**
     * Show warning message
     */
    warning(message) {
        this.update(message, 'warning');
    }

    /**
     * Show info message
     */
    info(message) {
        this.update(message, 'info');
    }

    /**
     * Show connecting state
     */
    connecting(message = 'Connecting...') {
        this.update(message, 'connecting');
    }

    /**
     * Show ready state
     */
    ready(message = 'Ready to connect') {
        this.update(message, 'ready');
    }

    /**
     * Clear status
     */
    clear() {
        this.update('', 'ready');
    }
}

export default StatusUI;
