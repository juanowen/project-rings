import { IAnimator } from "../../interface/IAnimator";

const { ccclass, property } = cc._decorator;

@ccclass
export abstract class BaseAnimator extends cc.Component implements IAnimator {
    @property({
        visible: true,
    })
    protected _duration: number = 0.5;

    @property({
        visible: true,
    })
    protected _delay: number = 0.25;

    protected _tween: cc.Tween<unknown>;

    abstract animate(): void;
}