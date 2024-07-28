import { LockablePieceModel } from "../model/LockablePieceModel";
import { BaseView } from "./BaseView";
import { IView } from "../interface/IView";
import { LockView } from "./LockView";
import { IController } from "../interface/IController";

const { ccclass } = cc._decorator;

@ccclass
export class LockablePieceView extends BaseView implements IView<LockablePieceModel.Data> {
    protected _locks: Set<LockView> = new Set();

    public get locks(): LockView[] {
        return Array.from(this._locks);
    }

    protected _collisionHandler: IController<LockablePieceView> = null;

    public set collisionHandler(value: IController<LockablePieceView>) {
        this._collisionHandler = value;
    }

    public addLockView(view: LockView): void {
        this._locks.add(view);

        this._collisionHandler?.handle(this);
    }

    public deleteLockView(view: LockView): void {
        this._locks.delete(view);

        this._collisionHandler?.handle(this);
    }
}