class Chicken extends MovableObject {
    offset = {top: 4, bottom: 6, left: 0, right: 0};
    y = 350;
    height = 80;
    width = 80;
    speed = 0.15;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 400 + Math.random() * 14000;
        this.speed = this.speed + Math.random() * 0.5;
        this.randomBoolean = Math.random() < 0.5;
        this.intervalId = null;
        this.applyGravity();
    }

    animate() {
        this.intervalId = setInterval(() => {
            this.moveLeft();
            this.handleChickenJump();
        }, 1000 / 60);
        
        setInterval(() => {
            this.handleCharacterStateAnimation();
        }, 200);
    }

    /**
     * Handles the jump logic for small chickens.
     * 
     * This function checks if the current object is an instance of `SmallChicken`, if it's on the ground, 
     * and if a random condition (`randomBoolean`) is true. If all conditions are met, the chicken will jump.
     * 
     * @this {Object} The context object, which should be a `SmallChicken` instance, 
     * containing methods like `isAboveGround` and `jumpChicken`, and a property `randomBoolean`.
     */
    handleChickenJump() {
        if(this instanceof SmallChicken && !this.isAboveGround() && this.randomBoolean) {
            this.jumpChicken();
        }
    }

    /**
    * Plays the appropriate animation based on the character's state (dead or walking).
    * 
    * This function checks if the character is dead and loads the "dead" image. 
    * If the character is not dead, it plays the walking animation.
    * 
    * @this {Object} The context object containing methods like `isDead`, `loadImage`, and `playAnimation`,
    * and properties like `IMAGE_DEAD` and `IMAGES_WALKING`.
    */
    handleCharacterStateAnimation() {
        if (this.isDead()) {
            this.loadImage(this.IMAGE_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
}


class SmallChicken extends Chicken {
    offset = {top: 4, bottom: 3, left: 9, right: 4};
    y = 360;
    height = 55;
    width = 55;
    speed = 2;
  
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
    }
}