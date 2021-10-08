import { Scene, SceneManager, Camera, GameManager } from 'miaam';
import Box from '../entities/box';

class MainScene extends Scene {
    static preload = {
        assets: [
            {
                name: 'mainMap',
                url: './assets/tilemap/IUTcampusMap.json',
                type: 'map',
            },
        ],
        entities: []
    }
    #player;
    #camera;

    onStart() {
        super.onStart();
        const map = MainScene.assets.maps.mainMap;
        this.map = map;


        this.#player = new Box({ name: 'box', props: { x: 900, y: 410, width: 32, height: 32 } });
        this.addEntity({ layer: 'Objects', entity: this.#player });
        this.#player.transform = {
            x: 1024,
            y: 416,
        };

        const gameScreen = GameManager.instance.app.screen;
        this.#camera = new Camera(this, gameScreen.width, gameScreen.height);
        this.#camera.centerOver(this.#player);

        const scenes = SceneManager.instance;
        scenes.view = MainScene.name;

    }

    onUpdate(ticker) {
        super.onUpdate(ticker);
        this.#camera.follow(this.#player);
    }

    onDestroy() {
        super.onDestroy();
    }
}

export default MainScene;