import { Scene, SceneManager, Camera, GameManager } from 'miaam';

class EndScene extends Scene {
	static preload = {
		assets: [
			{
				name: 'endSceneMap',
				url: './assets/tilemap/endSceneMap.json',
				type: 'map',
			},
		],
		entities: [],
	};

	#player = { transform: { x: 0, y: 0 }, sprite: { x: 0, y: 0, width: 16, height: 16 } };

	#camera;

	onStart() {
		super.onStart();
		const map = EndScene.assets.maps.endSceneMap;
		this.map = map;

		const gameScreen = GameManager.instance.app.screen;
		this.#camera = new Camera(this, gameScreen.width, gameScreen.height);
		this.#camera.centerOver(this.#player);

		const scenes = SceneManager.instance;
		scenes.view = EndScene.name;
	}

	onUpdate(ticker) {
		super.onUpdate(ticker);
		this.#camera.follow(this.#player);
	}

	onDestroy() {
		super.onDestroy();
	}
}

export default EndScene;
