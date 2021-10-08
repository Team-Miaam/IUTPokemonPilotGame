import { Scene, SceneManager, Camera, GameManager, PhysicsManager } from 'miaam';
import Box from '../entities/box';
import Noman from '../entities/noman';
import Player from '../entities/player';

class MainScene extends Scene {
    static preload = {
        assets: [
            {
                name: 'mainMap',
                url: './assets/tilemap/IUTcampusMap.json',
                type: 'map',
            },
        ],
        entities: [Player, Noman]
    }
    #player;
    #camera;

    onStart() {
        super.onStart();
        const map = MainScene.assets.maps.mainMap;
        this.map = map;


        // this.#player = new Box({ name: 'box', props: { x: 900, y: 410, width: 32, height: 32 } });
        this.#player = new Player({ name: 'player' });
        this.addEntity({ layer: 'Objects', entity: this.#player });
        this.noman = new Noman({ name: 'noman' });
        this.addEntity({ layer: 'NPC', entity: this.noman });

        const gameScreen = GameManager.instance.app.screen;
        this.#camera = new Camera(this, gameScreen.width, gameScreen.height);
        this.#camera.centerOver(this.#player);

        const scenes = SceneManager.instance;
        scenes.view = MainScene.name;
        scenes.world = MainScene.name;
        PhysicsManager.instance.engine.gravity.y = 0;

    }

    onUpdate(ticker) {
        super.onUpdate(ticker);
        this.#camera.follow(this.#player);
        PhysicsManager.instance.update();
    }

    onDestroy() {
        super.onDestroy();
    }
}

export default MainScene;