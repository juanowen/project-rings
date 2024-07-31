import { ColorType } from "../scripts/enum/ColorType";
import { PieceType } from "../scripts/enum/PieceType";
import { LockablePieceModel } from "../scripts/model/LockablePieceModel";
import { LockModel } from "../scripts/model/LockModel";
import { RenderModel } from "../scripts/model/RenderModel";
import { AngleUtil } from "../scripts/utils/AngleUtil";
import { BaseView } from "../scripts/view/BaseView";
import { LockView } from "../scripts/view/LockView";
import { EnumUtil } from "./EnumUtil";
import { LockPiece } from "./LockPiece";
import { PieceColorMap } from "./PieceColorMap";
import { PiecePrefabMap } from "./PiecePrefabMap";

const { ccclass, property } = cc._decorator;

const CELL_WIDTH: number = 462;
const CELL_HEIGHT: number = 400;

@ccclass('FieldPiece')
export class FieldPiece {
    @property({
        type: EnumUtil.getCCEnum(PieceType, [PieceType.Lock]),
        visible: true,
    })
    public type: number = 0;

    @property({
        type: EnumUtil.getCCEnum(ColorType),
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
            return EnumUtil.getCCEnumElement(PieceType, this.type) === PieceType.Ring;
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
                type: EnumUtil.getCCEnumElement(PieceType, this.type),
                x: position.x,
                y: position.y,
                angle: this.angle
            });

            if (EnumUtil.getCCEnumElement(PieceType, this.type) === PieceType.LockablePiece) {
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
        switch (EnumUtil.getCCEnumElement(PieceType, this.type)) {
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
        if (EnumUtil.getCCEnumElement(PieceType, this.type) === PieceType.Ring) {
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