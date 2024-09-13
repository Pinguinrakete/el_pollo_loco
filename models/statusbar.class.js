class Bar extends DrawableObject {
    percentage = 100;

    constructor() {
        super();
        this.x = 5;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Sets the percentage value and updates the image based on the new percentage.
     * The image is selected from the `imageCache` using the resolved image index.
     *
     * @param {number} percentage - The current percentage to set, which determines the image to display.
     */
    setPercentage(percentage) {
        this.percentage = percentage; 
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current percentage.
     * Returns different index values depending on the percentage range:
     * - 100%: Returns index 5.
     * - 80-99%: Returns index 4.
     * - 60-79%: Returns index 3.
     * - 40-59%: Returns index 2.
     * - 20-39%: Returns index 1.
     * - 0-19%: Returns index 0.
     *
     * @returns {number} - The index of the image to use, depending on the percentage value.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 79){
            return 4;
        } else if (this.percentage > 59){
            return 3;
        } else if (this.percentage > 39){
            return 2;
        } else if (this.percentage > 19){
            return 1;
        } else {
            return 0;
        }
    }
}


class HealthBar extends Bar {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'    
    ];

    constructor(y) {
        super().loadImages(this.IMAGES);
        this.y = y;
        this.setPercentage(100);
    }
}


class CoinBar extends Bar {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'    
    ];

    constructor(y) {
        super().loadImages(this.IMAGES);
        this.y = y;
        this.setPercentage(0);
    }
}


class BottleBar extends Bar {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'   
    ];
   
    constructor(y) {
        super().loadImages(this.IMAGES);
        this.y = y;
        this.setPercentage(0);
    }
}


class EndbossBar extends Bar {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'   
    ];
       
    constructor(y) {
        super().loadImages(this.IMAGES);
        this.x = 260;
        this.y = -3;
        this.setPercentage(100);
    }
}