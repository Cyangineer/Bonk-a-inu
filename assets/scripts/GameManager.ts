import { director, math } from "cc";

export class GameManager {

    private static _instance: GameManager;

    static get instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new GameManager();
        return this._instance;
    }

    // TIME MANAGER
    private timeRemaining: number = 10;
    private intervalId;

    public addTime(value: number) {
        this.timeRemaining += value;
        math.clamp(this.timeRemaining, 0, Number.MAX_SAFE_INTEGER);
    }

    public startTime() {
        this.intervalId = setInterval(() => {
            this.timeRemaining = this.timeRemaining - 1;
            if (this.timeRemaining <= 0) {
                clearInterval(this.intervalId)
            }
        }, 1000)
    }

    public getTime() {
        return ` ${this.timeRemaining} `;
    }

    public resetTime() {
        this.timeRemaining = 30
    }

    // SCORE MANAGER
    private currentScore: number = 0;

    public getScore() {
        return ` Score: ${this.currentScore} `;
    }

    public resetScore() {
        this.currentScore = 0;
    }

    public addScore(value: number) {
        this.currentScore += value;
        math.clamp(this.currentScore, 0, Number.MAX_SAFE_INTEGER);
    }

    // GAME MANAGER
    private isGameover = false
    gameOver() {
        this.timeRemaining = 0;
        clearInterval(this.intervalId)
        this.isGameover = true
    }

    isGameOver(): boolean {
        return this.isGameover
    }

    resetGame() {
        this.resetScore()
        this.resetTime()
        this.isGameover = false
    }
}