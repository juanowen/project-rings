import { LockablePieceView } from "../view/LockablePieceView";
import { BaseModel } from "./BaseModel";
import { LockModel } from "./LockModel"

export namespace LockablePiece {
    export type Data = {
        x: number,
        y: number,
        locks: LockModel[],
        angle: number,
        view?: LockablePieceView
    }
}

export class LockablePiece extends BaseModel<LockablePiece.Data> {
    protected _x: number;
    protected _y: number;
    protected _locks: LockModel[];
    protected _angle: number;
    protected _view: LockablePieceView;

    public get angle(): number {
        return this._angle;
    }

    public set angle(value: number) {
        this._angle = value;
        this._view.render(this.getData());
    }

    public setData({ x, y, locks }: LockablePiece.Data): void {
        this._x = x;
        this._y = y;
        this._locks = locks;
    }

    public getData(): LockablePiece.Data {
        return {
            x: this._x,
            y: this._y,
            locks: this._locks,
            angle: this._angle
        }
    }
}