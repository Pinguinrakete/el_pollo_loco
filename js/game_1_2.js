let canvas;
let world;
let keyboard = new Keyboard();

let soundsOn = true;
let backgroundMusicOn = false;
let backgroundMusic = new Audio('./audio/music/mariachi.mp3');

/**
 * Initializes and starts the game by removing the start button, adding the loading screen,
 * creating the level, and loading all necessary elements like the canvas and game world.
 * After everything is set, the game begins.
 */
function startGame() {
    removeStartButton();
    addLoading();
    addCanvas();
    createLevel();  
    loadCanvasandWorld();
    addObjectsToTheLevel();
    visibleDashboardButtons();
    soundsMuteOrUnmute();
    start();
}

/**
 * Continuously checks if all necessary images for the game have been loaded.
 * Once the images are fully loaded, it removes the loading screen, starts the movement of clouds and enemies,
 * and begins the game. This function uses an interval to check the image loading status.
 */
function start() {
    let stopInterval = setInterval(() => {
        if (loadAllImages()) {
            addOpacityBackground(0);
            startMovingCloudsAndEnemies();
            removeLoading();
            clearInterval(stopInterval);
        } 
    }, 500);
}

/**
 * Checks if all the required images in the game are fully loaded by accessing the last enemy's image.
 * This ensures that no visual assets are missing before the game begins.
 *
 * @returns {boolean} True if the images are fully loaded, false otherwise.
 */
function loadAllImages() {
    return world.level.enemies[world.level.enemies.length - 1]
        .imageCache['img/3_enemies_chicken/chicken_small/1_walk/3_w.png'].complete;
}

/**
 * Loads the canvas element and initializes the world object.
 */
function loadCanvasandWorld() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Starts the animations for moving clouds and enemies.
 */
function startMovingCloudsAndEnemies() {
    startMovingClouds();
    startMovingEnemies();
}

/**
 * Starts the animation for the clouds in the world.
 */
function startMovingClouds() {
    world.level.clouds[0].animate();  
    world.level.clouds[1].animate();
}

/**
 * Starts the animation for enemies in the world.
 */
function startMovingEnemies() {
    for (let i = 1; i < world.level.enemies.length; i++) {
        world.level.enemies[i].animate();
    }
}

/**
 * Clears all intervals and timeouts that were set.
 */
function clearAllIntervals() {
	for(let i = 0; i < 100000; i++) {
		clearInterval(i);
		clearTimeout(i);
    }
}

/**
 * Starts the game, displaying the main screen and control elements.
 */
function play() {
    removeEndscreen();
    addNavbarLeftUp();
    removeButtonsDataProtection();
    loadScreen('start/startscreen_1');
    removeLoading();
    addStartButton();
    addControlBar();
    removeImpressum();
}

/**
 * Displays information about the game, including the start screen and data protection buttons.
 */
function information() {
    addShadowOnButton();
    addButtonsDataProtection();
    loadScreen('start/startscreen_1');
    removeStartButton();
    removeControlBar()
    removeImpressum();
}

/**
 * Displays the legal notice screen, hiding other elements.
 */
function legalNotice() {
    removeShadowOnButton();
    addOpacityBackground(0.5);
    removeStartButton();
    removeAndClearCanvas();
    addImpressum('textLegalNotice');
}

/**
 * Displays the privacy policy screen, hiding other elements.
 */
function privacyPolicy() {
    removeShadowOnButton();
    addOpacityBackground(0.5);
    removeStartButton();
    removeAndClearCanvas();
    addImpressum('textPrivacy-policy');
}

/**
 * Displays the keyboard trait screen, hiding other elements.
 */
function traitKeyboard() {
    removeButtonsDataProtection();
    removeStartButton();
    removeControlBar()
    clearImpressum();
    loadScreen('start/trait-keyboard');
}

/**
 * Sets the background opacity to a specified value.
 * 
 * @param {number} value - The opacity value (0 to 1).
 */
function addOpacityBackground(value) {
    document.getElementById('bg-picture-canvas').style.backgroundSize = "100% 100%";
    document.getElementById('bg-picture-canvas').style.background = `rgba(0,0,0,${value})`;
}

/**
 * Adds the impressum section to the page with the specified content.
 * 
 * @param {string} content - The content to be loaded into the impressum.
 */
function addImpressum(content) {
    document.getElementById('impressum').classList.remove('d-none');
    clearImpressum();
    loadPrivacyPolicyJSON('impressum', content);
}

/**
 * Hides and clears the impressum section.
 */
function removeImpressum() {
    document.getElementById('impressum').classList.add('d-none');
    clearImpressum();
}

/**
 * Adds a shadow effect to the legal notice and privacy policy buttons.
 */
function addShadowOnButton() {
    document.getElementById('legal-notice').classList.add('button-dp-shadow');
    document.getElementById('privacy-policy').classList.add('button-dp-shadow');
}

/**
 * Removes the shadow effect from the legal notice and privacy policy buttons.
 */
function removeShadowOnButton() {
    document.getElementById('legal-notice').classList.remove('button-dp-shadow');
    document.getElementById('privacy-policy').classList.remove('button-dp-shadow');
}

/**
 * Displays the start button.
 */
function addStartButton() {
    document.getElementById('startgame').classList.remove('d-none');
}

/**
 * Hides the start button.
 */
function removeStartButton() {
    document.getElementById('startgame').classList.add('d-none');
}

/**
 * Add the endscreen with buttons.
 */
function addEndscreen() {
    document.getElementById('endscreen').classList.remove('d-none');
}

/**
 * Remove the endscreen with buttons.
 */
function removeEndscreen() {
    document.getElementById('endscreen').classList.add('d-none');
}

/**
 * Displays the data protection buttons.
 */
function addButtonsDataProtection() {
    document.getElementById('data-protection').classList.remove('d-hidden');
}

/**
 * Hides the data protection buttons.
 */
function removeButtonsDataProtection() {
    document.getElementById('data-protection').classList.add('d-hidden');
}

/**
 * Displays the left navigation bar.
 */
function addNavbarLeftUp() {
    document.getElementById('navbar-left').classList.remove('d-hidden');
    document.getElementById('menu-icon').classList.add('d-hidden');
}

/**
* This function targets the element with the ID 'menu-icon' and removes the 'd-hidden' class,
* ensuring that the menu icon becomes visible.
 */
function addMenuIcon() {
    document.getElementById('menu-icon').classList.remove('d-hidden');
}

/**
* This function targets the element with the ID 'menu-icon' and adds the 'd-hidden' class,
* ensuring that the menu icon becomes visible.
 */
function removeMenuIcon() {
    document.getElementById('menu-icon').classList.add('d-hidden');
}


/**
 * Displays the control bar.
 */
function addControlBar() {
    document.getElementById('control-bar').classList.remove('d-none');
}

/**
 * Hides the control bar.
 */
function removeControlBar() {
    document.getElementById('control-bar').classList.add('d-none');
}

/**
 * Clears the content of the impressum section.
 */
function clearImpressum() {
    document.getElementById('impressum').innerHTML = '';
}

/**
 * Displays the canvas element.
 */
function addCanvas() {
    document.getElementById('canvas').classList.remove('d-none');
}

/**
 * Hides and clears the canvas element and resets the world and level.
 */
function removeAndClearCanvas() {
    document.getElementById('canvas').classList.add('d-none');
    world = null;
    level1 = null;
}

/**
 * Displays the loading screen.
 */
function addLoading() {
    document.getElementById('loading').classList.remove('d-none');
}

/**
 * Hides the loading screen.
 */
function removeLoading() {
    document.getElementById('loading').classList.add('d-none');
}

/**
 * Restarts the game by resetting the game state, reloading necessary assets, and starting a new game session.
 *
 * This function removes any end or start screens, adds the loading screen, reinitializes the canvas and 
 * game world, loads the level, and ensures that all game elements (like objects and UI components) are 
 * properly displayed and set up. It also manages sound settings (mute/unmute) and begins the game loop.
 */
function restartGame() {
    removeStartButton();
    removeEndscreen();
    addLoading();
    addCanvas();
    createLevel();  
    loadCanvasandWorld();
    addObjectsToTheLevel();
    visibleDashboardButtons();
    addControlBar();
    soundsMuteOrUnmute();
    start();
}

/**
 * Displays the game over screen and performs necessary cleanup actions.
 *
 * This function sets the background image to the game over screen, clears all running intervals,
 * adds an endscreen UI, and resets all audio in the game. It also applies a semi-transparent 
 * background overlay for visual effect.
 */
function menu() {
    removeMenuIcon();
    removeControlBar();
    addOpacityBackground(0.3);
    clearAllIntervals();
    loadScreen('game_over/game over');
    addEndscreen();
    world.audio.resetAllSounds();
}

/**
 * Toggles sound on and off and updates the icon accordingly.
 */
function sounds() {
    soundsSwitchOnOff();
    soundsMuteOrUnmute();
}

/**
 * Toggles the sound on and off and updates the sound icon.
 */
function soundsSwitchOnOff() {
    if (soundsOn) {
        soundsOn = false;
        document.getElementById('sounds-icon').src = "./img/icons/sounds-mute.png";
    } else {
        soundsOn = true;
        document.getElementById('sounds-icon').src = "./img/icons/sounds.png";
    } 
}

/**
 * Mutes or unmutes all sounds based on the current sound settings.
 */
function soundsMuteOrUnmute() {
    if (world !== undefined) {
        if (soundsOn) {
            world.audio.unmuteAllSounds();
        } else {
            world.audio.muteAllSounds();
        }
    }
}