import { Entity, Sprite, Bodies } from 'miaam';

class Akshar extends Entity {
	static preload = {
		assets: [
			{
				name: 'akshar',
				url: './assets/images/akshar.png',
				type: 'image',
			},
		],
	};

	Predialogues = [
		'Yea I know who you are and what you want',
		'But I will not spill the beans',
		'Unless you tell me how many Lightposts are in the campus',
	];

	defaultDialogue = [
		['Go on Adventure boy'],
		['I hope you know how to count'],
		['A nice opportuniuty to explore the red heaven'],
	];

	endDialogue = [
		'Ok, i will show you',
		'We are doing experiments on pokemons here',
        'creating new hybrid pokemons', 
		'under the nose of our supervisor',
		'These stuffs are quite illegal you know',
		'You think you can stop us',
		'Lets see which is faster',
		'your pokeball or my 9mm bullet',
		'*Bang!!*',
	];

	onStart() {
		super.onStart();
		const { akshar } = Akshar.assets.images;
		this.sprite = new Sprite(akshar.texture);
		this.body = Bodies.rectangle(0, 0, 32, 32, { isStatic: true });
	}
}
export default Akshar;
