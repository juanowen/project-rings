import { LockablePieceModel } from "./LockablePieceModel";

export namespace RingModel {
    export type Data = LockablePieceModel.Data & {
        gapRange: GapRange,
    }

    export type GapRange = {
        minAngle: number,
        maxAngle: number,
    }
}

export class RingModel extends LockablePieceModel {
    protected _gapRange: RingModel.GapRange;

    public setData(data: RingModel.Data): void {
        super.setData(data);

        this._gapRange = data.gapRange;
    }

    public getData(): RingModel.Data {
        return Object.assign({gapRange: this._gapRange}, super.getData());
    }
}