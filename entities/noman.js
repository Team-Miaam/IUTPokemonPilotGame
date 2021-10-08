import { Entity, Sprite, Bodies } from "miaam";

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

    onStart() {
        super.onStart();
        const { noman } = Noman.assets.images;
        this.sprite = new Sprite(noman.texture);
        this.body = Bodies.rectangle(0,0, 32, 32, {isStatic: true});
    }
}
export default Noman;