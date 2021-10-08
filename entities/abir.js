import { Entity, Sprite, Bodies } from "miaam";

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

    onStart() {
        super.onStart();
        const { abir } = Abir.assets.images;
        this.sprite = new Sprite(abir.texture);
        this.body = Bodies.rectangle(0,0, 32, 32, {isStatic: true});
    }
}
export default Abir;