import { Scene, SceneManager, Camera, GameManager, Keyboard, Graphics, Audio, AudioSprite } from 'miaam';
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

	pianoSprite = { Sa: { start: 0.3, end: 1.3 }, Re: { start: 1.4, end: 2.3 }, Ga: { start: 2.4, end: 3.3 } };

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

		const clip = new Audio({ url: '/assets/sounds/pop.flac', loop: true });
		clip.loop = true;
		const button = new Graphics();
		button.beginFill(0xde3249);
		button.drawRect(0, 0, 50, 10);
		button.endFill();
		button.interactive = true;
		button.buttonMode = true;
		button.on('pointerdown', () => {
			console.log('clicked');
			clip.play();
		});

		const pianos = new AudioSprite({ url: '/assets/sounds/Full Octave.mp3', sprites: this.pianoSprite, loop: false });

		const buttonSa = new Graphics();
		buttonSa.beginFill(0xde3249);
		buttonSa.drawRect(0, 100, 50, 10);
		buttonSa.endFill();
		buttonSa.interactive = true;
		buttonSa.buttonMode = true;
		buttonSa.on('pointerdown', () => {
			console.log('clicked');
			pianos.clip.play('Sa');
		});
		const buttonRe = new Graphics();
		buttonRe.beginFill(0xde3249);
		buttonRe.drawRect(0, 200, 50, 10);
		buttonRe.endFill();
		buttonRe.interactive = true;
		buttonRe.buttonMode = true;
		buttonRe.on('pointerdown', () => {
			console.log('clicked');
			pianos.clip.play('Re');
		});
		const buttonGa = new Graphics();
		buttonGa.beginFill(0xde3249);
		buttonGa.drawRect(0, 300, 50, 10);
		buttonGa.endFill();
		buttonGa.interactive = true;
		buttonGa.buttonMode = true;
		buttonGa.on('pointerdown', () => {
			console.log('clicked');
			pianos.clip.play('Ga');
		});

		app.stage.addChild(button, buttonRe, buttonGa, buttonSa);
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
