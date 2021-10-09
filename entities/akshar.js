import { Entity, Sprite, Bodies, AnimatedSpriteWState } from 'miaam';
import Player from './player';

class Akshar extends Entity {
	static preload = {
		assets: [
			{
				name: 'akshar',
				url: './assets/animation/aksharAnimation.json',
				type: 'animation',
			},
		],
	};

	Predialogues = [
		'Yea I know who you are and what you want',
		'But I will not spill the beans',
		'Unless you tell me how many lamp posts are in the campus',
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

	dialoguesCopy = [...this.Predialogues];

	onStart() {
		super.onStart();
		const { akshar } = Akshar.assets.animations;
		this.sprite = new AnimatedSpriteWState(akshar);
		this.sprite.animationSpeed = 0.2;
		this.body = Bodies.rectangle(0, 0, 32, 64, { isStatic: true });
		this.sprite.anchor.set(0, 0.5);
	}

	get dialogues() {
		if (Player.lampCount === -2) {
			this.dialoguesCopy = [...this.endDialogue];
			return this.dialoguesCopy;
		}
		if (this.dialoguesCopy.length !== 1) {
			this.dialoguesCopy = [...this.Predialogues];
			return this.dialoguesCopy;
		}
		const randomElement = this.defaultDialogue[Math.floor(Math.random() * this.defaultDialogue.length)];
		return [...randomElement];
	}
}
export default Akshar;
