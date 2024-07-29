import { IAnimator } from "../interface/IAnimator";

const { ccclass, property } = cc._decorator;

@ccclass
export class DestroyAnimator extends cc.Component implements IAnimator {
    @property({
        visible: true,
    })
    protected _duration: number = 0.5;

    @property({
        visible: true,
    })
    protected _delay: number = 0.25;

    public animate(): void {
        cc.tween(this.node)
            .delay(this._delay)
            .to(this._duration, { y: this.node.y - 200, opacity: 0 }, { easing: cc.easing.backIn })
            .call(() => {
                this.node.destroy();
            })
            .start();
    }
}