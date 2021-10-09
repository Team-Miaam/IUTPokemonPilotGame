import { Entity, Keyboard, AnimatedSpriteWState, Bodies, PhysicsManager, Dialogue } from 'miaam';

class Player extends Entity {
	#playerMovementVelocity = 1;

	static lampCount = -1;

	static preload = {
		assets: [
			{
				name: 'playerSpriteAnimationSheet',
				url: './assets/animation/playerAnimation.json',
				type: 'animation',
			},
		],
	};

	onStart() {
		super.onStart();
		const { playerSpriteAnimationSheet } = Player.assets.animations;
		this.sprite = new AnimatedSpriteWState(playerSpriteAnimationSheet);
		this.sprite.state = { state: 'idleRight' };
		this.sprite.animationSpeed = 0.1;
		this.sprite.anchor.set(0, 0.5);
		this.setupEventListeners();
		this.setupBody();
	}

	onUpdate(delta) {
		super.onUpdate(delta);
		this.playerMovement(delta);
	}

	onDestroy() {
		super.onDestroy();
	}

	setupEventListeners() {
		// FIXME: Manage the event system with event registry
		this.setupAnimationStateTransitions();
		PhysicsManager.instance.events.addEventListener('collisionStart.lamp', ({ detail }) => {
			const lamp = detail.pairs[0].bodyA;
			if (lamp.visited === undefined && Player.lampCount >= 0) {
				Player.lampCount += 1;
				lamp.visited = true;
				console.log(Player.lampCount);
				if (Player.lampCount > 2) {
					const dialouge = new Dialogue(
						['*I think Akshar made a fool of me.*', '*He better has some \nexplanation for this*'],
						'Minecraft'
					);
					setTimeout(() => {
						dialouge.nextText();
					}, 2000);
					setTimeout(() => {
						dialouge.nextText();
					}, 4000);
					Player.lampCount = -2;
				}
			}
		});
	}

	setupBody() {
		this.body = Bodies.rectangle(0, 0, 16, 23);
	}

	playerMovement(delta) {
		const displacement = this.#playerMovementVelocity * delta;
		if (Keyboard.key('ArrowLeft').isDown) {
			this.transform = {
				x: this.transform.x - displacement,
			};
		} else if (Keyboard.key('ArrowRight').isDown) {
			this.transform = {
				x: this.transform.x + displacement,
			};
		} else if (Keyboard.key('ArrowUp').isDown) {
			this.transform = {
				y: this.transform.y - displacement,
			};
		} else if (Keyboard.key('ArrowDown').isDown) {
			this.transform = {
				y: this.transform.y + displacement,
			};
		}
	}

	setupAnimationStateTransitions() {
		Keyboard.key('ArrowLeft').addActionOnDown({
			name: `${this.name}.playerAnimationWalkingLeft`,
			action: () => {
				this.sprite.state = { state: 'walkingLeft' };
			},
		});

		Keyboard.key('ArrowLeft').addActionOnUp({
			name: `${this.name}.playerAnimationIdleLeft`,
			action: () => {
				this.sprite.state = { state: 'idleLeft' };
			},
		});

		Keyboard.key('ArrowRight').addActionOnDown({
			name: `${this.name}.playerAnimationWalkingRight`,
			action: () => {
				this.sprite.state = { state: 'walkingRight' };
			},
		});

		Keyboard.key('ArrowRight').addActionOnUp({
			name: `${this.name}.playerAnimationIdleRight`,
			action: () => {
				this.sprite.state = { state: 'idleRight' };
			},
		});

		Keyboard.key('ArrowUp').addActionOnDown({
			name: `${this.name}.playerAnimationWalkingUp`,
			action: () => {
				this.sprite.state = { state: 'walkingUp' };
			},
		});

		Keyboard.key('ArrowUp').addActionOnUp({
			name: `${this.name}.playerAnimationIdleUp`,
			action: () => {
				this.sprite.state = { state: 'idleUp' };
			},
		});

		Keyboard.key('ArrowDown').addActionOnDown({
			name: `${this.name}.playerAnimationWalkingDown`,
			action: () => {
				this.sprite.state = { state: 'walkingDown' };
			},
		});

		Keyboard.key('ArrowDown').addActionOnUp({
			name: `${this.name}.playerAnimationIdleDown`,
			action: () => {
				this.sprite.state = { state: 'idleDown' };
			},
		});
	}
}

export default Player;
