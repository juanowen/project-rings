import { BaseModel } from "./BaseModel";
import { LockModel } from "./LockModel"

export namespace LockablePiece {
    export type Data = {
        x: number,
        y: number,
        radius: number,
        locks: Lock[],
        node: cc.Node,
    }

    export type Lock = {
        angle: number,
        lock: LockModel,
    }
}

export class LockablePiece extends BaseModel<LockablePiece.Data> {
    private _x: number;
    private _y: number;
    private _radius: number;
    private _locks: LockablePiece.Lock[];
    private _node: cc.Node;

    public setData({ locks }: LockablePiece.Data): void {
        this._locks = locks;
    }

    public getData(): LockablePiece.Data {
        return {
            x: this._x,
            y: this._y,
            radius: this._radius,
            locks: this._locks,
            node: this._node
        }
    }
}