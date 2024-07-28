import { LockablePiece } from "./LockablePiece";

export namespace RingModel {
    export type Data = LockablePiece.Data & {
        gapAngle: number,
        gapRadius: number,
        startAngle: number,
    }
}

export class RingModel extends LockablePiece {
    private _gapAngle: number;
    private _gapRadius: number;
    private _startAngle: number;

    public setData(data: RingModel.Data): void {
        this._gapAngle = data.gapAngle;
        this._gapRadius = data.gapRadius;
        this._startAngle = data.startAngle;

        super.setData(data);
    }

    public getData(): RingModel.Data {
        return Object.assign({},
            super.getData(),
            {
                gapAngle: this._gapAngle,
                gapRadius: this._gapRadius,
                startAngle: this._startAngle
            }
        )
    }
}