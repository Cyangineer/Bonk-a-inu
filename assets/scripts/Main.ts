import { _decorator, Component, Node, Button, director, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    @property({ type: Button })
    public play: Button = null;
    @property({ type: Button })
    public madeBy: Button = null;

    onLoad() {
        this.play.node.on(Button.EventType.CLICK, () => {
            director.loadScene('Gameplay')
        }, this)
    }

    start() {

    }

    update(deltaTime: number) {

    }
}

