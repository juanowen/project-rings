import { LockView } from "../view/LockView";
import { RenderModel } from "./RenderModel";

export namespace LockModel {
    export type Data = RenderModel.Data & {
        radius: number,
        isLocked: boolean,
    }
}

export class LockModel extends RenderModel {
    protected _radius: number;
    protected _isLocked: boolean;

    public setData(data: LockModel.Data): void {
        super.setData(data);

        this._radius = data.radius;
        this._isLocked = data.isLocked ?? false;
    }

    public getData(): LockModel.Data {
        return Object.assign(super.getData(), {
            radius: this._radius,
            isLocked: this._isLocked
        });
    }
}
