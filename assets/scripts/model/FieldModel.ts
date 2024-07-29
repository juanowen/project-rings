import { IView } from "../interface/IView";
import { BaseModel } from "./BaseModel";
import { RenderModel } from "./RenderModel";

export namespace FieldModel {
    export type Data = {
        pieces: Map<IView, RenderModel>,
    }
}

export class FieldModel extends BaseModel<FieldModel.Data> {
    protected _pieces: Map<IView, RenderModel> = new Map();

    public setData(data: FieldModel.Data): void {
        this._pieces = data.pieces;
    }

    public getData(): FieldModel.Data {
        return {
            pieces: this._pieces
        }
    }

    public getPieceModel(view: IView): RenderModel {
        return this._pieces.get(view);
    }

    public addPiece(view: IView, model: RenderModel): void {
        this._pieces.set(view, model);

        model.view = view;
    }

    public removePiece(view: IView): void {
        this._pieces.delete(view);
    }
}