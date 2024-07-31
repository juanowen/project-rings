import { BaseAnimator } from "./BaseAnimator";

const { ccclass, property } = cc._decorator;

@ccclass
export class BlockAnimator extends BaseAnimator {
    protected _lastAngle: number = 0;

    @property({
        visible: true,
    })
    protected _cycleCount: number = 5;

    @property({
        visible: true,
    })
    protected _amplitude: number = 3;

    public animate(): void {
        if (this._tween) {
            this._tween.stop();
            this.node.angle = this._lastAngle;
        }

        this._lastAngle = this.node.angle;
        this._tween = cc.tween(this.node)
            .delay(this._delay);

        for (let i = 0; i < this._cycleCount - 1; i++) {
            this._tween.to(this._duration / this._cycleCount, { angle: this.node.angle - this._amplitude * (i % 2 ? 1 : -1) });
        }

        this._tween.to(this._duration / this._cycleCount, { angle: this.node.angle })
            .start();
    }
}