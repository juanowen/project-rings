import { BaseAnimator } from "./BaseAnimator";

const { ccclass } = cc._decorator;

@ccclass
export class DestroyAnimator extends BaseAnimator {
    public animate(): void {
        this._tween?.stop();

        this._tween = cc.tween(this.node)
            .delay(this._delay)
            .to(this._duration, { y: this.node.y - 200, opacity: 0 }, { easing: cc.easing.backIn })
            .call(() => {
                this.node.destroy();
            })
            .start();
    }
}