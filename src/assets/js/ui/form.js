/**
 * Form UI Module
 * Handles form interactions and validation
 */

class FormUI {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.inputs = {};
        this.init();
    }

    init() {
        if (!this.form) {
            return;
        }

        // Get all form inputs
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            this.inputs[input.name || input.id] = input;
        });
    }

    /**
     * Get form data as object
     */
    getData() {
        const data = {};
        
        // First, handle all checkboxes (including unchecked ones)
        const checkboxes = this.form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const name = checkbox.name;
            if (name.includes('.')) {
                // Handle nested keys (e.g., "apis.room_data")
                const keys = name.split('.');
                let current = data;
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!current[keys[i]]) {
                        current[keys[i]] = {};
                    }
                    current = current[keys[i]];
                }
                current[keys[keys.length - 1]] = checkbox.checked;
            } else {
                data[name] = checkbox.checked;
            }
        });
        
        // Then, handle all other form fields (FormData includes all non-checkbox fields)
        const formData = new FormData(this.form);
        for (const [key, value] of formData.entries()) {
            // Skip checkboxes as we've already handled them
            const input = this.form.querySelector(`[name="${key}"]`);
            if (input && input.type === 'checkbox') {
                continue;
            }
            
            // Handle nested keys for non-checkbox fields
            if (key.includes('.')) {
                const keys = key.split('.');
                let current = data;
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!current[keys[i]]) {
                        current[keys[i]] = {};
                    }
                    current = current[keys[i]];
                }
                current[keys[keys.length - 1]] = value;
            } else {
                data[key] = value;
            }
        }
        
        return data;
    }

    /**
     * Set form data from object
     */
    setData(data) {
        Object.keys(data).forEach(key => {
            const input = this.inputs[key];
            if (input) {
                input.value = data[key];
            }
        });
    }

    /**
     * Reset form to default values
     */
    reset() {
        this.form.reset();
    }

    /**
     * Validate form
     */
    validate() {
        let isValid = true;
        const errors = [];

        // Check required fields
        const requiredFields = this.form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                errors.push(`${field.labels[0]?.textContent || field.name} is required`);
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        // Custom validation
        if (this.inputs.updateFrequency) {
            const freq = parseInt(this.inputs.updateFrequency.value);
            if (isNaN(freq) || freq < 1) {
                isValid = false;
                errors.push('Update frequency must be at least 1 minute');
                this.inputs.updateFrequency.classList.add('error');
            }
        }

        return { isValid, errors };
    }

    /**
     * Enable/disable form
     */
    setEnabled(enabled) {
        const inputs = this.form.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => {
            input.disabled = !enabled;
        });
    }

    /**
     * Set submit handler
     */
    onSubmit(handler) {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const validation = this.validate();
            if (validation.isValid) {
                handler(this.getData());
            } else {
                console.error('Validation errors:', validation.errors);
            }
        });
    }
}

export default FormUI;
