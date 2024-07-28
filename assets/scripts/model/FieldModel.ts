import { LockablePieceView } from "../view/LockablePieceView";
import { BaseModel } from "./BaseModel";
import { LockablePiece } from "./LockablePiece";

export namespace FieldModel {
    export type Data = {
        pieces: Map<LockablePieceView, LockablePiece>,
    }
}

export class FieldModel extends BaseModel<FieldModel.Data> {
    protected _pieces: Map<LockablePieceView, LockablePiece>;

    setData(data: FieldModel.Data): void {
        this._pieces = data.pieces;
    }

    getData(): FieldModel.Data {
        return {
            pieces: this._pieces
        }
    }

    public getPieceModel(view: LockablePieceView): LockablePiece {
        return this._pieces.get(view);
    }
}