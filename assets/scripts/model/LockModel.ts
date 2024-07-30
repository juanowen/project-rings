import { PieceType } from "../enum/PieceType";
import { LockablePieceModel } from "./LockablePieceModel";
import { RenderModel } from "./RenderModel";

export namespace LockModel {
    export type Data = RenderModel.Data & {
        ownerModel: LockablePieceModel,
        lockedTarget: LockablePieceModel,
        radius: number,
        isLocked: boolean,
    }
}

export class LockModel extends RenderModel {
    protected _ownerModel: LockablePieceModel;
    protected _lockedTarget: LockablePieceModel;
    protected _radius: number;

    public initData(data: LockModel.Data): void {
        super.initData(data);

        this._type = PieceType.Lock;
        this._lockedTarget = data.lockedTarget;
        this._radius = data.radius;
    }

    public getData(): LockModel.Data {
        return Object.assign(super.getData(), {
            ownerModel: this._ownerModel,
            lockedTarget: this._lockedTarget,
            radius: this._radius,
            isLocked: !!this._lockedTarget
        });
    }

    public setOwnerModel(ownerModel: LockablePieceModel): void {
        this._ownerModel = ownerModel;
    }
}
