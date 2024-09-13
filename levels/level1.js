let level1;

/**
 * An object storing item names and their respective X and Y coordinates.
 * The keys represent the item type and their coordinates in the level.
 */
let koordinatenItems = 
{
    "items": ['Coin', 'LeftBottle', 'VerticalBottle', 'RightBottle'],
    "Coin-X-coordinate": [500, 575, 650, 725, 1200, 1200, 1200, 1250, 1250, 1250, 1600, 1925, 2000, 2075, 2000, 2000, 2500, 2575, 2650, 2725, 3100, 3175, 3250, 3325, 3400, 3250, 3250, 3250, 3800, 3800, 3800, 3850, 3850, 3850, 4200, 4275, 4350, 4350, 4350, 4425, 4700, 4775, 4850, 4925, 5200, 5275, 5350, 5350, 5350, 5425],
    "Coin-Y-coordinate": [100, 70, 70, 100, 40, 90, 140, 40, 90, 140, 20, 40, 40, 40, 90, 140, 100, 70, 70, 100, 310, 310, 310, 310, 310, 40, 90, 140, 40, 90, 140, 40, 90, 140, 100, 100, 55, 100, 145, 100, 100, 70, 70, 100, 100, 100, 55, 100, 145, 100],
    "LeftBottle-X-coordinate": [550, 1550, 2400, 3550],
    "LeftBottle-Y-coordinate": [345, 345, 345, 345],
    "VerticalBottle-X-coordinate": [3000, 5500],
    "VerticalBottle-Y-coordinate": [345, 345],
    "RightBottle-X-coordinate": [1900, 4000, 4025, 5000],
    "RightBottle-Y-coordinate": [345, 345, 345, 345]
};

/**
 * Creates the level and initializes objects such as clouds, end boss, and status bars.
 */
function createLevel() {
    level1 = new Level(
    [
    ],
    [
      new Cloud(0),
      new Cloud(1000)
    ],
    [
      new Endboss(),  
    ],
    [
    ],
      [new HealthBar(-10), new CoinBar(35), new BottleBar(80)]
    );
}

/**
 * Adds objects such as background, items, and enemies to the level.
 */
function addObjectsToTheLevel() {
    fillBackground();
    fillItems(0); // 0 ... load all items or 1 ... load all bottles without coins 
    fillEnemies();
}

/**
 * Fills the background with layers of images.
 */
function fillBackground() {
let j = 2;

    for (let i = -1; i < 10; i++) {
        world.level.backgroundObjects.push(new BackgroundObject("img/5_background/layers/air.png", 719 * i));
        world.level.backgroundObjects.push(new BackgroundObject(`img/5_background/layers/3_third_layer/${j}.png`, 719 * i));
        world.level.backgroundObjects.push(new BackgroundObject(`img/5_background/layers/2_second_layer/${j}.png`, 719 * i));
        world.level.backgroundObjects.push(new BackgroundObject(`img/5_background/layers/1_first_layer/${j}.png`, 719 * i));
        if(j == 2){
            j = 1;
        } else {
            j = 2;
        }
    }
}

/**
 * Adds items to the level based on the provided coordinates in `koordinatenItems`.
 * 
 * @param {number} load - Determines which items to load.
 * 0 loads all items, 1 loads only bottles without coins.
 */
function fillItems(load) {
    for (let i = load + 0; i < koordinatenItems['items'].length; i++) {  
        let itemName = koordinatenItems['items'][i];
        
        for (let j = 0; j < koordinatenItems[`${itemName}-X-coordinate`].length; j++) {  
            let x = koordinatenItems[`${itemName}-X-coordinate`][j];
            let y = koordinatenItems[`${itemName}-Y-coordinate`][j];
            
            if (itemName === 'Coin') {
                world.level.items.push(new Coin(x, y));
            } else if (itemName === 'LeftBottle') {
                world.level.items.push(new LeftBottle(x, y));
            } else if (itemName === 'VerticalBottle') {
                world.level.items.push(new VerticalBottle(x, y));
            } else if (itemName === 'RightBottle') {
                world.level.items.push(new RightBottle(x, y));
            }
        }
    }
}

/**
 * Fills the level with enemies such as Chickens and Small Chickens.
 */
function fillEnemies() {
    for(let i = 0; i < 30; i++) {   
        world.level.enemies.push(new Chicken());
        world.level.enemies.push(new SmallChicken());
    }
}