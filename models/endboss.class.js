class Endboss extends MovableObject {
    offset = {top: -60, bottom: -80, left: 40, right: 25}; 
    height = 330;
    width = 350;
    y = 110;
    speed = 50;

    IMAGES_WATCHING = [
        'img/4_enemie_boss_chicken/6_watching/G5.png',
        'img/4_enemie_boss_chicken/6_watching/G6.png',
        'img/4_enemie_boss_chicken/6_watching/G7.png',
        'img/4_enemie_boss_chicken/6_watching/G8.png',
        'img/4_enemie_boss_chicken/6_watching/G9.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ANGRY_WALKING = [
        'img/4_enemie_boss_chicken/7_angry_walk/G27.png',
        'img/4_enemie_boss_chicken/7_angry_walk/G28.png',
        'img/4_enemie_boss_chicken/7_angry_walk/G29.png',
        'img/4_enemie_boss_chicken/7_angry_walk/G30.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);

        this.loadImages(this.IMAGES_WATCHING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ANGRY_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 7000;
        this.speed = this.speed + Math.random() * 0.5;
        this.twoSecoundPause = true;

        this.animate();
        this.applyGravity();
    }


    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {world.audio.playSound('you_win')}, 3000);
                setTimeout(() => {endScreen('win/won_2')}, 3000);
            } else if (this.endbossIsHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                world.audio.playSound('angryChicken');
            } else if (this.peppeIsLeftOrRightFromEndboss()) {  
                this.reactionEndbossRightSide();
            } else {    
                this.reactionEndbossLeftSide();
            }
        }, 200);
    }

    /**
     * Checks if the end boss is in panic mode.
     * The end boss is considered in panic mode when its energy is less than 81.
     *
     * @returns {boolean} - Returns true if the energy is below 81, otherwise false.
     */
    endbossIsInPanic() {
        return this.energy < 81;
    }

    /**
     * Handles the walking animation for the end boss.
     * Plays the angry walking animation if the end boss is in panic mode,
     * otherwise plays the normal walking animation.
     */
    isWalking() {
        if (this.endbossIsInPanic()) {
            this.playAnimation(this.IMAGES_ANGRY_WALKING);     
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Handles the watching animation for the end boss.
     * Plays an alert animation if the end boss is in panic mode,
     * otherwise plays the normal watching animation.
     */
    isWatching() {
        if (this.endbossIsInPanic()) {
            this.playAnimation(this.IMAGES_ALERT);
        } else {
            this.playAnimation(this.IMAGES_WATCHING); 
        }
    }

    /**
     * Checks if the character is in close distance to the left side of the end boss.
     *
     * @returns {boolean} - Returns true if the character is less than 80 units away from the left side.
     */
    nearDistanceLeft() {
        return this.x - world.character.x < 80;
    }

    /**
     * Checks if the character is in close distance to the right side of the end boss.
     *
     * @returns {boolean} - Returns true if the character is more than -330 units away from the right side.
     */ 
    nearDistanceRight() {
        return this.x - world.character.x > -330;
    }

    /**
     * Checks if the character is in far distance to the left side of the end boss.
     *
     * @returns {boolean} - Returns true if the character is between -50 and 420 units away from the left side.
     */
    farDistanceLeft() {
        return this.x - world.character.x < 420 && this.x - world.character.x > -50;
    }

    /**
     * Checks if the character is in far distance to the right side of the end boss.
     *
     * @returns {boolean} - Returns true if the character is between -280 and -3000 units away from the right side.
     */
    farDistanceRight() {
        return this.x - world.character.x > -3000 && this.x - world.character.x < -280;
    }

    /**
     * Determines if the character is located to the left or right of the end boss.
     *
     * @returns {boolean} - Returns true if the character is more than 100 units to the right of the end boss.
     */
    peppeIsLeftOrRightFromEndboss() {
        return this.x - world.character.x < -100;
    }

    /**
     * Handles the end boss's reaction when the character is on its left side.
     * If the character is within a far distance on the left, the end boss moves left and walks.
     * If the character is near and not above the ground, the end boss jumps.
     * Otherwise, the end boss watches the character.
     */
    reactionEndbossLeftSide() {
        this.otherDirection = false;
        if (this.farDistanceLeft()) {
            this.moveLeft();
            this.isWalking();
            if (this.nearDistanceLeft() && !this.isAboveGround()) {
                this.jumpChicken();
            }
        } else {
            this.isWatching();
        } 
    }

    /**
     * Handles the end boss's reaction when the character is on its right side.
     * If the character is within a far distance on the right, the end boss moves right and walks.
     * If the character is near and not above the ground, the end boss jumps.
     * Otherwise, the end boss watches the character.
     */ 
    reactionEndbossRightSide() {
        this.otherDirection = true;
        if (this.farDistanceRight()) {
            this.moveRight();
            this.isWalking();
            if (this.nearDistanceRight() && !this.isAboveGround()) {
                this.jumpChicken();
            }
        } else {
            this.isWatching();
        }
    }
}