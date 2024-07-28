import { BaseModel } from "./BaseModel";

namespace LockModel {
    export type Data = {
        isLocked: boolean,
        node: cc.Node,
    }
}

export class LockModel extends BaseModel<LockModel.Data> {
    private _isLocked: boolean = false;
    private _node: cc.Node = null;

    public setData({isLocked, node}: LockModel.Data): void {
        this._isLocked = isLocked;
        this._node = node;
    }

    public getData(): LockModel.Data {
        return {
            isLocked: this._isLocked,
            node: this._node
        }
    }
}
