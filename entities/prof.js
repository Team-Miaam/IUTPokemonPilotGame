import { Entity, Sprite, Bodies } from 'miaam';

class Prof extends Entity {
	static preload = {
		assets: [
			{
				name: 'prof',
				url: './assets/images/professor.png',
				type: 'image',
			},
		],
	};

	#dialogues = [
		'Professor oak must have sent you here',
		'I am Ridwan Kabir',
		'I am trying to make a pokemon sanctuary in IUT',
		'Three of my students are helping me out',
		'But I need you to check if they are up to any good',
		'report me ASAP',
	];

	dialoguesCopy = [...this.#dialogues];

	defaultDialogue = [
		['Have you met all of them yet?'],
		['Did you do the investigation?'],
		['Did you do what I asked?'],
	];

	onStart() {
		super.onStart();
		const { prof } = Prof.assets.images;
		this.sprite = new Sprite(prof.texture);
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
export default Prof;
