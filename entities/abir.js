import { Entity, Sprite, Bodies } from 'miaam';

class Abir extends Entity {
	static preload = {
		assets: [
			{
				name: 'abir',
				url: './assets/images/Abir.png',
				type: 'image',
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

	defaultDialogue = [['Stop bothering me'], ['Why are you still here?'], ['I want to sleep...']];

	onStart() {
		super.onStart();
		const { abir } = Abir.assets.images;
		this.sprite = new Sprite(abir.texture);
		this.body = Bodies.rectangle(0, 0, 32, 64, { isStatic: true });
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
