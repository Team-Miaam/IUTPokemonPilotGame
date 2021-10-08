import { Entity } from "miaam";

class Noman extends Entity{
    onCreate() {
		this.preload = {
			assets: [
				{
					name: 'noman',
					url: './assets/images/Noman.png',
					type: 'image',
				},
			],
		};
	}

	onStart() {
		super.onStart();
		const { noman } = Noman.assets.images;
		this.sprite = new Sprite(noman.texture);
	}
}
export default Noman;