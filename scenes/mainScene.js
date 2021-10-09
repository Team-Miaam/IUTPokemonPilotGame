import { Scene, SceneManager, Camera, GameManager, PhysicsManager, Dialogue, Keyboard } from 'miaam';

import Abir from '../entities/abir.js';
import Akshar from '../entities/akshar.js';
import Player from '../entities/player.js';
import Prof from '../entities/prof.js';

import MosqueScene from './mosqueScene.js';
class MainScene extends Scene {
	static preload = {
		assets: [
			{
				name: 'minecraft',
				url: './assets/fonts/mine.xml',
				type: 'font',
			},
			{
				name: 'mainMap',
				url: './assets/tilemap/IUTcampusMap.json',
				type: 'map',
			},
		],
		entities: [Player, Prof, Akshar, Abir],
	};

	#player;

	#camera;

	dialogues;

	font = 'Minecraft';

	onStart() {
		super.onStart();
		const map = MainScene.assets.maps.mainMap;
		this.map = map;

		// this.#player = new Box({ name: 'box', props: { x: 900, y: 410, width: 32, height: 32 } });
		this.#player = new Player({ name: 'player' });
		this.addEntity({ layer: 'Objects', entity: this.#player });
		this.#player.sprite.state = { state: 'idleUp' };
		// this.noman = new Noman({ name: 'noman' });
		// this.addEntity({ layer: 'NPC', entity: this.noman });
		this.prof = new Prof({ name: 'prof' });
		this.addEntity({ layer: 'NPC', entity: this.prof });
		this.akshar = new Akshar({ name: 'akshar' });
		this.addEntity({ layer: 'NPC', entity: this.akshar });
		this.abir = new Abir({ name: 'abir' });
		this.addEntity({ layer: 'NPC', entity: this.abir });

		const gameScreen = GameManager.instance.app.screen;
		this.#camera = new Camera(this, gameScreen.width, gameScreen.height);
		this.#camera.centerOver(this.#player);

		const scenes = SceneManager.instance;
		scenes.view = MainScene.name;
		scenes.world = MainScene.name;
		PhysicsManager.instance.engine.gravity.y = 0;
		this.initiateKeyboard();
		this.setupEvents();
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
					/**/
				}
			},
		});
	}

	setupEvents() {
		PhysicsManager.instance.events.addEventListener('collisionStart.enterMosque', MainScene.mosqueEntry);
		PhysicsManager.instance.events.addEventListener('collisionStart.talkToProf', this.talkToProf);
		PhysicsManager.instance.events.addEventListener('collisionStart.talkToAbir', this.talkToAbir);
		PhysicsManager.instance.events.addEventListener('collisionStart.talkToAkshar', this.talkToAkshar);
		PhysicsManager.instance.events.addEventListener('collisionEnd.talkToProf', () => {
			this.dialogues.destroy();
		});
		PhysicsManager.instance.events.addEventListener('collisionEnd.talkToAbir', () => {
			this.dialogues.destroy();
		});
		PhysicsManager.instance.events.addEventListener('collisionEnd.talkToAkshar', () => {
			this.dialogues.destroy();
		});
	}

	static mosqueEntry() {
		MainScene.changePlayerSpawnPosition();
		const scenes = SceneManager.instance;
		scenes.stopScene();
		scenes.startScene(MosqueScene.name);
	}

	static changePlayerSpawnPosition() {
		const { layers } = MainScene.assets.maps.mainMap.data;
		layers.forEach((layer) => {
			if (layer.name === 'Objects') {
				const { objects } = layer;
				objects.forEach((object) => {
					if (object.name === 'player') {
						object.x = 620;
						object.y = 770;
					}
				});
			}
		});
	}

	talkToProf = () => {
		console.log('ffasasd');
        this.dialogues = new Dialogue(this.prof.dialogues, this.font);
	};

	talkToAbir = () => {
		this.dialogues = new Dialogue(this.abir.dialogues, this.font);
	};

	talkToAkshar = () => {
		this.dialogues = new Dialogue(this.akshar.dialogues, this.font);
	};
}

export default MainScene;
