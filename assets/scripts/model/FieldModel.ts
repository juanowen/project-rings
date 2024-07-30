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
    protected _viewsByType: Record<string, Set<IView>> = {};
    protected _modelsByType: Record<string, Set<RenderModel>> = {};

    public initData(data: FieldModel.Data): void {
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
        const modelData = model.getData();

        this._pieces.set(view, model);
        this._addByType(modelData.type, this._viewsByType, view);
        this._addByType(modelData.type, this._modelsByType, model);

        model.view = view;
    }

    public removePiece(view: IView): void {
        const model = this.getPieceModel(view);
        const modelData = model.getData();

        this._removeByType(modelData.type, this._viewsByType, view);
        this._removeByType(modelData.type, this._modelsByType, model);
        
        this._pieces.delete(view);
    }

    public getViewsByType(type: string): IView[] {
        const register = this._viewsByType[type];

        if (register) {
            return Array.from(register);
        }

        return [];
    }

    public getModelsByType(type: string): RenderModel[] {
        const register = this._modelsByType[type];

        if (register) {
            return Array.from(register);
        }

        return [];
    }

    protected _addByType(type: string, register: Record<string, Set<unknown>>, entry: unknown): void {
        if (register[type] === undefined) {
            register[type] = new Set();
        }

        register[type].add(entry);
    }

    protected _removeByType(type: string, register: Record<string, Set<unknown>>, entry: unknown): void {
        if (register[type] !== undefined) {
            register[type].delete(entry);
        }
    }
}