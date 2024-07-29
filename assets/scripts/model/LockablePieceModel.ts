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
    protected _locks: LockModel[];
    protected _lockedBy: LockModel[];
    protected _isLocked: boolean;

    public initData(data: LockablePieceModel.Data): void {
        super.initData(data);

        this._locks = data.locks ?? [];
        this._lockedBy = data.lockedBy ?? [];
    }

    public getData(): LockablePieceModel.Data {
        return Object.assign(super.getData(), {
            locks: this._locks,
            lockedBy: this._lockedBy,
            isLocked: this._isLocked
        });
    }

    public updateLockedState(): void {
        const locks = [...this._locks, ...this._lockedBy];

        this._isLocked = locks.some((lock: LockModel) => lock.getData().isLocked);

        if (!this._isLocked) {
            this._rerenderView();
        }
    }
}