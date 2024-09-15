class Character extends MovableObject {
    offset = {top: 108, bottom: 14, left: 13, right: 26};
    x = 120;
    y = 143;
    height = 280;
    width = 100;
    speed = 10;
    isJumping = false;
 
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);

        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.pepeIsUp = false;
        this.loadOnce = true;
        this.killOneChicken = true;
        this.animate();
        this.applyGravity();
        
        this.touchRight = document.getElementById('touch-right');
        this.touchLeft = document.getElementById('touch-left');
        this.touchUp = document.getElementById('touch-up');
        this.touchD = document.getElementById('touch-d');
    }

    
    animate() {
        setInterval(() => {
            this.pauseSoundIsWalking();
            this.moveRightAndAnimationControlBar();
            this.moveLeftAndAnimationControlBar();
            this.moveUpJumpAndAnimationControlBar();
            this.animationPushArrowUpLongerControlBar();
            this.animationPushDControlBar(); 
            this.pepeIsUpOrDown();
            this.loadEndbossStatusBar();
            this.playSoundIfPeppeHurt();
            this.nowYouCanLoadBottles();
            this.loadNewBottles();
            this.cameraAndPeppeMoved();
            this.pepeIsOnLine();
        }, 1000 / 60);


        setInterval(() => {
            this.updateCharacterAnimation();
        }, 50);

        let timer;
        setInterval(() => {
            this.manageAnimationByTimer(timer);
        }, 350);
    }

    /**
     * Updates the character's animation based on its current state.
     * 
     * This function handles the following states:
     * - If the character is dead, it plays the "dead" animation, plays a sound, and shows the game over screen after a delay.
     * - If the character is hurt, it plays the "hurt" animation.
     * - If the character is in the air, it plays the "jumping" animation.
     * - If the character is moving left or right, it plays the "walking" animation.
     * 
     * @function
     * @this {Object} The context object, which should have methods and properties like `playAnimation`, `isDead`, `isHurt`, `isAboveGround`, `IMAGES_*`, and `world`.
     */
    updateCharacterAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {this.world.audio.playSound('you_lost')}, 1000);
            setTimeout(() => {endScreen('game_over/oh no you lost!')}, 1000);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround() && !this.isJumping) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.isJumping = true;
        } else {
            this.isJumping = false;
        
            if (keyboard.RIGHT || keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    /**
    * Updates the animations based on the current timer value.
    * 
    * The function checks the timer and adjusts the animations accordingly:
    * - If the timer is less than 3, it displays the walking animation and pauses the "isSnoring" sound.
    * - If the timer is between 4 and 7, it displays the idle animation.
    * - If the timer is greater than 8, it displays the long idle animation and plays the "isSnoring" sound.
    * 
    * @function
    * @this {Object} The context object on which the method is called, containing properties like `timer`, `world`, `loadImage`, `playAnimation`, and `IMAGES_*`.
    */
    manageAnimationByTimer(timer) {
        timer = this.timer();

        if (timer < 3) {
            this.world.audio.sounds['isSnoring'].pause();
            this.loadImage(this.IMAGES_WALKING[0]);
        } else if (timer > 2 && timer < 5) {
            this.playAnimation(this.IMAGES_IDLE);
        } else if (timer > 6) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            this.world.audio.playSound('isSnoring');
        }    
    }

    /**
     * Styles the touch buttons on the control bar based on whether they are pressed or not.
     * 
     * @param {boolean} isPushed - Indicates whether the button is pressed or not.
     * @param {string} i - The button type ("left", "right", "up", "D").
     */
    styleTouchBtn(isPushed, i) {
        const orientation = {"left": 0, "right": 1, "up": 2, "D": 3};
        const button = [this.touchLeft, this.touchRight, this.touchUp, this.touchD][orientation[i]];
    
        button.style.transform = isPushed ? "scale(1.1)" : "scale(0.85)";
        button.style.filter = isPushed ? "invert(80%) sepia(72%) saturate(739%) hue-rotate(14deg) brightness(109%) contrast(102%)" : "";
    }

    /**
     * Checks if no movement-related keys are being pressed.
     * If none are pressed, marks the character as idle.
     */
    takesABreak() {
        if (!keyboard.UP || !keyboard.LEFT || !keyboard.RIGHT || !keyboard.DOWN || !keyboard.SPACE || !keyboard.D) {
            this.counterIsIdle();
        }
    }

    /**
     * Pauses the "walking" sound.
     */
    pauseSoundIsWalking() {
        this.world.audio.sounds['isWalking'].pause();
    }

    /**
     * Moves the character to the right and manages animations and the control bar.
     */
    moveRightAndAnimationControlBar() {
        if (keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.world.audio.playSound('isWalking');
            this.isBored = true;
            this.styleTouchBtn(true,'right'); 
            } else {
            this.styleTouchBtn(false,'right');
        } 
    }

    /**
     * Moves the character to the left and manages animations and the control bar.
     */
    moveLeftAndAnimationControlBar() {
        if (keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.world.audio.playSound('isWalking');
            this.isBored = true;
            this.styleTouchBtn(true,'left'); 
            } else {
            this.styleTouchBtn(false,'left');
        }
    }

    /**
     * Makes the character jump and manages animations and the control bar.
     */
    moveUpJumpAndAnimationControlBar() {
        if (keyboard.UP && !this.isAboveGround() && !this.isJumping) {
            this.jump();
            this.isBored = true;
            this.styleTouchBtn(true,'up');   
            setTimeout(() => {
                this.styleTouchBtn(false,'up');               
            }, 500);
        }
    }

    /**
     * Resets the "up" button styling when it's no longer pressed.
     */
    animationPushArrowUpLongerControlBar() {
    if (!keyboard.UP) {
        this.styleTouchBtn(false,'up'); 
        }
    }

    /**
     * Activates or deactivates the "D" button and sets the flag to kill a chicken.
     */
    animationPushDControlBar() {
        if (keyboard.D) {
            this.killOneChicken = true;
            this.styleTouchBtn(true,'D'); 
            } else {
            this.styleTouchBtn(false,'D'); 
        }
    }

    /**
     * Loads the endboss status bar if it should be displayed.
     */
    loadEndbossStatusBar() {
        if (this.endbossScene() & !level1.statusBar[3]) {
            level1.statusBar.push(new EndbossBar(-2));
        }   
    }

    /**
     * Plays the "ouch" sound if the character is hurt.
     */
    playSoundIfPeppeHurt() {
        if (this.isHurt()) {
            this.world.audio.playSound('ouch');
        }
    }

    /**
     * Allows new bottles to be loaded when the character is near a specific location.
     */
    nowYouCanLoadBottles() {
        if (this.x > 1985 & this.x < 2000) {
            this.loadOnce = true;
        }
    }

    /**
     * Loads new bottles if all bottles have been collected and the character is in the right location.
     */
    loadNewBottles() {
        if (this.allBottlesAreCollected() && this.x > 6500 && this.loadOnce) {
            fillItems(1);  
            this.loadOnce = false;
        }
    }

    /**
     * Makes the camera follow the character.
     */
    cameraFollowPepe() {
        this.world.camera_x = -this.x + 100;
    }
    
    /**
     * Moves the camera and the character based on their positions and inputs.
     */
    cameraAndPeppeMoved() {
        if (this.x < 6530) {
            this.cameraFollowPepe();
        } else {
            this.world.camera_x = -6430;
            if(keyboard.RIGHT && this.pepeIsNotAtTheEndFromTheScreen()) {
                this.otherDirection = false;
                this.moveRight();
            } else {
                this.pepeMovedLeft();
            }
        }
    }

    /**
     * Moves the character to the left if the left arrow key is pressed.
     */
    pepeMovedLeft() {
        if (keyboard.LEFT) {
            this.otherDirection = true;
        }
    }

    /**
     * Checks if the character is still at the edge of the screen.
     * 
     * @returns {boolean} - True if the character is not at the edge of the screen.
     */
    pepeIsNotAtTheEndFromTheScreen() {
        return this.x < 7070;
    }

    /**
     * Checks if the character is above or below the ground.
     */
    pepeIsUpOrDown() {
        if (this.y < 0) {
            this.pepeIsUp = true;
        } else if (this.y > 140) {
            this.pepeIsUp = false;
        }
    }

    /**
     * Checks if the character has collected any bottles.
     * @returns {boolean} - True if the character has collected bottles, otherwise false.
     */
    hasCollectedBottles() {
        return this.collectedBottles > 0;
    }

    /**
     * Reduces the count of collected bottles by one.
     */
    reduceBottleCount() {
        this.collectedBottles -= 1;
    }

    /**
     * Checks if the character is on the ground by comparing their y-coordinate.
     * @returns {boolean} - Returns true if the character's y-coordinate is equal to 155.
     */
        pepeIsOnTheGround() {
            return this.y == 143;
        }
    
    /**
     * Ensures the character stays on the ground by setting their y-coordinate to 155 if they fall.
     */
    peppeFellToTheGround() {
        setInterval(() => { 
            if (this.y > 155) {
                this.y = 143; 
            }
        }, 25);
    }
}