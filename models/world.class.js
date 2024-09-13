class World {
    level = level1;
    camera_x = 0;
    throwableObjects = [];

    constructor(canvas, keyboard, touch) {
        this.character = new Character(this);
        this.throwableObject = new ThrowableObject(this);
        this.audio = new AudioManager();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.touch = touch;

        this.draw();
        this.setWorld();
        this.run();
        this.runslowly();
    }

    /*
    * Sets the world proberties of character.
    */
    setWorld() {
        this.character.world = this;
    }

    /*
    * Starts the game loop. 
    */
    run() {
        setInterval(() => {
            this.character.takesABreak();
            this.checkCollisionsWithEnemies();
            this.checkCollisionsWithItems();
            this.checkEnemyIsOutOfTheScreen();
            this.checkCollisionBottleWithEnemies();
        }, 1000/25);
    }

    /*
     * Starts the game loop more slowly. 
    */
    runslowly() {
        setInterval(() => { 
            this.checkThrowObjects();
        }, 150);
    }

    /**
     * Checks for collisions between the character and enemies, and handles them accordingly.
     */
    checkCollisionsWithEnemies() {
        this.level.enemies.forEach((enemy) => {
            this.checkAndHandleCollision(enemy);

            if (this.canPepeJumpOnEnemy(enemy)) {
                this.handlePepeJumpOnEnemy(enemy);
            } 
        });
    }

    /**
     * Checks for collisions between the character and items like coins or bottles,
     * and handles the collection of those items.
     */
    checkCollisionsWithItems() {
        this.level.items.forEach((item) => {
            if (this.character.isColliding(item)) {
                this.handleCollectedCoins(item);
                this.handleCollectedBottles(item);
                }
            });
        }

    /**
     * Plays a sound, adds a coin to the character's inventory, and updates the status bar.
     * @param {Object} item - The collected coin object.
     */
    playSoundAddAndShowCoins(item) {
        this.character.addCollectedCoin();  
        this.playAddDeletedItems(item, 'collectedCoin', 1);
    }

    /**
     * Plays a sound, adds a bottle to the character's inventory, and updates the status bar if fewer than 5 bottles are collected.
     * @param {Object} item - The collected bottle object.
     */
    playSoundAddAndShowBottles(item) {
        if (this.character.collectedBottles < 5) {
            this.character.addCollectedBottle();
            this.playAddDeletedItems(item, 'collectedBottle', 2);
        }
    }

    /**
     * Plays a sound, deletes the collected item from the game, and updates the status bar.
     * @param {Object} item - The item to be removed.
     * @param {string} collectedItem - The sound associated with the collected item.
     * @param {number} xpercent - The index of the status bar element to update.
     */
    playAddDeletedItems(item, collectedItem, xpercent) {
        this.audio.playSound(collectedItem);
        this.deleteSelectedObj(0, item);
        this.changeContentStatusBar(xpercent);
    }

    /**
     * Removes the specified object from the relevant array in the game.
     * @param {number} i - The index of the array (0 for items, 1 for enemies, 2 for throwable objects).
     * @param {Object} obj - The object to remove from the array.
     */
    deleteSelectedObj(i, obj) {
        const path = [this.level.items, this.level.enemies, this.throwableObjects];
 
        path[i].splice(path[i].indexOf(obj), 1);
    }

    /**
     * Checks if any enemies have moved off-screen and removes them from the game.
     */
    checkEnemyIsOutOfTheScreen() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.enemyIsOutOfScreen(enemy)) {
                this.level.enemies.splice(i, 1);
            }
        });
    }

    /**
     * Updates the percentage value in the status bar based on the character's current state.
     * @param {number} i - The index of the status bar element to update (0 for energy, 1 for coins, 2 for bottles, 3 for endboss energy).
     */
    changeContentStatusBar(i) {
        const status = [this.character.energy, this.character.collectedCoins, this.character.collectedBottles * 20, world.level.enemies[0].energy];

        this.level.statusBar[i].setPercentage(status[i]);
    }

    /**
     * Checks if the 'D' key is pressed and if the character has collected any bottles.
     * If so, it reduces the bottle count, updates the status bar, and throws a bottle.
     */
    checkThrowObjects() {
        if (keyboard.D && this.character.hasCollectedBottles()) {
            this.character.reduceBottleCount();
            this.changeContentStatusBar(2);
            this.bottleFliesToLeftOrRight();
            this.deleteThrowObject();
            this.character.isBored = true;
        }
    }

    /**
     * Checks for collisions between throwable objects (like bottles) and enemies, 
     * and handles those collisions accordingly.
     */
    checkCollisionBottleWithEnemies() {
        if (this.throwableObjects.length !== 0 && this.character.killOneChicken) {         
            this.level.enemies.forEach((enemy) => {
                for (let i = 0; i < this.throwableObjects.length; i++) {
                    this.handleCollisionWithEnemy(this.throwableObjects[i], enemy);
                }
            });
        } 
    }

    /**
     * Clears the canvas, translates the camera, and draws all game objects onto the map.
     * This function is called repeatedly via `requestAnimationFrame`.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.statusBar);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.items);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();            
        });
    }

    /**
     * Adds an array of objects to the canvas by calling `addToMap` for each object.
     * @param {Array} objects - The array of objects to add to the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a map object on the canvas, flipping the image horizontally if necessary.
     * @param {Object} mo - The map object to be drawn.
     */
    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
       
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally before drawing it to the canvas.
     * @param {Object} mo - The map object whose image needs to be flipped.
     */    
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image's original orientation after drawing it to the canvas.
     * @param {Object} mo - The map object whose image needs to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Handles a collision between the character and an enemy, reducing the character's health and updating the status bar.
     * @param {Object} enemy - The enemy involved in the collision.
     */
    checkAndHandleCollision(enemy) {
        if (this.character.isColliding(enemy) && this.character.pepeIsOnTheGround()) {
            this.character.hit();
            this.changeContentStatusBar(0);
        }
    }

    /**
     * Checks if the character can jump on the enemy and return true if conditions are met.
     * @param {Object} enemy - The enemy to be jumped on.
     * @returns {boolean} - Returns true if the character is above the enemy and can jump on them.
     */
    canPepeJumpOnEnemy(enemy) {
        return this.character.pepeIsUp && this.character.isColliding(enemy) && this.character.y > 65 && !(enemy instanceof Endboss);
    } 

    /**
     * Handles the event when the character successfully jumps on an enemy.
     * @param {Object} enemy - The enemy that was jumped on.
     */
    handlePepeJumpOnEnemy(enemy) {
        this.stopAnimationFromDeadChicken(enemy);
        enemy.chickenIsDead();
        this.character.jumpOfEnemy();
        this.playSoundPepeJumpOfChicken();
        this.character.peppeFellToTheGround();
        this.deleteEnemy(enemy);
    }

    /**
     * Handles the collection of coins.
     * @param {Object} item - The collected item.
     */
    handleCollectedCoins(item) {
        if (item instanceof Coin) {
            this.playSoundAddAndShowCoins(item); 
        }
    }

    /**
     * Handles the collection of bottles.
     * @param {Object} item - The collected item.
     */
    handleCollectedBottles(item) {
        if (item instanceof VerticalBottle | item instanceof LeftBottle | item instanceof RightBottle) {
            this.playSoundAddAndShowBottles(item);
        }
    }

    /**
     * Stops the animation of a dead chicken and resets its position.
     * @param {Object} enemy - The enemy object to be checked.
     * @param {SmallChicken} enemy - An instance of the SmallChicken class.
     */
    stopAnimationFromDeadChicken(enemy) {
        if (enemy instanceof SmallChicken) {
            clearInterval(enemy.intervalId);
            return enemy.y = 360; 
        }
    }

    /**
     * Plays a sound effect for Pepe jumping off a chicken.
     */
    playSoundPepeJumpOfChicken() {
        this.audio.playSound('jumpedOfChicken');
    }

    /**
     * Deletes the specified enemy if Pepe is in the 'up' state.
     * @param {Object} enemy - The enemy object to be deleted.
     * @param {SmallChicken|Endboss} enemy - An instance of either the SmallChicken or Endboss class.
     */
    deleteEnemy(enemy) {
        if (this.character.pepeIsUp) {
            setTimeout(() => {
                this.deleteSelectedObj(1, enemy);
            }, 750);
            this.character.pepeIsUp = false;
        }
    }

    /**
     * Checks if the enemy is out of the screen bounds.
     * @param {Object} enemy - The enemy object to be checked.
     * @param {SmallChicken|Endboss} enemy - An instance of either the SmallChicken or Endboss class.
     * @returns {boolean} - True if the enemy is out of the screen, otherwise false.
     */
    enemyIsOutOfScreen(enemy) {
        return enemy.x < -200;
    }

    /**
     * Creates and adds a throwable object to the list of throwable objects based on character's direction.
     */
    bottleFliesToLeftOrRight() {
        if (!this.character.directionRight()) {
            let bottle = new ThrowableObject(this.character.x + 75, this.character.y + 120, 15);
            this.throwableObjects.push(bottle);
        } else {
            let bottle = new ThrowableObject(this.character.x - 25, this.character.y + 120, -15);
            this.throwableObjects.push(bottle);
        }
    }
    
    /**
     * Deletes throwable objects after a delay.
     */
    deleteThrowObject() {
        setTimeout(() => {
            this.deleteSelectedObj(2, ThrowableObject);
        }, 1750);
    }

    /**
     * Handles collision between a throwable object and an enemy.
     * @param {ThrowableObject} throwableObject - The throwable object involved in the collision.
     * @param {Object} enemy - The enemy object involved in the collision.
     * @param {SmallChicken|Endboss} enemy - An instance of either the SmallChicken or Endboss class.
     */
    handleCollisionWithEnemy(throwableObject, enemy) {
        if (throwableObject.isColliding(enemy)) {
            if (enemy instanceof Endboss && this.character.killOneChicken == true) {
                this.handleCollisionWithEndboss(enemy);
            } else if (!(enemy instanceof Endboss)) {
                this.handleCollisionWithNormalEnemy(enemy);
            }
        }
    }
    
    /**
     * Handles collision with a normal enemy (e.g., SmallChicken).
     * @param {Object} enemy - The enemy object involved in the collision.
     * @param {SmallChicken} enemy - An instance of the SmallChicken class.
     */
    handleCollisionWithNormalEnemy(enemy) {
        enemy.chickenIsDead();
        setTimeout(() => {
            this.deleteSelectedObj(1, enemy);
        }, 750);
        this.character.killOneChicken = false;
    }
    
    /**
     * Handles collision with an endboss.
     * @param {Object} enemy - The enemy object involved in the collision.
     * @param {Endboss} enemy - An instance of the Endboss class.
     */
    handleCollisionWithEndboss(enemy) {
        console.log(world.level.enemies[0].energy);
        enemy.hitEndboss();
        this.changeContentStatusBar(3);
        this.character.killOneChicken = false;   
    }
}