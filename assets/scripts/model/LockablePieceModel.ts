import { LockModel } from "./LockModel"
import { RenderModel } from "./RenderModel";

export namespace LockablePieceModel {
    export type Data = RenderModel.Data & {
        locks: LockModel[],
        isLocked: boolean,
    }
}

export class LockablePieceModel extends RenderModel {
    protected _locks: LockModel[] = [];
    protected _isLocked: boolean = false;

    public setData(data: LockablePieceModel.Data): void {
        super.setData(data);

        this.updateLocks(data.locks);
    }

    public getData(): LockablePieceModel.Data {
        return Object.assign(super.getData(), {
            locks: this._locks,
            isLocked: this._isLocked
        });
    }

    public updateLocks(locks: LockModel[]) {
        this._locks = locks;

        this.updateLockedState();
    }

    public updateLockedState(): void {
        this._isLocked = this._locks.some((lock: LockModel) => lock.isLocked);
    }
}