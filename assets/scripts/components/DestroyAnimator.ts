import { IAnimator } from "../interface/IAnimator";

const {ccclass, property} = cc._decorator;

@ccclass
export class DestroyAnimator extends cc.Component implements IAnimator {
    public animate(duration: number = 1): void {
        cc.tween(this.node)
            .to(duration, {y: this.node.y - 200, opacity: 0}, {easing: cc.easing.backIn})
            .call(() => {
                this.node.destroy();
            })
            .start();
    }
}