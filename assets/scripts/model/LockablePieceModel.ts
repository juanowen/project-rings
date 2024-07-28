import { LockModel } from "./LockModel"
import { RenderModel } from "./RenderModel";

export namespace LockablePieceModel {
    export type Data = RenderModel.Data & {
        locks: LockModel.Data[],
    }
}

export class LockablePieceModel extends RenderModel {
    protected _locks: LockModel.Data[];

    public setData(data: LockablePieceModel.Data): void {
        super.setData(data);

        this._locks = data.locks;
    }

    public getData(): LockablePieceModel.Data {
        return Object.assign(super.getData(), {
            locks: this._locks,
        });
    }
}