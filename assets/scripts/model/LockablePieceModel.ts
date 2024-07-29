import { LockModel } from "./LockModel"
import { RenderModel } from "./RenderModel";

export namespace LockablePieceModel {
    export type Data = RenderModel.Data & {
        locks: LockModel[],
        isLocked: boolean,
    }
}

export class LockablePieceModel extends RenderModel {
    protected _locks: LockModel[];
    protected _isLocked: boolean;

    public initData(data: LockablePieceModel.Data): void {
        super.initData(data);

        this._locks = data.locks ?? [];
    }

    public getData(): LockablePieceModel.Data {
        return Object.assign(super.getData(), {
            locks: this._locks,
            isLocked: this._isLocked
        });
    }

    public updateLockedState(): void {
        const locks = [...this._locks];

        this._isLocked = locks.some((lock: LockModel) => lock.getData().isLocked);
    }
}