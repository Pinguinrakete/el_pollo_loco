class AudioManager {

    constructor() {
        this.sounds = {
            angryChicken: new Audio('./audio/sounds/angry.mp3'),
            collectedCoin: new Audio('./audio/sounds/collected-coin.mp3'),
            collectedBottle: new Audio('./audio/sounds/collected-bottle.mp3'),
            jumpedOfChicken: new Audio('./audio/sounds/jumpedofchicken.mp3'),
            isWalking: new Audio('./audio/sounds/running.mp3'),
            isSnoring: new Audio('./audio/sounds/snore.mp3'),
            bottleSmashed: new Audio('./audio/sounds/bottlesmashedontheground.mp3'),
            ouch: new Audio('./audio/sounds/ouch.mp3'),
            you_lost: new Audio('./audio/sounds/lost.mp3'),
            you_win: new Audio('./audio/sounds/win.mp3')
        };
    }

    /**
     * Plays a sound based on the given sound name.
     * If the sound is not marked as 'isWalking', it creates a new `Audio` object and plays it.
     * Otherwise, it directly calls the `play()` method on the existing sound.
     *
     * @param {string} soundName - The name of the sound to play.
     */
    playSound(soundName) {
        if (this.sounds[soundName] && !this.sounds[soundName] == 'isWalking') {
            const sound = new Audio(this.sounds[soundName].src);
            sound.play();
        } else {
            this.sounds[soundName].play();
        }
    }

    /**
     * Mutes all sounds by setting the `muted` property to `true` and pauses them.
     */
    muteAllSounds() {
        Object.values(this.sounds).forEach(sound => {
            sound.muted = true;
            sound.pause();
        });
    }

    /**
     * Unmutes all sounds by setting the `muted` property to `false`.
     */
    unmuteAllSounds() {
        Object.values(this.sounds).forEach(sound => {
            sound.muted = false;
        });
    }

    /**
     * Pauses each audio track and resets the audio track's playback time to the start! 
     */
    resetAllSounds() {
            Object.values(this.sounds).forEach(sound => {
            sound.muted = true;
            sound.pause();        
            sound.currentTime = 0; 
        });
    }
}