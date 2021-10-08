import { Scene, SceneManager, Camera } from 'miaam';
import Box from '../entities/box';

class MainScene extends Scene {
    #player;
    #camera;
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

    onStart() {
        super.onStart();
        const map = MainScene.assets.maps.mainMap;
        this.map = map;

        const scenes = SceneManager.instance;
        scenes.view = MainScene.name;

        this.#player = new Box({ name: 'box', props: { x: 900, y: 410, width: 32, height: 32 } });
        // this.#player = new Player({ name: 'Ash' });
        //     this.addEntity({ layer: 'players', entity: this.#player });
        this.#player.transform = {
            x: 1024,
            y: 416,
        };

        const gameScreen = GameManager.instance.app.screen;
        this.#camera = new Camera(this, gameScreen.width, gameScreen.height);
        this.#camera.centerOver(this.#player);


    }

    onUpdate(ticker) {
        super.onUpdate(ticker);
        this.#camera.follow(this.#player);
    }

    onDestroy(){
        super.onDestroy();
    }
}

export default MainScene;