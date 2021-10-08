import { Scene, SceneManager, Camera, GameManager, PhysicsManager } from 'miaam';
import Abir from '../entities/abir';
import Akshar from '../entities/akshar';
import Box from '../entities/box';
import Noman from '../entities/noman';
import Player from '../entities/player';
import Prof from '../entities/prof';
class MosqueScene extends Scene {
    static preload = {
        assets: [
            {
                name: 'mosqueMap',
                url: './assets/tilemap/Mosque.json',
                type: 'map',
            },
        ],
        entities: [Player, Noman]
    }
    #player;
    #camera;

    onStart() {
        super.onStart();
        const map = MosqueScene.assets.maps.mosqueMap;
        this.map = map;

        this.#player = new Player({ name: 'player' });
        this.#player.sprite.anchor.set(0.2, 0.75);
        this.addEntity({ layer: 'Objects', entity: this.#player });
        this.noman = new Noman({ name: 'noman' });
        this.addEntity({ layer: 'NPC', entity: this.noman });
        
        const gameScreen = GameManager.instance.app.screen;
        this.#camera = new Camera(this, gameScreen.width, gameScreen.height);
        this.#camera.centerOver(this.#player);

        const scenes = SceneManager.instance;
        scenes.view = MosqueScene.name;
        scenes.world = MosqueScene.name;
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

export default MosqueScene;