import { Entity, Sprite, Bodies } from "miaam";

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

    onStart() {
        super.onStart();
        const { prof } = Prof.assets.images;
        this.sprite = new Sprite(prof.texture);
        this.body = Bodies.rectangle(0,0, 32, 32, {isStatic: true});
    }
}
export default Prof;