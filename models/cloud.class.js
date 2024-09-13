class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 1000;
    speed = 1.5;

    constructor(deltaStartpoint){
        super().loadImage('img/5_background/layers/4_clouds/full.png');
        this.x = 500 + deltaStartpoint;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.resetCloudPosition();
        }, 1000 / 25);
    }

    /**
     * Resets the position of clouds that move off-screen.
     *
     * @this {Object} The context object containing the `world` and `clouds` array.
     */
    resetCloudPosition() {
        world.level.clouds.forEach(cloud => {
            if (cloud.x < -1000) {
                cloud.x = 1000;
            }
        });
    }
}