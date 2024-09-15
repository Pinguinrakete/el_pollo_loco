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
    addMenuIcon();
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
    removeMenuIcon();
    clearImpressum();
    clearAllIntervals();
    loadScreen(path);
    setTimeout(() => {document.getElementById('bg-picture-canvas').style.backgroundImage = "url('./img/9_intro_outro_screens/game_over/game over.png')";}, 3000);
    setTimeout(() => {addEndscreen()}, 3000);
    setTimeout(() => {world.audio.resetAllSounds()}, 4000);
}