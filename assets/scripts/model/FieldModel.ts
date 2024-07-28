import { BaseModel } from "./BaseModel";
import { LockablePiece } from "./LockablePiece";

export namespace FieldModel {
    export type Data = {
        pieces: LockablePiece[],
    }
}

export class FieldModel extends BaseModel<FieldModel.Data> {
    private _pieces: LockablePiece[];

    setData(data: FieldModel.Data): void {
        this._pieces = data.pieces;
    }

    getData(): FieldModel.Data {
        return {
            pieces: this._pieces
        }
    }
}