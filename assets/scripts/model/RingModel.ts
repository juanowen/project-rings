import { LockablePiece } from "./LockablePiece";

export namespace RingModel {
    export type Data = LockablePiece.Data & {
        gapAngle: number,
        gapRadius: number,
        startAngle: number,
    }
}

export class RingModel extends LockablePiece {
    protected _gapAngle: number;
    protected _gapRadius: number;
    protected _startAngle: number;

    public setData(data: RingModel.Data): void {
        this._gapAngle = data.gapAngle;
        this._gapRadius = data.gapRadius;
        this._startAngle = data.startAngle;
        this._angle = data.startAngle;
        this._view = data.view;

        super.setData(data);
    }

    public getData(): RingModel.Data {
        return Object.assign({},
            super.getData(),
            {
                gapAngle: this._gapAngle,
                gapRadius: this._gapRadius,
                startAngle: this._startAngle,
            }
        )
    }
}