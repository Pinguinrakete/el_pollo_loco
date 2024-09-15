class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;
    otherDirection = false;
    energy = 100;
    collectedCoins = 0;
    collectedBottles = 0;
    lastHit = 0;
    lastHitEndboss = 0;
    isNotWorking = 0;
    isBored = true;
    
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground. 
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 332;
        } else if (this instanceof Character) {
            return this.y < 143;
        } else if (this instanceof SmallChicken) {
            return this.y < 352;
        } else if (this instanceof Endboss) {
            return this.y < 110;
        } 
        // else {
        //     return this.y < 155;
        // }
    }

    /**
     *  Checks if the object is colliding with another object.
     *  @param {MovableObject} mo - The other movable object.
     *  @returns {boolean} True if colliding, otherwise false.
     */
    isColliding(mo) {
         return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left 
            && this.y + this.height - this.offset.bottom > mo.y + mo.offset.top 
            && this.x + this.offset.left < mo.x + mo.width - mo.offset.right 
            && this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom	
        );
    }    

    /**
     * Reduces the character's energy by 5 and records the time of the hit.
     * If the energy goes below 0, it is set to 0.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces the end boss's energy by 20 and records the time of the hit.
     * If the energy goes below 0, it is set to 0.
     */
    hitEndboss() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHitEndboss = new Date().getTime();
        }
    }

    /**
     * Marks the counter as idle by recording the current time.
     * Also sets the `isBored` flag to false after updating the time.
     */
    counterIsIdle() {
        if (this.isBored){
        this.isNotWorking = new Date().getTime();
        this.isBored = false;
        }
    }
  
    /**
     * Calculates the time passed since the last idle state.
     *
     * @returns {number} - The time passed in seconds since the counter became idle.
     */
    timer() {
        let timepassed = new Date().getTime() - this.isNotWorking;
        timepassed = timepassed / 1000;
        return timepassed;
    }

    /**
     * Checks if the character is still hurt by comparing the time since the last hit.
     *
     * @returns {boolean} - Returns true if the time passed since the last hit is less than 1 second.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; 
        return timepassed < 1;
    }

    /**
     * Checks if the end boss is still hurt by comparing the time since the last hit.
     *
     * @returns {boolean} - Returns true if the time passed since the last hit is less than 1 second.
     */
    endbossIsHurt() {
        let timepassed = new Date().getTime() - this.lastHitEndboss;
        timepassed = timepassed / 1000; 
        return timepassed < 1;
    }

    /**
     * Checks if the character's energy is 0, indicating death.
     *
     * @returns {boolean} - Returns true if the character is dead.
     */
    isDead() {
        return this.energy == 0;
    }
    
    /**
     * Moves the character to the right by increasing the X coordinate based on speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the character to the left by decreasing the X coordinate based on speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the character jump by setting a vertical speed.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Makes the enemy jump depending on its type.
     * Small chickens jump only when near the character, and end bosses jump with a set vertical speed.
     */
    jumpChicken() {
        if (this instanceof SmallChicken) {
            if (this.x - world.character.x < 200) {
                this.speedY = 25 * Math.random();
            }
            if (this.y > 360) {
                this.y = 360; 
            }
        }

        if (this instanceof Endboss) {
            this.speedY = 20;
        }
    }
    
    /**
     * Increases the collected coin count by 2.
     *
     * @returns {number} - The updated number of collected coins.
     */
    addCollectedCoin() {
        return this.collectedCoins += 2;
    }

    /**
     * Increases the collected bottle count by 1.
     *
     * @returns {number} - The updated number of collected bottles.
     */
    addCollectedBottle() {
        return this.collectedBottles += 1;
    }

    /**
     * Marks the chicken as dead by setting its energy and speed to 0.
     */
    chickenIsDead() {
        this.energy = 0;
        this.speed = 0;
    }
    
    /**
     * Makes the enemy jump by setting a vertical speed.
     */
    jumpOfEnemy() {
        this.speedY = 25;
    }

    /**
     * Checks if the bottle is still in the air (not on the ground).
     *
     * @returns {boolean} - Returns true if the bottle is above the ground.
     */
    bottleIsNotOnTheGround() {
        return this.y < 330;
    }

    /**
     * Checks if the bottle has splashed on the ground.
     *
     * @returns {boolean} - Returns true if the bottle has hit the ground.
     */
    bottleSplashedOnTheGround() {
        return this.y > 330;
    }

    /**
     * Checks if the character is facing right.
     *
     * @returns {boolean} - Returns true if the character is facing the right direction.
     */
    directionRight() {
        return this.otherDirection;
    }

    /**
     * Checks if all bottles have been collected in the level.
     *
     * @returns {boolean} - Returns true if no bottles remain in the level.
     */
    allBottlesAreCollected() {
        (!level1.items.some(item => [LeftBottle, VerticalBottle, RightBottle].some(bottleType => item instanceof bottleType))) 
            return true;
    }

    /**
     * Checks if the enemy has moved out of the screen (X coordinate equals 150).
     *
     * @returns {boolean} - Returns true if the enemy is out of the screen.
     */
    enemyIsOutOfTheScreen() {
        if (enemy.x == 150) {
           return true;
       }
    }

    /**
     * Keeps the character on the ground by setting the vertical speed to 0 and Y position to 360.
     */
    staysOnTheGround() {
        this.speedY = 0;
        this.y = 360;
    }

    /**
     * Checks if the character has reached the end boss scene (X coordinate equals 6370).
     *
     * @returns {boolean} - Returns true if the character is in the end boss scene.
     */
    endbossScene() {
        if (world.character.x == 6370) {
            return true;
        }
    }
}