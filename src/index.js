/* lots of code taken from
 * https://github.com/kittykatattack/learningPixi
 */

import { inherits } from 'util';
import { getGUISprite, getIngredientSprite, init } from './textures';
import { getContainerForLevel } from './level_state_display';
import { getContainerForMenu } from './menu_display';

import {
    gameStateStream, onStartLevel, onPause, onReturnToMenu, onResume
} from './GameStateStream';
import { Subject } from 'rxjs';

gameStateStream.subscribe(gameState => {
    console.log("GAME STATE CHANGED", gameState.toJS());
});

onStartLevel.subscribe(gameState => {
    console.log("STARTED LEVEL", gameState.toJS());
});

onResume.subscribe(() => console.log("RESUME"));
onPause.subscribe(() => console.log("PAUSED"));
onReturnToMenu.subscribe(() => console.log("RETURNED TO MENU"));

// load in sprites -> spritesheet
/*var spritesheet = require('spritesheet-js');
spritesheet('assets/*.png', {format: 'pixi.js'}, function (err) {
    if (err) throw err;
    console.log('spritesheet successfully generated');
});*/

/*
    SETUP
*/
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.resources,
    Sprite = PIXI.Sprite;

let Container = PIXI.Container;

let app = new Application({
    width: 800,
    height: 600,
    antialias: true,
    transparent: false,
    resolution: 1
});

document.body.appendChild(app.view);

/*
    TEXTURES
*/

init();
PIXI.loader.load(setup);

/*
    DO STUFF
*/
let state;

// init
function setup () {
    let fakeIngredientData = {
        "name": "onion",
        "chopPattern": [2, 1, 1, 2]
    };
    let onion = getIngredientSprite(fakeIngredientData.name);
    onion.x = 30;
    onion.y = 30;

    let menu = getContainerForMenu();
    app.stage.addChild(menu);

    let level = getContainerForLevel(gameStateStream);
    app.stage.addChild(level);

    state = play;

    app.ticker.add(delta => gameLoop(delta));
}

// run game current state in loop
// & render sprites
function gameLoop (delta) {
    state(delta);
}

// all game logic here
function play (delta) {
    //onion.vx = 1;
    /* onion.x += 1; */
}

// all code to run @ end of game
function end (delta) {

}
