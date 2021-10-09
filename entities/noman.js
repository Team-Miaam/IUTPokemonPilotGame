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

	dialogues = [
		'Who are you supposed to be',
		'I predicted someone like you will come',
		'But you are early.....',
		' *Sigh.. go to rocket and meet akshar',
		'of course you dont know',
		'Rocket will be at the North-east from here..',
		'now stop wasting my time',
	];

	defaultDialogue = [
		['If you want result then stop bothering'],
		['where do i set the pokecenter..hmmmmm'],
		['*silence*'],
	];

	onStart() {
		super.onStart();
		const { noman } = Noman.assets.images;
		this.sprite = new Sprite(noman.texture);
		this.body = Bodies.rectangle(0, 0, 32, 32, { isStatic: true });
	}
}
export default Noman;
