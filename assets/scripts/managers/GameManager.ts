// import { FieldModel } from "../model/FieldModel";
// import { RenderModel } from "../model/RenderModel";
// import { IView } from "../interface/IView";
import { ConfigEntry } from "../type/Config";
import { Injector } from "../injector/Injector";
import { PieceFactory } from "../factory/PieceFactory";

const { ccclass, property } = cc._decorator;

@ccclass
export class GameManager extends cc.Component {
    @property({
        type: cc.JsonAsset,
        visible: true,
    })
    protected _config: cc.JsonAsset = null;

    @property({
        type: cc.Node,
        visible: true,
    })
    protected _fieldHolder: cc.Node = null;

    @Injector('PieceFactory')
    protected _pieceFactory: PieceFactory;

    protected onLoad(): void {
        this._initGame();
    }

    protected _initGame(): void {
        if (this._config && this._fieldHolder) {
            const config = this._config.json;
            // const fieldModel = new FieldModel();

            if (Array.isArray(config)) {
                // const fieldData: Map<IView, RenderModel> = new Map();

                config.forEach(async (piece: ConfigEntry) => {
                    const payload = {configEntry: piece};
                    const {node, view, model} = await this._pieceFactory.createPiece(piece.type, payload);
                            
                    // fieldData.set(view, model);
                    this._fieldHolder.addChild(node);
                });

                // fieldModel.setData({ pieces: fieldData });
            }
        }
    }
}