import { LockablePieceModel } from "../model/LockablePieceModel";
import { BaseView } from "./BaseView";
import { IView } from "../interface/IView";
import { LockView } from "./LockView";
import { IController } from "../interface/IController";
import { DestroyAnimator } from "../components/DestroyAnimator";

const { ccclass, property } = cc._decorator;

@ccclass
export class LockablePieceView extends BaseView implements IView<LockablePieceModel.Data> {
    @property({
        type: DestroyAnimator,
        visible: true,
    })
    protected _destroyAnimator: DestroyAnimator = null;

    protected _locks: Set<LockView> = new Set();
    protected _lockedBy: Set<LockView> = new Set();

    public get locks(): LockView[] {
        return Array.from(this._locks);
    }

    public get lockedBy(): LockView[] {
        return Array.from(this._lockedBy);
    }

    protected _collisionHandler: IController<LockablePieceView> = null;
    protected _destroyHandler: IController<LockablePieceView> = null;

    public set collisionHandler(value: IController<LockablePieceView>) {
        this._collisionHandler = value;
    }

    public set destroyHandler(value: IController<LockablePieceView>) {
        this._destroyHandler = value;
    }

    public addLockView(view: LockView): void {
        this._locks.add(view);
        
        this._collisionHandler?.handle(this);
    }

    public addLockedBy(view: LockView): void {
        this._lockedBy.add(view);

        this._collisionHandler?.handle(this);
    }

    public deleteLockedBy(view: LockView): void {
        this._lockedBy.delete(view);

        this._collisionHandler?.handle(this);
    }

    public rerender(data?: LockablePieceModel.Data): void {
        super.render(data);

        if (!data.isLocked) {
            this._destroyHandler?.handle(this);

            this._destroyAnimator?.animate();
        }
    }
}