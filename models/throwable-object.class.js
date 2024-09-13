class ThrowableObject extends MovableObject {
    offset = {top: 15, bottom: 15, left: 10, right: 10};
    onlyOne = true;

    IMAGES_THROW_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, throwingRange) {
        super().loadImage(this.IMAGES_THROW_BOTTLE[0]);

        this.loadImages(this.IMAGES_THROW_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH_BOTTLE);
        this.x = x;
        this.y = y;
        this.throwingRange = throwingRange;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
 
        setInterval(() => {
            this.handleBottleThrow();
        }, 50);
    }

    /**
     * Handles the logic and animation when a bottle is thrown.
     * 
     * This function checks if the bottle is in the air or has splashed on the ground,
     * and plays the corresponding animation. If the bottle splashes and is destroyed, 
     * it plays the sound of the bottle smashing and updates the state to mark the bottle as destroyed.
     * 
     * @this {Object} The context object, containing methods like `bottleIsNotOnTheGround`, 
     * `bottleSplashedOnTheGround`, `playAnimation`, and `bottleIsDestroy`, and properties 
     * like `x`, `throwingRange`, `IMAGES_THROW_BOTTLE`, `IMAGES_SPLASH_BOTTLE`, `onlyOne`, and `world`.
     */
    handleBottleThrow() {
        if (this.bottleIsNotOnTheGround()) {
            this.x = this.x + this.throwingRange;
        }
        if (this.bottleSplashedOnTheGround()) {
            this.playAnimation(this.IMAGES_SPLASH_BOTTLE);
        } else { 
            this.playAnimation(this.IMAGES_THROW_BOTTLE);
        }
        if (this.bottleSplashedOnTheGround() & this.bottleIsDestroy()) {
            world.audio.playSound('bottleSmashed');
            this.onlyOne = false;
        }
    }

    /**
     * Checks if the bottle is destroyed or a specific condition is met.
     * 
     * @returns {boolean} `true` if the condition (e.g., bottle destroyed) is met, otherwise `false`.
     */
    bottleIsDestroy() {
        return this.onlyOne;
    }
}