import { PieceType } from "../enum/PieceType";
import { LockModel } from "./LockModel"
import { RenderModel } from "./RenderModel";

export namespace LockablePieceModel {
    export type Data = RenderModel.Data & {
        locks: LockModel[],
        isLocked: boolean,
    }

    export type SerializedData = RenderModel.Data & {
        locks: LockModel.SerializedData[],
    }
}

export class LockablePieceModel extends RenderModel {
    protected _locks: LockModel[];
    protected _isLocked: boolean;

    public initData(data: LockablePieceModel.Data): void {
        super.initData(data);

        this._type = PieceType.LockablePiece;
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

    public serialize(): LockablePieceModel.SerializedData {
        return Object.assign(
            {
                locks: this._locks.map(lock => lock.serialize())
            },
            super.serialize()
        );
    }
}