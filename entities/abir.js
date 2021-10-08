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

    dialogues = [
        'hello there',
        'this area is off limit',
        'Sir sent you? hmmmmm quite a pickle that I am in',
        'Go to the mosque and find Noman, he will help you'
    ]
    defaultDialogue = [['Stop bothering me'], ['why are you still here'], ['I want to sleep']];

    onStart() {
        super.onStart();
        const { abir } = Abir.assets.images;
        this.sprite = new Sprite(abir.texture);
        this.body = Bodies.rectangle(0,0, 32, 32, {isStatic: true});
    }
}
export default Abir;