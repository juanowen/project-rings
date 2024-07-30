import { ColorType } from "../scripts/enum/ColorType";
import { PieceType } from "../scripts/enum/PieceType";
import { LockablePieceModel } from "../scripts/model/LockablePieceModel";
import { LockModel } from "../scripts/model/LockModel";
import { RenderModel } from "../scripts/model/RenderModel";
import { AngleUtil } from "../scripts/utils/AngleUtil";
import { BaseView } from "../scripts/view/BaseView";
import { LockView } from "../scripts/view/LockView";

import { saveExportJson } from './DataExporter';

const { ccclass, property } = cc._decorator;

const CELL_WIDTH: number = 462;
const CELL_HEIGHT: number = 400;

const convertPieceType = (type: number) => {
    return Object.values(PieceType)[type];
}
const convertColorType = (type: number) => {
    return Object.values(ColorType)[type];
}

const pieceTypeEnum = Object.values(PieceType).reduce((pv, type, i) => {
    if (type !== PieceType.Lock) {
        pv[type] = i;
    }

    return pv;
}, {});

const colorTypeEnum = Object.values(ColorType).reduce((pv, type, i) => {
    pv[type] = i;

    return pv;
}, {});

@ccclass('PiecePrefabMap')
class PiecePrefabMap {
    @property({
        type: cc.Enum(pieceTypeEnum)
    })
    public pieceType: number = 0;

    @property({
        type: cc.Prefab
    })
    public prefab: cc.Prefab = null;
}

@ccclass('PieceColorMap')
class PieceColorMap {
    @property({
        type: cc.Enum(colorTypeEnum)
    })
    public colorType: number = 0;

    @property({
        type: cc.SpriteFrame
    })
    public spriteFrame: cc.SpriteFrame = null;
}


@ccclass('LockPiece')
class LockPiece {
    @property()
    public angle: number = 0;
}

@ccclass('FieldPiece')
class FieldPiece {
    @property({
        type: cc.Enum(pieceTypeEnum),
        visible: true,
    })
    public type: number = 0;

    @property({
        type: cc.Enum(colorTypeEnum),
        visible: true,
    })
    public color: number = 0;

    @property()
    public x: number = 0;

    @property()
    public y: number = 0;

    @property()
    public angle: number = 0;

    @property({
        type: [LockPiece],
        visible() {
            return convertPieceType(this.type) === PieceType.Ring;
        }
    })
    public locks: LockPiece[] = [];

    @property({ visible: false })
    public node: cc.Node = null;

    @property({ visible: false })
    public model: RenderModel = null;

    protected _renderNode: cc.Node;

    public redraw(lockPrefab: cc.Prefab, prefabConfig: PiecePrefabMap[], ringColorMap: PieceColorMap[], lockColorMap: PieceColorMap[]) {
        const prefab = prefabConfig.find(({ pieceType }) => pieceType === this.type)?.prefab;
        if (prefab) {
            this.node.children.forEach(child => child.destroy());

            this._renderNode = cc.instantiate(prefab);

            this.node.addChild(this._renderNode);

            const position = this._countPos();

            this.model = new LockablePieceModel();
            this.model.updateData({
                type: convertPieceType(this.type),
                x: position.x,
                y: position.y,
                angle: this.angle
            });

            if (convertPieceType(this.type) === PieceType.LockablePiece) {
                this.locks = [];

                [0, 180].forEach(angle => {
                    const lockPiece = new LockPiece();
                    lockPiece.angle = angle;

                    this.locks.push(lockPiece);
                });
            }

            const viewSpriteFrame = ringColorMap.find(({ colorType }) => colorType === this.color)?.spriteFrame;
            const lockSpriteFrame = lockColorMap.find(({ colorType }) => colorType === this.color)?.spriteFrame;

            const view = this._renderNode.getComponent(BaseView);
            viewSpriteFrame && view.changeSpriteFrame(viewSpriteFrame);
            view.render(this.model.getData());


            this._createLocks(lockPrefab, lockSpriteFrame);
        }
    }

    protected _countPos(): cc.Vec2 {
        switch (convertPieceType(this.type)) {
            case PieceType.Ring: {
                return cc.v2(
                    (this.x + (this.y % 2 ? 0 : 0.5)) * CELL_WIDTH,
                    -this.y * CELL_HEIGHT,
                );
            }

            case PieceType.LockablePiece: {
                const angle = AngleUtil.degreeToRad(this.angle);
                return cc.v2(
                    (this.x + (this.y % 2 ? 0 : 0.5)) * CELL_WIDTH - CELL_WIDTH / 2 * Math.cos(angle),
                    -this.y * CELL_HEIGHT - CELL_WIDTH / 2 * Math.sin(angle),
                );
            }
        }
    }

    protected _countLockRadius(): number {
        if (convertPieceType(this.type) === PieceType.Ring) {
            return CELL_WIDTH / 2;
        }

        return 0;
    }

    protected _createLocks(lockPrefab: cc.Prefab, spriteFrame: cc.SpriteFrame): void {
        if (lockPrefab) {
            const lockModels = [];

            this.locks.forEach(lock => {
                const lockNode = cc.instantiate(lockPrefab);

                this._renderNode.addChild(lockNode);

                const model = new LockModel();
                model.updateData({
                    radius: this._countLockRadius(),
                    angle: lock.angle
                });

                const lockView = lockNode.getComponent(LockView);
                spriteFrame && lockView.changeSpriteFrame(spriteFrame);
                lockView.render(model.getData());

                lockModels.push(model);
            });

            this.model.updateData({
                locks: lockModels
            });
        }
    }
}

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

                data['type'] = convertPieceType(piece.type);
                data['color'] = convertColorType(piece.color);
                data.locks.forEach(lock => {
                    lock['color'] = data['color'];
                });

                return data;
            });

            saveExportJson(exportData, this.exportName, 'assets/fieldBuilder/configs');
        }
    }
}