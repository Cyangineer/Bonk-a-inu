import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, Sprite, Animation, resources, SpriteFrame, } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('inuScript')
export class inuScript extends Component {
    @property({ type: SpriteFrame })
    private normalInu = null;
    @property({ type: SpriteFrame })
    private robotInu = null;
    @property isHittable: Boolean = false

    public inuType = 0

    onLoad() {

    }
    start() {
        this.spawn()
    }

    update(deltaTime: number) {

    }

    spawn() {
        const sprite = this.getComponent(Sprite);
        let randomType = Math.random()
        if (randomType < .25) {
            this.inuType = 1
            sprite.spriteFrame = this.robotInu;
        } else {
            this.inuType = 0
            sprite.spriteFrame = this.normalInu;
        }
        let randomNum = Math.random() * (2 - 0.5) + 0.5;
        this.getComponent(Animation).crossFade("showInu", 0.3)
        this.getComponent(Animation).getState("showInu").delay = randomNum
    }

    show() {
        let randomNum = Math.random() * (1 - 0.5) + 0.5;
        this.getComponent(Animation).crossFade("showInu", 0.3)
        this.getComponent(Animation).getState("showInu").delay = randomNum
    }

    shown() {
        this.hide()
    }

    hide() {
        let randomNum = Math.random() * (1.5 - 0.5) + 0.5;
        this.getComponent(Animation).crossFade("hideInu", 0.3)
        this.getComponent(Animation).getState("hideInu").delay = randomNum
    }

    hidden() {
        this.spawn()
    }

    stopAnim() {
        this.getComponent(Animation).getState("showInu").stop()
        this.getComponent(Animation).getState("hideInu").stop()
    }
}