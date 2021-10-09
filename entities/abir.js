import { Entity, Sprite, Bodies, AnimatedSpriteWState } from 'miaam';

class Abir extends Entity {
	static preload = {
		assets: [
			{
				name: 'abir',
				url: './assets/animation/abirAnimation.json',
				type: 'animation',
			},
		],
	};

	#dialogues = [
		'Hello there',
		'This area is off limits',
		'Sir sent you? Hmmmmm quite a pickle that I am in',
		'Go to the mosque and find Noman, he will help you',
	];

	dialoguesCopy = [...this.#dialogues];

	defaultDialogue = [['Stop bothering me'], ['Praise the sun'], ['I want to sleep...']];

	onStart() {
		super.onStart();
		const { abir } = Abir.assets.animations;
		this.sprite = new AnimatedSpriteWState(abir);
		this.body = Bodies.rectangle(0, 0, 32, 64, { isStatic: true });
		this.sprite.animationSpeed = 0.2;
		this.sprite.anchor.set(0, 0.5);
	}

	get dialogues() {
		if (this.dialoguesCopy.length !== 1) {
			this.dialoguesCopy = [...this.#dialogues];
			return this.dialoguesCopy;
		}
		const randomElement = this.defaultDialogue[Math.floor(Math.random() * this.defaultDialogue.length)];
		return [...randomElement];
	}
}
export default Abir;
