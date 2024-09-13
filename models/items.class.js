class Items extends DrawableObject {
    height = 80;
    width = 100;

    constructor() {
        super();
    }
}


class Coin extends Items {
    offset = {top: 42, bottom: 42, left: 42, right: 42};
    height = 130;
    width = 130;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    } 

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 450);
    }
}


class LeftBottle extends Items {
    offset = {top: 13, bottom: 0, left: 42, right: 20};

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
    }
}


class VerticalBottle extends Items {
    offset = {top: 10, bottom: 0, left: 38, right: 38};

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
    }
}


class RightBottle extends Items {
    offset = {top: 13, bottom: 0, left: 30, right: 32};
    
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
    }
}