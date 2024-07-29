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
        cc.macro.ENABLE_MULTI_TOUCH = false;

        this._initGame();
    }

    protected async _initGame() {
        if (this._config && this._fieldHolder) {
            const config = this._config.json;
            const pieces = [];

            if (Array.isArray(config)) {
                for (const entry of config) {
                    const payload = {configEntry: entry};
                    const {node} = await this._pieceFactory.createPiece(entry.type, payload);
                            
                    pieces.push(node);
                }
            }

            pieces.forEach(piece => {
                this._fieldHolder.addChild(piece);
            });
        }
    }
}