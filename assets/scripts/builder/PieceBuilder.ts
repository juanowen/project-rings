import { ConfigEntry } from "../type/Config";
import { PieceFactory } from "../factory/PieceFactory";
import { IGetter } from "../interface/IGetter";
import { FieldModel } from "../model/FieldModel";
import { IView } from "../interface/IView";
import { RenderModel } from "../model/RenderModel";

export namespace PieceBuilder {
    export type Options = {
        prefabGetter: IGetter<cc.Prefab>,
        spriteFrameGetter?: IGetter<cc.SpriteFrame>,
        fieldModel: FieldModel,
    }

    export type Payload = {
        configEntry: ConfigEntry,
    }
}

export abstract class PieceBuilder<Payload> implements PieceFactory.IPieceBuilder<Payload> {
    protected _prefabGetter: IGetter<cc.Prefab>;
    protected _spriteFrameGetter: IGetter<cc.SpriteFrame>;
    protected _fieldModel: FieldModel;

    constructor({prefabGetter, spriteFrameGetter, fieldModel}: PieceBuilder.Options) {
        this._prefabGetter = prefabGetter;
        this._spriteFrameGetter = spriteFrameGetter;
        this._fieldModel = fieldModel;
    }

    public async build(payload?: Payload): Promise<PieceFactory.PieceData> {
        const prefab = await this._prefabGetter.get();

        if (prefab) {
            const node = cc.instantiate(prefab);
            const data = await this._getPieceData(node, payload);

            data.view?.render(data.model.getData());

            return data;
        }
    }

    protected async _updateSpriteFrame(view: IView, params?: unknown) {
        if (view && this._spriteFrameGetter) {
            const spriteFrame = await this._spriteFrameGetter.get(params);
            
            view.changeSpriteFrame(spriteFrame);
        }
    }

    protected abstract _getPieceData(node: cc.Node, payload?: Payload): Promise<PieceFactory.PieceData>
    protected abstract _getView(node: cc.Node): IView
    protected abstract _getModel(payload: unknown): RenderModel
    protected abstract _bindHandlers(view: IView): void
}