import { PieceType } from "../enum/PieceType";
import { LockablePieceModel } from "./LockablePieceModel";
import { LockModel } from "./LockModel";

export namespace RingModel {
    export type Data = LockablePieceModel.Data & {
        isRotatable: boolean,
    }
}

export class RingModel extends LockablePieceModel {
    public initData(data: LockablePieceModel.Data): void {
        super.initData(data);

        this._type = PieceType.Ring;
    }

    public getData(): RingModel.Data {
        return Object.assign({ isRotatable: this._checkRotateAbility() }, super.getData());
    }

    protected _checkRotateAbility(): boolean {
        return this._locks.every((lock: LockModel) => !lock.getData().isLocked);
    }
}