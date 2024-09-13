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
    // world.audio.resetAllSounds();
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
 * Restarts the game by clearing intervals, hiding elements, and reinitializing the start screen.
 */
function restartGame() {
    world.audio.resetAllSounds();
    clearAllIntervals();
    removeAndClearCanvas();
    addNavbarLeftUp();
    removeButtonsDataProtection();
    loadScreen('start/startscreen_1');
    removeLoading();
    addStartButton();
    removeImpressum();
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
    if (soundsOn) {
        world.audio.unmuteAllSounds();
    } else {
        world.audio.muteAllSounds();
    }
}

/**
 * Toggles background music on and off and updates the speaker icon accordingly.
 */
function bgMusic() {
    if(backgroundMusicOn) {
        backgroundMusic.pause();
        backgroundMusicOn = false;
        document.getElementById('speaker-icon').src = "./img/icons/speaker-mute.png";
    } else {
        backgroundMusic.play();
        backgroundMusic.loop = true;
        backgroundMusicOn = true;
        document.getElementById('speaker-icon').src = "./img/icons/speaker.png";
    }
}

/**
 * Loads privacy policy content from a JSON file and updates the specified element with the content.
 * 
 * @param {string} url - The ID of the element to update.
 * @param {string} content - The key for the content in the JSON file.
 * @returns {Promise<void>}
 */
async function loadPrivacyPolicyJSON(url, content) {
	let response = await fetch('./json-file/privacy-policy.json')
    let respAsJson = await response.json();
    let text = respAsJson[content];

    return document.getElementById(url).innerHTML = text;
}

/**
 * Makes dashboard buttons visible.
 */
function visibleDashboardButtons() {
    document.getElementById('navbar-left').classList.add('d-hidden');
    document.getElementById('restart-icon').classList.remove('d-hidden');
}

/**
 * Loads a screen with the specified path as the background image.
 * 
 * @param {string} path - The path to the background image.
 */
function loadScreen(path) {
    document.getElementById('bg-picture-canvas').style.backgroundSize = "100% 100%";
    document.getElementById('bg-picture-canvas').style.backgroundImage = "url('./img/9_intro_outro_screens/"+path+".png')";
}

/**
 * Displays the end screen with a specified path and restarts the game after a delay.
 * 
 * @param {string} path - The path to the end screen background image.
 */
function endScreen(path) {
    removeControlBar();
    clearImpressum();
    clearAllIntervals();
    loadScreen(path);
    setTimeout(() => {document.getElementById('bg-picture-canvas').style.backgroundImage = "url('./img/9_intro_outro_screens/game_over/game over.png')";}, 3000);
    setTimeout(() => {play()}, 6000);
}