import { Scene, SceneManager, Camera, GameManager, PhysicsManager, Dialogue, Keyboard } from 'miaam';

import Noman from '../entities/noman.js';
import Player from '../entities/player.js';

import MainScene from './mainScene.js';
class MosqueScene extends Scene {
	static preload = {
		assets: [
			{
				name: 'mosqueMap',
				url: './assets/tilemap/Mosque.json',
				type: 'map',
			},
		],
		entities: [Player, Noman],
	};

	#player;

	#camera;

	dialogues;

	font = 'Minecraft';

	onStart() {
		super.onStart();
		const map = MosqueScene.assets.maps.mosqueMap;
		this.map = map;

		this.#player = new Player({ name: 'player' });
		this.#player.sprite.anchor.set(0.2, 0.75);
		this.addEntity({ layer: 'Objects', entity: this.#player });
		this.noman = new Noman({ name: 'noman' });
		this.addEntity({ layer: 'NPC', entity: this.noman });
		this.#player.sprite.state = { state: 'idleUp' };

		const gameScreen = GameManager.instance.app.screen;
		this.#camera = new Camera(this, gameScreen.width, gameScreen.height);
		this.#camera.centerOver(this.#player);

		const scenes = SceneManager.instance;
		scenes.view = MosqueScene.name;
		scenes.world = MosqueScene.name;
		PhysicsManager.instance.engine.gravity.y = 0;

		PhysicsManager.instance.events.addEventListener('collisionStart.exitMosque', this.mosqueExit);
		PhysicsManager.instance.events.addEventListener('collisionStart.talkToNoman', this.talkToNoman);
		PhysicsManager.instance.events.addEventListener('collisionEnd.talkToNoman', () => {
			this.dialogues.destroy();
		});

		this.initiateKeyboard();
	}

	onUpdate(ticker) {
		super.onUpdate(ticker);
		this.#camera.follow(this.#player);
		PhysicsManager.instance.update();
	}

	onDestroy() {
		super.onDestroy();
	}

	initiateKeyboard() {
		Keyboard.key('e').addActionOnDown({
			name: 'nextText',
			action: () => {
				try {
					this.dialogues.nextText();
				} catch (error) {
					/** */
				}
			},
		});
	}

	mosqueExit() {
		const scene = SceneManager.instance;
		scene.stopScene();
		scene.startScene(MainScene.name);
	}

	talkToNoman = () => {
		this.dialogues = new Dialogue(this.noman.dialogues, this.font);
	};
}

export default MosqueScene;
