import { LockablePieceModel } from "../model/LockablePieceModel";
import { BaseView } from "./BaseView";
import { IView } from "../interface/IView";
import { LockView } from "./LockView";
import { DestroyAnimator } from "../components/animator/DestroyAnimator";
import { IController } from "../interface/IController";

const { ccclass, property } = cc._decorator;

@ccclass
export class LockablePieceView extends BaseView implements IView<LockablePieceModel.Data> {
    @property({
        type: DestroyAnimator,
        visible: true,
    })
    protected _destroyAnimator: DestroyAnimator = null;

    protected _releaseHandler: IController<LockablePieceView> = null;

    public set releaseHandler(value: IController<LockablePieceView>) {
        this._releaseHandler = value;
    }

    protected _locks: Set<LockView> = new Set();

    public get locks(): LockView[] {
        return Array.from(this._locks);
    }

    public addLockView(view: LockView): void {
        this._locks.add(view);
    }

    public destroyView(): void {
        this._locks.forEach(view => view.destroyView());

        this._destroyAnimator?.animate();
    }

    public release(): void {
        this._releaseHandler?.handle(this);
    }
}