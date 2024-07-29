import { LockablePieceModel } from "./LockablePieceModel";
import { RenderModel } from "./RenderModel";

export namespace LockModel {
    export type Data = RenderModel.Data & {
        lockedTarget: LockablePieceModel,
        radius: number,
        isLocked: boolean,
    }
}

export class LockModel extends RenderModel {
    protected _lockedTarget: LockablePieceModel;
    protected _radius: number;

    public initData(data: LockModel.Data): void {
        super.initData(data);

        this._lockedTarget = data.lockedTarget;
        this._radius = data.radius;
    }

    public getData(): LockModel.Data {
        return Object.assign(super.getData(), {
            lockedTarget: this._lockedTarget,
            radius: this._radius,
            isLocked: !!this._lockedTarget
        });
    }
}
