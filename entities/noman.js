import { Entity, Sprite, Bodies } from 'miaam';

class Noman extends Entity {
	static preload = {
		assets: [
			{
				name: 'noman',
				url: './assets/images/Noman.png',
				type: 'image',
			},
		],
	};

	#dialogues = [
		'Who are you supposed to be?',
		'So you met Abir',
		'I predicted someone like you will come',
		'But you are early.....',
		'*Sigh.. go to rocket and meet Akshar',
		'Of course you dont know',
		'Rocket will be at the North-east from here',
		'Now stop wasting my time',
	];

	dialoguesCopy = [...this.#dialogues];

	defaultDialogue = [['I should make gyms illegal here'], ['Where do i set the pokecenter...hmmmmm'], ['*SILENCE*']];

	onStart() {
		super.onStart();
		const { noman } = Noman.assets.images;
		this.sprite = new Sprite(noman.texture);
		this.body = Bodies.rectangle(0, 0, 32, 64, { isStatic: true });
		this.sprite.anchor.set(0.2, 0.75);
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
export default Noman;
