import { Entity, Bodies, Graphics, groupD8, GameManager, Sprite, Keyboard } from 'miaam';

class Box extends Entity {
	static options = {};

	#playerMovementVelocity = 1;

	onStart({ x = 0, y = 0, width = 0, height = 0, isSensor = false }) {
		super.onStart();
		this.sprite = Box.#constructRandomBoxSprite(width, height);
		// this.body = Bodies.rectangle(x, y, width, height, { label: this.name, isSensor });
		this.transform = {
			x,
			y,
		};
	}

	onUpdate(delta) {
		super.onUpdate();
		this.playerMovement(delta);
	}

	onDestroy() {
		super.onDestroy();
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

	static #constructRandomBoxSprite(width, height) {
		const graphics = new Graphics();
		graphics.beginFill(0xff0000);
		graphics.drawRect(0, 0, width, height);
		graphics.endFill();
		return graphics;
	}
}

export default Box;
