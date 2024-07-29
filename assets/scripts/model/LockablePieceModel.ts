import { LockModel } from "./LockModel"
import { RenderModel } from "./RenderModel";

export namespace LockablePieceModel {
    export type Data = RenderModel.Data & {
        locks: LockModel[],
        lockedBy: LockModel[],
        isLocked: boolean,
    }
}

export class LockablePieceModel extends RenderModel {
    protected _locks: LockModel[] = [];
    protected _lockedBy: LockModel[] = [];
    protected _isLocked: boolean = true;

    public setData(data: LockablePieceModel.Data): void {
        super.setData(data);

        this._locks = data.locks ?? [];
        this.updateLockedBy(data.lockedBy);
    }

    public getData(): LockablePieceModel.Data {
        return Object.assign(super.getData(), {
            locks: this._locks,
            lockedBy: this._lockedBy,
            isLocked: this._isLocked
        });
    }

    public updateLocks(locks: LockModel[]) {
        this._locks = locks ?? [];

        this.updateLockedState();
    }

    public updateLockedBy(lockedBy: LockModel[]) {
        this._lockedBy = lockedBy ?? [];

        this.updateLockedState();
    }

    public updateLockedState(): void {
        const locks =  [...this._locks, ...this._lockedBy];

        this._isLocked = locks.some((lock: LockModel) => lock.getData().isLocked);
    }
}