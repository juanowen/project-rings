import { PieceType } from "../scripts/enum/PieceType";
import { LockablePieceModel } from "../scripts/model/LockablePieceModel";
import { FieldPiece } from "./FieldPiece";
import { PieceFactory } from "../scripts/factory/PieceFactory";
import { FieldModel } from "../scripts/model/FieldModel";
import { RingPieceBuilder } from "../scripts/builder/RingPieceBuilder";
import { LockablePieceBuilder } from "../scripts/builder/LockablePieceBuilder";
import { BlockerPieceBuilder } from "../scripts/builder/BlockerPieceBuilder";
import { SpriteFrameGetterComponent } from "./SpriteFrameGetterComponent";
import { PrefabGetterComponent } from "./PrefabGetterComponent";

import { saveExportJson } from './DataExporter';

const { ccclass, property } = cc._decorator;

@ccclass
export class FieldBuilderComponent extends cc.Component {
    @property
    protected _pieces: FieldPiece[] = [];
    @property
    protected _fieldData: Array<LockablePieceModel.SerializedData> = [];

    protected _model: FieldModel = null;
    protected _exportField: boolean = false;
    protected _pieceFactory: PieceFactory = null;

    @property({
        type: PrefabGetterComponent,
        visible: true,
    })
    protected _prefabGetter: PrefabGetterComponent = null;

    @property({
        type: SpriteFrameGetterComponent,
        visible: true,
    })
    protected _ringSpriteFrameGetter: SpriteFrameGetterComponent = null;

    @property({
        type: SpriteFrameGetterComponent,
        visible: true,
    })
    protected _lockSpriteFrameGetter: SpriteFrameGetterComponent = null;

    @property({
        type: [FieldPiece],
        visible: true,
    })
    public get pieces(): FieldPiece[] {
        return this._pieces;
    }
    public set pieces(value: FieldPiece[]) {
        this._pieces = value;

        this._buildField();
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
        saveExportJson(this._fieldData, this.exportName, 'assets/fieldBuilder/configs');
    }

    protected _configureBuilder(): void {
        this._fieldData = [];
        this._model = new FieldModel();

        if (!this._pieceFactory) {
            const blockerPieceBuilder = new BlockerPieceBuilder({
                prefabGetter: this._prefabGetter,
                spriteFrameGetter: this._lockSpriteFrameGetter,
                fieldModel: this._model,
                prefabName: 'LockView',
            });

            this._pieceFactory = new PieceFactory({
                builderMap: {
                    [PieceType.Ring]: new RingPieceBuilder({
                        prefabGetter: this._prefabGetter,
                        spriteFrameGetter: this._ringSpriteFrameGetter,
                        fieldModel: this._model,
                        blockerBuilder: blockerPieceBuilder,
                        prefabName: 'Ring',
                    }),
                    
                    [PieceType.LockablePiece]: new LockablePieceBuilder({
                        prefabGetter: this._prefabGetter,
                        fieldModel: this._model,
                        blockerBuilder: blockerPieceBuilder,
                        prefabName: 'Lock',
                    }),
                }
            });
        }
    }

    protected async _buildField() {
        this._configureBuilder();
        this.node.children.forEach(child => child.destroy());
        
        const field = new cc.PrivateNode('Field');
        this.node.addChild(field);

        if (Array.isArray(this._pieces)) {
            for (const piece of this._pieces) {
                const pieceData = piece.getData();
                const {node} = await this._pieceFactory.createPiece(pieceData.type, {configEntry: pieceData});

                this._fieldData.push(pieceData);
                field.addChild(node);
            }
        }
    }
}