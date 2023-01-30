import { _decorator, Component, Node, Label, Button, director } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('GameOver')
export class GameOver extends Component {
    @property({ type: Label })
    private scoreLabel = null;
    @property({ type: Button })
    public play: Button = null;

    onLoad() {
        this.scoreLabel.string = GameManager.instance.getScore()
        this.play.node.on(Button.EventType.CLICK, () => {
            GameManager.instance.resetGame()
            director.loadScene('Gameplay')
        }, this)
    }
}