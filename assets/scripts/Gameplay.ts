import { _decorator, Component, Node, Sprite, Animation, Label } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Gameplay')
export class Gameplay extends Component {
    @property({ type: Label })
    private timerLabel = null;
    @property({ type: Label })
    private scoreLabel = null;
    @property({ type: Node })
    public flash = null;

    onLoad() {
        GameManager.instance.startTime()
    }

    update(deltaTime: number) {
        this.timerLabel.string = ` ${GameManager.instance.getTime()} `
        this.scoreLabel.string = GameManager.instance.getScore()
        if (GameManager.instance.isGameOver()) {
            this.startFlash()
        }
        if (GameManager.instance.getTime() <= 0) {
            GameManager.instance.gameOver()
        }
    }

    startFlash() {
        this.flash.getComponent(Animation).crossFade("flash", 0.3)
    }
}

