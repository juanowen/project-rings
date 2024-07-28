import { LockView } from "../view/LockView";
import { BaseModel } from "./BaseModel";
import { LockablePieceModel } from "./LockablePieceModel";

export namespace LinkModel {
    export type Data = {
        links: Map<LockView, LockablePieceModel>,
    }
}

export class LinkModel extends BaseModel<LinkModel.Data> {
    protected _links: Map<LockView, LockablePieceModel> = new Map();

    public setData(data: LinkModel.Data): void {
        this._links = data.links;
    }

    public getData(): LinkModel.Data {
        return {
            links: this._links
        }
    }

    public addLink(view: LockView, model: LockablePieceModel): void {
        this._links.set(view, model);
    }

    public getLinkedModel(view: LockView): LockablePieceModel {
        return this._links.get(view);
    }
}