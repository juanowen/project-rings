import { ColorType } from "../scripts/enum/ColorType";
import { PieceType } from "../scripts/enum/PieceType";
import { LockablePieceModel } from "../scripts/model/LockablePieceModel";
import { FieldPiece } from "./FieldPiece";
import { PiecePrefabMap } from "./PiecePrefabMap";
import { PieceColorMap } from "./PieceColorMap";
import { EnumUtil } from "./EnumUtil";

import { saveExportJson } from './DataExporter';

const { ccclass, property } = cc._decorator;

@ccclass
export class FieldBuilderComponent extends cc.Component {
    @property
    protected _pieces: FieldPiece[] = [];
    protected _exportField: boolean = false;

    @property
    public editConfigs: boolean = false;

    @property({
        type: [PiecePrefabMap],
        visible() { return this.editConfigs },
    })
    protected _prefabConfig: PiecePrefabMap[] = [];

    @property({
        type: [PieceColorMap],
        visible() { return this.editConfigs },
    })
    protected _ringSpriteConfig: PieceColorMap[] = [];

    @property({
        type: [PieceColorMap],
        visible() { return this.editConfigs },
    })
    protected _lockSpriteConfig: PieceColorMap[] = [];

    @property({
        type: cc.Prefab,
        visible() { return this.editConfigs },
    })
    protected _lockPrefab: cc.Prefab = null;

    @property({
        type: [FieldPiece],
        visible: true,
    })
    public get pieces(): FieldPiece[] {
        return this._pieces;
    }
    public set pieces(value: FieldPiece[]) {
        this._pieces = value;

        this.node.children.forEach(child => child.destroy());

        if (Array.isArray(this._pieces)) {
            this._pieces.forEach(piece => {
                const node = new cc.PrivateNode('Piece');
                this.node.addChild(node);

                piece.node = node;
                piece.redraw(this._lockPrefab, this._prefabConfig, this._ringSpriteConfig, this._lockSpriteConfig);
            });
        }
    }

    @property
    public exportName: string = 'field';

    @property({
        visible: true,
    })
    public get exportField(): boolean {
        return false;
    }
    public set exportField(value: boolean) {
        if (Array.isArray(this._pieces)) {
            const exportData = this._pieces.map(piece => {
                piece.redraw(this._lockPrefab, this._prefabConfig, this._ringSpriteConfig, this._lockSpriteConfig);

                const data = piece.model.serialize() as LockablePieceModel.SerializedData;

                data['type'] = EnumUtil.getCCEnumElement(PieceType, piece.type);
                data['color'] = EnumUtil.getCCEnumElement(ColorType, piece.color);
                data.locks.forEach(lock => {
                    lock['color'] = data['color'];
                });

                return data;
            });

            saveExportJson(exportData, this.exportName, 'assets/fieldBuilder/configs');
        }
    }
}