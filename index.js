import { GameManager, SceneManager } from 'miaam';

import MainScene from './scenes/mainScene.js';
import MosqueScene from './scenes/mosqueScene.js';
import EndScene from './scenes/endScene.js';

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
scenes.addScene(MosqueScene);
scenes.addScene(EndScene);
//scenes.startScene(MainScene.name);
scenes.startScene(EndScene.name);

document.body.appendChild(game.window);
