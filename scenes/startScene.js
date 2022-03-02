import { Scene, SceneManager, Camera, GameManager, Keyboard, Graphics, Audio, AudioSprite, Slider } from 'miaam';
import { EventSystem } from '@pixi/events';
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

	pianoSprite = {
		Sa: { start: 0.55, end: 1.45 },
		Re: { start: 1.45, end: 2.45 },
		Ga: { start: 2.45, end: 3.45 },
		Ma: { start: 3.45, end: 4.45 },
		Pa: { start: 4.45, end: 5.45 },
		Dha: { start: 5.45, end: 6.45 },
		Ni: { start: 6.45, end: 7.45 },
		HSa: { start: 7.45, end: 8.45 },
	};

	pianoKeys;

	volume;

	onStart() {
		super.onStart();
		const map = StartScene.assets.maps.startSceneMap;
		this.map = map;

		const gameScreen = GameManager.instance.app.screen;
		this.#camera = new Camera(this, gameScreen.width, gameScreen.height);
		this.#camera.centerOver(this.#player);

		const scenes = SceneManager.instance;
		scenes.view = StartScene.name;

		/*	Keyboard.key(' ').addActionOnDown({
			name: 'interact',
			action: () => {
				clip.clip.destroy();
				scenes.stopScene();
				scenes.startScene(MainScene.name);
			},
		});
*/
		const app = GameManager.instance.app;

		this.volume = new Slider(app, { xpos: 150, ypos: 30 }, { width: 200, height: 10 });
		this.volume.handle = { radius: 20 };

		const bg = new Graphics();
		bg.beginFill(0x0f0014); // #0F0014
		bg.drawRect(0, 250, 500, 50);
		bg.endFill();

		const c = new Audio({ url: '/assets/sounds/piano/351323__zodoz__c6.wav', loop: false });
		const cs = new Audio({ url: '/assets/sounds/piano/351316__zodoz__c-6.wav', loop: false });
		const d = new Audio({ url: '/assets/sounds/piano/351321__zodoz__d6.wav', loop: false });
		const ds = new Audio({ url: '/assets/sounds/piano/351322__zodoz__d-6.wav', loop: false });
		const e = new Audio({ url: '/assets/sounds/piano/351320__zodoz__e6.wav', loop: false });
		const f = new Audio({ url: '/assets/sounds/piano/351324__zodoz__f6.wav', loop: false });
		const fs = new Audio({ url: '/assets/sounds/piano/351325__zodoz__f-6.wav', loop: false });
		const g = new Audio({ url: '/assets/sounds/piano/351327__zodoz__g6.wav', loop: false });
		const gs = new Audio({ url: '/assets/sounds/piano/351328__zodoz__g-6.wav', loop: false });
		const a = new Audio({ url: '/assets/sounds/piano/351318__zodoz__a6.wav', loop: false });
		const as = new Audio({ url: '/assets/sounds/piano/351319__zodoz__a-6.wav', loop: false });
		const b = new Audio({ url: '/assets/sounds/piano/351317__zodoz__b6.wav', loop: false });
		const ch = new Audio({ url: '/assets/sounds/piano/351323__zodoz__c6.wav', loop: false });

		this.pianoKeys = [c, cs, d, ds, e, f, fs, g, gs, a, as, b, ch];

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

		const pianoW = 50;
		const pianoH = 420;

		const pianos = new AudioSprite({ url: '/assets/sounds/Full Octave.mp3', sprites: this.pianoSprite, loop: false });

		const pianoBg = new Graphics();
		pianoBg.lineStyle(2, 0xff00ff, 1);
		pianoBg.beginFill(0x650a5a, 0.25);
		pianoBg.drawRoundedRect(20, 305, 465, 300, 16);
		pianoBg.endFill();

		const buttonC = new Graphics();
		buttonC.beginFill(0xde3249);
		buttonC.drawRect(5 + 30, pianoH, 50, 100);
		buttonC.endFill();
		buttonC.interactive = true;
		buttonC.buttonMode = true;
		buttonC.on('pointerdown', () => {
			buttonC.tint = 0x1fff00;
			console.log('clicked');
			c.play();
		});
		buttonC.on('pointerup', () => {
			buttonC.tint = 0xffffff;
			c.pause();
		});
		Keyboard.key('a').addActionOnDown({
			name: 'interact',
			action: () => {
				buttonC.tint = 0x1fff00;
				console.log('clicked');
				c.play();
			},
		});
		Keyboard.key('a').addActionOnUp({
			name: 'interact',
			action: () => {
				console.log('sa up');
				buttonC.tint = 0xffffff;
				c.pause();
			},
		});

		const buttonD = new Graphics();
		buttonD.beginFill(0xde3249);
		buttonD.drawRect(60 + 30, pianoH, 50, 100);
		buttonD.endFill();
		buttonD.interactive = true;
		buttonD.buttonMode = true;
		buttonD.on('pointerdown', () => {
			buttonD.tint = 0x1fff00;
			console.log('clicked');
			d.play();
		});
		buttonD.on('pointerup', () => {
			buttonD.tint = 0xffffff;
			d.pause();
		});
		Keyboard.key('s').addActionOnDown({
			name: 'interact',
			action: () => {
				buttonD.tint = 0x1fff00;
				console.log('clicked re');
				d.play();
			},
		});
		Keyboard.key('s').addActionOnUp({
			name: 'interact',
			action: () => {
				console.log('fghjk');
				buttonD.tint = 0xffffff;
				d.pause();
			},
		});

		const buttonE = new Graphics();
		buttonE.beginFill(0xde3249);
		buttonE.drawRect(115 + 30, pianoH, 50, 100);
		buttonE.endFill();
		buttonE.interactive = true;
		buttonE.buttonMode = true;
		buttonE.on('pointerdown', () => {
			buttonE.tint = 0x1fff00;
			console.log('clicked');
			e.play();
		});
		buttonE.on('pointerup', () => {
			buttonE.tint = 0xffffff;
			e.pause();
		});
		Keyboard.key('d').addActionOnDown({
			name: 'interact',
			action: () => {
				buttonE.tint = 0x1fff00;
				console.log('clicked');
				e.play();
			},
		});
		Keyboard.key('d').addActionOnUp({
			name: 'interact',
			action: () => {
				buttonE.tint = 0xffffff;
				e.pause();
			},
		});
		const buttonF = new Graphics();
		buttonF.beginFill(0xde3249);
		buttonF.drawRect(170 + 30, pianoH, 50, 100);
		buttonF.endFill();
		buttonF.interactive = true;
		buttonF.buttonMode = true;
		buttonF.on('pointerdown', () => {
			buttonF.tint = 0x1fff00;
			console.log('clicked Ma');
			f.play();
		});
		buttonF.on('pointerup', () => {
			buttonF.tint = 0xffffff;
			f.pause();
		});
		Keyboard.key('f').addActionOnDown({
			name: 'interact',
			action: () => {
				buttonF.tint = 0x1fff00;
				console.log('clicked');
				f.play();
			},
		});
		Keyboard.key('f').addActionOnUp({
			name: 'interact',
			action: () => {
				buttonF.tint = 0xffffff;
				f.pause();
			},
		});
		const buttonG = new Graphics();
		buttonG.beginFill(0xde3249);
		buttonG.drawRect(225 + 30, pianoH, 50, 100);
		buttonG.endFill();
		buttonG.interactive = true;
		buttonG.buttonMode = true;
		buttonG.on('pointerdown', () => {
			buttonG.tint = 0x1fff00;
			console.log('clicked');
			g.play();
		});
		buttonG.on('pointerup', () => {
			buttonG.tint = 0xffffff;
			g.pause();
		});
		Keyboard.key('g').addActionOnDown({
			name: 'interact',
			action: () => {
				buttonG.tint = 0x1fff00;
				console.log('clicked');
				g.play();
			},
		});
		Keyboard.key('g').addActionOnUp({
			name: 'interact',
			action: () => {
				buttonG.tint = 0xffffff;
				g.pause();
			},
		});
		const buttonA = new Graphics();
		buttonA.beginFill(0xde3249);
		buttonA.drawRect(280 + 30, pianoH, 50, 100);
		buttonA.endFill();
		buttonA.interactive = true;
		buttonA.buttonMode = true;
		buttonA.on('pointerdown', () => {
			buttonA.tint = 0x1fff00;
			console.log('clicked');
			a.play();
		});
		buttonA.on('pointerup', () => {
			buttonA.tint = 0xffffff;
			a.pause();
		});

		Keyboard.key('h').addActionOnDown({
			name: 'interact',
			action: () => {
				buttonA.tint = 0x1fff00;
				console.log('clicked');
				a.play();
			},
		});
		Keyboard.key('h').addActionOnUp({
			name: 'interact',
			action: () => {
				buttonA.tint = 0xffffff;
				a.pause();
			},
		});

		const buttonB = new Graphics();
		buttonB.beginFill(0xde3249);
		buttonB.drawRect(335 + 30, pianoH, 50, 100);
		buttonB.endFill();
		buttonB.interactive = true;
		buttonB.buttonMode = true;
		buttonB.on('pointerdown', () => {
			buttonB.tint = 0x1fff00;
			console.log('clicked');
			b.play();
		});
		buttonB.on('pointerup', () => {
			buttonB.tint = 0xffffff;
			b.pause();
		});
		Keyboard.key('j').addActionOnDown({
			name: 'interact',
			action: () => {
				buttonB.tint = 0x1fff00;
				console.log('clicked');
				b.play();
			},
		});
		Keyboard.key('j').addActionOnUp({
			name: 'interact',
			action: () => {
				buttonB.tint = 0xffffff;
				b.pause();
			},
		});

		const buttonCh = new Graphics();
		buttonCh.beginFill(0xde3249);
		buttonCh.drawRect(390 + 30, pianoH, 50, 100);
		buttonCh.endFill();
		buttonCh.interactive = true;
		buttonCh.buttonMode = true;
		buttonCh.on('pointerdown', () => {
			buttonCh.tint = 0x1fff00;
			console.log('clicked');
			ch.play();
		});
		buttonCh.on('pointerup', () => {
			buttonCh.tint = 0xffffff;
			ch.pause();
		});

		Keyboard.key('k').addActionOnDown({
			name: 'interact',
			action: () => {
				buttonCh.tint = 0x1fff00;
				console.log('clicked');
				ch.play();
			},
		});
		Keyboard.key('k').addActionOnUp({
			name: 'interact',
			action: () => {
				buttonCh.tint = 0xffffff;
				ch.pause();
			},
		});
		const buttC = new Graphics();
		buttC.beginFill(0xc800ff);
		buttC.drawRect(45 + 30, pianoH - 105, 25, 100);
		buttC.endFill();
		buttC.interactive = true;
		buttC.buttonMode = true;
		buttC.on('pointerdown', () => {
			buttC.tint = 0x1fff00;
			console.log('clicked');
			cs.play();
		});
		buttC.on('pointerup', () => {
			buttC.tint = 0xffffff;
			cs.pause();
		});
		Keyboard.key('w').addActionOnDown({
			name: 'interact',
			action: () => {
				buttC.tint = 0x1fff00;
				console.log('clicked');
				cs.play();
			},
		});
		Keyboard.key('w').addActionOnUp({
			name: 'interact',
			action: () => {
				buttC.tint = 0xffffff;
				cs.pause();
			},
		});
		const buttD = new Graphics();
		buttD.beginFill(0xc800ff);
		buttD.drawRect(100 + 30, pianoH - 105, 25, 100);
		buttD.endFill();
		buttD.interactive = true;
		buttD.buttonMode = true;
		buttD.on('pointerdown', () => {
			buttD.tint = 0x1fff00;
			console.log('clicked');
			ds.play();
		});
		buttD.on('pointerup', () => {
			buttD.tint = 0xffffff;
			ds.pause();
		});
		Keyboard.key('e').addActionOnDown({
			name: 'interact',
			action: () => {
				buttD.tint = 0x1fff00;
				console.log('clicked');
				ds.play();
			},
		});
		Keyboard.key('e').addActionOnUp({
			name: 'interact',
			action: () => {
				buttD.tint = 0xffffff;
				ds.pause();
			},
		});
		const buttF = new Graphics();
		buttF.beginFill(0xc800ff);
		buttF.drawRect(210 + 30, pianoH - 105, 25, 100);
		buttF.endFill();
		buttF.interactive = true;
		buttF.buttonMode = true;
		buttF.on('pointerdown', () => {
			buttF.tint = 0x1fff00;
			console.log('clicked');
			fs.play();
		});
		buttF.on('pointerup', () => {
			buttF.tint = 0xffffff;
			fs.pause();
		});
		Keyboard.key('t').addActionOnDown({
			name: 'interact',
			action: () => {
				buttF.tint = 0x1fff00;
				console.log('clicked');
				fs.play();
			},
		});
		Keyboard.key('t').addActionOnUp({
			name: 'interact',
			action: () => {
				buttF.tint = 0xffffff;
				fs.pause();
			},
		});

		const buttG = new Graphics();
		buttG.beginFill(0xc800ff);
		buttG.drawRect(265 + 30, pianoH - 105, 25, 100);
		buttG.endFill();
		buttG.interactive = true;
		buttG.buttonMode = true;
		buttG.on('pointerdown', () => {
			buttG.tint = 0x1fff00;
			console.log('clicked');
			gs.play();
		});
		buttG.on('pointerup', () => {
			buttG.tint = 0xffffff;
			gs.pause();
		});
		Keyboard.key('y').addActionOnDown({
			name: 'interact',
			action: () => {
				buttG.tint = 0x1fff00;
				console.log('clicked');
				gs.play();
			},
		});
		Keyboard.key('y').addActionOnUp({
			name: 'interact',
			action: () => {
				buttG.tint = 0xffffff;
				gs.pause();
			},
		});
		const buttA = new Graphics();
		buttA.beginFill(0xc800ff);
		buttA.drawRect(320 + 30, pianoH - 105, 25, 100);
		buttA.endFill();
		buttA.interactive = true;
		buttA.buttonMode = true;
		buttA.on('pointerdown', () => {
			buttA.tint = 0x1fff00;
			console.log('clicked');
			as.play();
		});
		buttA.on('pointerup', () => {
			buttA.tint = 0xffffff;
			as.pause();
		});
		Keyboard.key('u').addActionOnDown({
			name: 'interact',
			action: () => {
				buttA.tint = 0x1fff00;
				console.log('clicked');
				as.play();
			},
		});
		Keyboard.key('u').addActionOnUp({
			name: 'interact',
			action: () => {
				buttA.tint = 0xffffff;
				as.pause();
			},
		});
		app.stage.addChild(
			this.volume.slider,
			pianoBg,
			buttonD,
			buttonE,
			buttonC,
			buttonF,
			buttonG,
			buttonA,
			buttonB,
			buttonCh,
			bg,
			buttC,
			buttD,
			buttF,
			buttG,
			buttA
		);
	}

	onUpdate(ticker) {
		super.onUpdate(ticker);
		this.#camera.follow(this.#player);
		for (let index = 0; index < this.pianoKeys.length; index += 1) {
			const element = this.pianoKeys[index];
			element.clip.volume = this.volume.value;
		}
	}

	onDestroy() {
		super.onDestroy();
	}
}

export default StartScene;
