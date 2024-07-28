import { LockablePieceModel } from "./LockablePieceModel";

export namespace RingModel {
    export type Data = LockablePieceModel.Data & {
        gapAngle: number,
        gapRadius: number,
    }
}

export class RingModel extends LockablePieceModel {
    protected _gapAngle: number;
    protected _gapRadius: number;

    public setData(data: RingModel.Data): void {
        super.setData(data);

        this._gapAngle = data.gapAngle;
        this._gapRadius = data.gapRadius;
    }

    public getData(): RingModel.Data {
        return Object.assign({},
            super.getData(),
            {
                gapAngle: this._gapAngle,
                gapRadius: this._gapRadius,
            }
        )
    }
}