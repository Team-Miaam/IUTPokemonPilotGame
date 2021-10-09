import { Scene, SceneManager, Camera, GameManager, Keyboard } from 'miaam';
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
				scenes.stopScene();
				scenes.startScene(MainScene.name);
			},
		});
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
