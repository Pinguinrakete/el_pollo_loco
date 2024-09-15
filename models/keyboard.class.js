class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    SPACE = false;
    D = false;
    M = false;
}

/**
 * Handles keyboard events for game controls.
 * 
 * @param {KeyboardEvent} e - The keyboard event.
 */
window.addEventListener("keydown", (e) => {
    if(e.key === 'ArrowRight') {
        keyboard.RIGHT = true;
        e.preventDefault();
    }

    if(e.key === 'ArrowLeft') {
        keyboard.LEFT = true;
        e.preventDefault();
    }

    if(e.key === 'ArrowUp') {
        keyboard.UP = true;
        e.preventDefault();
    }

    if(e.key === 'd') {
        keyboard.D = true;
        e.preventDefault();
    }

    if(e.key === 'm') {
        keyboard.M = true;
        e.preventDefault();
    }

    if(e.key === 'f') {
        openFullscreen();
        e.preventDefault();
    }

    if(e.key === 'Escape') {
        closeFullscreen();
        e.preventDefault();
    }
}, { passive: false });

/**
 * Handles keyboard key release events for game controls.
 * 
 * @param {KeyboardEvent} e - The keyboard event.
 */
window.addEventListener("keyup", (e) => {
    if(e.key === 'ArrowRight') {
        keyboard.RIGHT = false;
        e.preventDefault();
    }

    if(e.key === 'ArrowLeft') {
        keyboard.LEFT = false;
        e.preventDefault();
    }

    if(e.key === 'ArrowUp') {
        keyboard.UP = false;
        e.preventDefault();
    }

    if(e.key === 'd') {
        keyboard.D = false;
        e.preventDefault();
    }

    if(e.key === 'm') {
        keyboard.M = false;
        e.preventDefault();
    }
}, { passive: false });

/**
 * Handles touch start events for game controls.
 * 
 * @param {TouchEvent} e - The touch event.
 */
window.addEventListener("touchstart", (e) => {
    if(e.target.id === 'touch-right') {
        keyboard.RIGHT = true;
        e.preventDefault();
    }

    if(e.target.id === 'touch-left') {
        keyboard.LEFT = true;
        e.preventDefault();
    }

    if(e.target.id === 'touch-up') {
        keyboard.UP = true;
        e.preventDefault();
    }

    if(e.target.id === 'touch-d') {
        keyboard.D = true;
        e.preventDefault();
    }

    if(e.target.id === 'start-game') {
        startGame();
    }
}, { passive: false });

/**
 * Handles touch end events for game controls.
 * 
 * @param {TouchEvent} e - The touch event.
 */
window.addEventListener("touchend", (e) => {
    if(e.target.id === 'touch-right') {
        keyboard.RIGHT = false;
        e.preventDefault();
    }

    if(e.target.id === 'touch-left') {
        keyboard.LEFT = false;
        e.preventDefault();
    }

    if(e.target.id === 'touch-up') {
        keyboard.UP = false;
        e.preventDefault();
    }

    if(e.target.id === 'touch-d') {
        keyboard.D = false;
        e.preventDefault();
    }
}, { passive: false });
