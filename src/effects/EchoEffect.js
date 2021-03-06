const Tone = require('tone');

/**
* An echo effect (aka 'delay effect' in audio terms)
* Effect value of 0 mutes the effect
* Values up to 100 set the echo feedback amount,
* increasing the time it takes the echo to fade away
* Clamped 0-100
*/
class EchoEffect extends Tone.Effect {
    constructor () {
        super();
        this.value = 0;
        this.delay = new Tone.FeedbackDelay(0.25, 0.5);
        this.effectSend.chain(this.delay, this.effectReturn);
    }

    /**
    * Set the effect value
    * @param {number} val - the new value to set the effect to
    */
    set (val) {
        this.value = this.clamp(val, 0, 100);

        // mute the effect if value is 0
        if (this.value === 0) {
            this.wet.value = 0;
        } else {
            this.wet.value = 0.5;
        }

        const feedback = (this.value / 100) * 0.75;
        this.delay.feedback.rampTo(feedback, 1 / 60);
    }

    /**
    * Change the effect value
    * @param {number} val - the value to change the effect by
    */
    changeBy (val) {
        this.set(this.value + val);
    }

    /**
    * Clamp the input to a range
    * @param {number} input - the input to clamp
    * @param {number} min - the min value to clamp to
    * @param {number} max - the max value to clamp to
    * @return {number} the clamped value
    */
    clamp (input, min, max) {
        return Math.min(Math.max(input, min), max);
    }
}

module.exports = EchoEffect;
