import { Entity, Sprite, Bodies } from "miaam";

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

    onStart() {
        super.onStart();
        const { akshar } = Akshar.assets.images;
        this.sprite = new Sprite(akshar.texture);
        this.body = Bodies.rectangle(0,0, 32, 32, {isStatic: true});
    }
}
export default Akshar;