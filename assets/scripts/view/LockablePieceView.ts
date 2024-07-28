import { LockablePieceModel } from "../model/LockablePieceModel";
import { BaseView } from "./BaseView";
import { IView } from "./IView";
import { LockView } from "./LockView";

const { ccclass, property } = cc._decorator;

@ccclass
export class LockablePieceView extends BaseView implements IView<LockablePieceModel.Data> {
    @property({
        type: [LockView],
        visible: true,
    })
    protected _locks: LockView[] = [];

    public addLockView(view: LockView): void {
        this._locks.push(view);
    }
}