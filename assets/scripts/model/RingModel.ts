import { LockablePieceModel } from "./LockablePieceModel";
import { LockModel } from "./LockModel";

export namespace RingModel {
    export type Data = LockablePieceModel.Data & {
        gapRange: GapRange,
        isRotatable: boolean,
    }

    export type GapRange = {
        minAngle: number,
        maxAngle: number,
    }
}

export class RingModel extends LockablePieceModel {
    protected _gapRange: RingModel.GapRange;

    public initData(data: RingModel.Data): void {
        super.initData(data);

        this._gapRange = data.gapRange;
    }

    public getData(): RingModel.Data {
        return Object.assign({
            gapRange: this._gapRange,
            isRotatable: this._checkRotateAbility()
        }, super.getData());
    }

    protected _checkRotateAbility(): boolean {
        return this._locks.every((lock: LockModel) => !lock.getData().isLocked);
    }
}