import { Scene, SceneManager, Camera, GameManager, Keyboard, Graphics, Audio } from 'miaam';
import { Sound } from '@pixi/sound';
import MainScene from './mainScene';

class StartScene extends Scene {
	static preload = {
		assets: [
			{
				name: 'startSceneMap',
				url: './assets/tilemap/startSceneMap.json',
				type: 'map',
			},
		],
		entities: [],
	};

	#player = { transform: { x: 0, y: 0 }, sprite: { x: 0, y: 0, width: 16, height: 16 } };

	#camera;

	onStart() {
		super.onStart();
		const map = StartScene.assets.maps.startSceneMap;
		this.map = map;

		const gameScreen = GameManager.instance.app.screen;
		this.#camera = new Camera(this, gameScreen.width, gameScreen.height);
		this.#camera.centerOver(this.#player);

		const scenes = SceneManager.instance;
		scenes.view = StartScene.name;
		Keyboard.key(' ').addActionOnDown({
			name: 'interact',
			action: () => {
				clip.clip.destroy();
				scenes.stopScene();
				scenes.startScene(MainScene.name);
			},
		});

		const app = GameManager.instance.app;

		const clip = new Audio({ url: '/assets/sounds/opening.mp3' });
		const button = new Graphics();
		button.beginFill(0xde3249);
		button.drawRect(50, 50, 100, 100);
		button.endFill();

		button.interactive = true;
		button.buttonMode = true;
		button.on('pointerdown', () => {
			console.log('clicked');
			clip.play();
		});

		app.stage.addChild(button);
	}

	onUpdate(ticker) {
		super.onUpdate(ticker);
		this.#camera.follow(this.#player);
	}

	onDestroy() {
		super.onDestroy();
	}
}

export default StartScene;
