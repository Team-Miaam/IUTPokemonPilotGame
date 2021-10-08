import { Scene, SceneManager, Camera, GameManager, PhysicsManager, Dialogue, Keyboard } from 'miaam';
import Abir from '../entities/abir';
import Akshar from '../entities/akshar';
import Box from '../entities/box';
import Noman from '../entities/noman';
import Player from '../entities/player';
import Prof from '../entities/prof';
import MosqueScene from './mosqueScene';
class MainScene extends Scene {
    static preload = {
        assets: [
            {
                name: 'minecraft',
                url: './assets/fonts/mine.xml',
                type: 'font',
            },
            {
                name: 'mainMap',
                url: './assets/tilemap/IUTcampusMap.json',
                type: 'map',
            },
        ],
        entities: [Player, Noman, Prof, Akshar, Abir]
    }
    #player;
    #camera;
    dialogues;
    font = 'Minecraft';
    onStart() {
        super.onStart();
        const map = MainScene.assets.maps.mainMap;
        this.map = map;


        // this.#player = new Box({ name: 'box', props: { x: 900, y: 410, width: 32, height: 32 } });
        this.#player = new Player({ name: 'player' });
        this.addEntity({ layer: 'Objects', entity: this.#player });
        this.noman = new Noman({ name: 'noman' });
        this.addEntity({ layer: 'NPC', entity: this.noman });
        this.prof = new Prof({ name: 'prof' });
        // console.log(this.prof.dialogues);
        this.addEntity({ layer: 'NPC', entity: this.prof });
        this.akshar = new Akshar({ name: 'akshar' });
        this.addEntity({ layer: 'NPC', entity: this.akshar });
        this.abir = new Abir({ name: 'abir' });
        this.addEntity({ layer: 'NPC', entity: this.abir });

        const gameScreen = GameManager.instance.app.screen;
        this.#camera = new Camera(this, gameScreen.width, gameScreen.height);
        this.#camera.centerOver(this.#player);

        const scenes = SceneManager.instance;
        scenes.view = MainScene.name;
        scenes.world = MainScene.name;
        PhysicsManager.instance.engine.gravity.y = 0;

        PhysicsManager.instance.events.addEventListener('enterMosque', this.mosqueEntry);
        PhysicsManager.instance.events.addEventListener('talkToProf', this.talkToProf);
        // this.dialogues = new Dialogue(nomanDialogue, 'Minecraft');
        this.initiateKeyboard();

    }

    initiateKeyboard() {
        Keyboard.key('e').addActionOnDown({
            name: 'nextText',
            action: () => {
                this.dialogues.nextText();
            },
        });
    }

    talkToProf = () => {
        this.dialogues = new Dialogue(this.prof.dialogues, this.font);
    }

    onUpdate(ticker) {
        super.onUpdate(ticker);
        this.#camera.follow(this.#player);
        PhysicsManager.instance.update();
    }

    onDestroy() {
        super.onDestroy();
    }

    mosqueEntry() {
        const scenes = SceneManager.instance;
        scenes.stopScene();
        scenes.startScene(MosqueScene.name);

    }
}

export default MainScene;