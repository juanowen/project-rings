import { ConfigLockEntry } from "../type/Config";
import { PieceFactory } from "../factory/PieceFactory";
import { LockModel } from "../model/LockModel";
import { LockView } from "../view/LockView";
import { PieceBuilder } from "./PieceBuilder";
import { IView } from "../interface/IView";
import { RenderModel } from "../model/RenderModel";

export namespace BlockerPieceBuilder {
    export type Payload = {
        configEntry: ConfigLockEntry
    }
}

export class BlockerPieceBuilder extends PieceBuilder<BlockerPieceBuilder.Payload> {
    protected async _getPieceData(node: cc.Node, payload?: BlockerPieceBuilder.Payload): Promise<PieceFactory.PieceData> {
        const view = this._getView(node);
        const model = this._getModel(payload);
            
        this._bindHandlers(view);

        this._fieldModel.addPiece(view, model);

        this._updateSpriteFrame(view, payload.configEntry.color);

        return {node, view, model};
    }

    protected _getView(node: cc.Node): IView {
        return node.getComponent(LockView);
    }

    protected _getModel(payload: BlockerPieceBuilder.Payload): RenderModel {
        return new LockModel(payload.configEntry)
    }

    protected _bindHandlers(view: IView): void {}
}