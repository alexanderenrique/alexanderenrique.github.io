the purpose of this project would be to make a desktop mounted TV that can show cartoons or simple videos or whatever

BOM so far:
- ESP32 S3 display, 2.8", 240x320 pixels
- 2-3W, 8 ohm speaker with JST connection
- 32GB microSD card
- Touch screen to turn the display on
- Maybe also use the touch screen to control the volume?


// Center the 8-bit unsigned sample to signed (-128 to +127)
int16_t sample = raw_sample - 128;

// Scale by volume factor (e.g., 0.5 = 50% volume)
float volume = 0.5f; 
sample = sample * volume;

// Shift back to unsigned 8-bit for the PWM output
uint8_t output_pwm_duty = (uint8_t)(sample + 128);