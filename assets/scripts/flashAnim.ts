import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('flashAnim')
export class flashAnim extends Component {

    endGame() {
        director.loadScene('Gameover')
    }
}

