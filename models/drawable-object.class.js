class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image from the specified path and assigns it to the `img` property.
     * 
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
   
    /**
     * Loads multiple images and caches them for later use.
     * 
     * @param {Array<string>} arr - An array of image file paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }

    /**
    *  Plays an animation for the object. 
    *  @param {Array} images - Array of image paths for the animation. 
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}