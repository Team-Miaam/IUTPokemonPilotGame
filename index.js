import { GameManager, SceneManager } from 'miaam';

import MainScene from './scenes/mainScene.js';

const game = GameManager.instance;
const scenes = SceneManager.instance;

game.createWindow({
	width: 512,
	height: 512,
	antialias: true,
	backgroundAlpha: false,
	resolution: 1,
});

scenes.addScene(MainScene);
scenes.startScene(MainScene.name);

document.body.appendChild(game.window);
