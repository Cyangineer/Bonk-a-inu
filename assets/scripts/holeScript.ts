import { _decorator, Component, input, Input, EventKeyboard, Animation, AudioSource, AudioClip } from 'cc';
import { GameManager } from './GameManager';
import { inuScript } from './inuScript';
const { ccclass, property } = _decorator;

@ccclass('holeScript')
export class holeScript extends Component {
    @property key: number = 0;
    @property({ type: inuScript })
    private inu = null;
    @property(AudioClip)
    public woosh: AudioClip = null
    @property(AudioClip)
    public hit: AudioClip = null
    @property(AudioClip)
    public explosion: AudioClip = null

    public audioSource: AudioSource = new AudioSource()
    isAnimPlaying = false

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this)
    }

    onKeyDown(event: EventKeyboard) {
        if (event.keyCode == this.key) {
            this.bonked()
        }
    }

    start() {

    }

    update(deltaTime: number) {
        if (GameManager.instance.isGameOver()) {
            input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        }
    }

    bonked() {
        if (!this.isAnimPlaying) {
            this.audioSource.playOneShot(this.woosh, 0.3)
            this.isAnimPlaying = true
            if (this.inu.isHittable) {
                if (this.inu.inuType == 0) { // HIT A NORMAL INU
                    GameManager.instance.addTime(2)
                    GameManager.instance.addScore(10)
                    this.inu.stopAnim()
                    this.getComponent(Animation).crossFade("bonk", 0.3)
                    this.inu.isHittable = false
                }
                if (this.inu.inuType == 1) { // HIT A ROBOT INU
                    GameManager.instance.gameOver()
                    this.inu.stopAnim()
                    this.getComponent(Animation).crossFade("bonk-robot", 0.3)
                    this.inu.isHittable = false
                }
            } else {
                GameManager.instance.addTime(-2)
                this.getComponent(Animation).crossFade("bonk-miss", 0.3)
            }
        }
    }

    spawnNew() {
        this.isAnimPlaying = false
        this.inu.spawn()
    }

    animDone() {
        this.isAnimPlaying = false
    }

    playHitEffect() {
        this.audioSource.playOneShot(this.hit, 0.3)
    }

    playExplosionEffect() {
        this.audioSource.playOneShot(this.explosion, 1)
    }
}

