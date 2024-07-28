import { LockView } from "../view/LockView";
import { BaseModel } from "./BaseModel";

namespace LockModel {
    export type Data = {
        radius: number,
        angle: number,
        isLocked: boolean,
        view: LockView,
    }
}

export class LockModel extends BaseModel<LockModel.Data> {
    protected _radius: number;
    protected _angle: number;
    protected _isLocked: boolean;
    protected _view: LockView;

    public setData({ isLocked, view }: LockModel.Data): void {
        this._isLocked = isLocked ?? false;
        this._view = view;
    }

    public getData(): LockModel.Data {
        return {
            radius: this._radius,
            angle: this._angle,
            isLocked: this._isLocked,
            view: this._view
        }
    }
}
