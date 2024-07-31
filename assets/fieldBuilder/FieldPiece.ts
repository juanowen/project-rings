import { ColorType } from "../scripts/enum/ColorType";
import { PieceType } from "../scripts/enum/PieceType";
import { LockablePieceModel } from "../scripts/model/LockablePieceModel";
import { AngleUtil } from "../scripts/utils/AngleUtil";
import { EnumUtil } from "./EnumUtil";
import { LockPiece } from "./LockPiece";

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

    public getData(): LockablePieceModel.SerializedData {
        const position = this._countPos();

        const data = {
            type: EnumUtil.getCCEnumElement(PieceType, this.type),
            x: position.x,
            y: position.y,
            angle: this.angle,
            locks: [],
            color: EnumUtil.getCCEnumElement(ColorType, this.color)
        };

        if (EnumUtil.getCCEnumElement(PieceType, this.type) === PieceType.LockablePiece) {
            this.locks = [];

            [0, 180].forEach(angle => {
                const lockPiece = new LockPiece();
                lockPiece.angle = angle;

                this.locks.push(lockPiece);
            });
        }

        this.locks.forEach(lock => {
            data.locks.push({
                radius: this._countLockRadius(),
                angle: lock.angle,
                color: EnumUtil.getCCEnumElement(ColorType, this.color)
            });
        });

        return data;
    }

    protected _countPos(): cc.Vec2 {
        switch (EnumUtil.getCCEnumElement(PieceType, this.type)) {
            case PieceType.Ring: {
                return cc.v2(
                    (this.x + (this.y % 2 ? 0.5 : 0)) * CELL_WIDTH,
                    -this.y * CELL_HEIGHT,
                );
            }

            case PieceType.LockablePiece: {
                const angle = AngleUtil.degreeToRad(this.angle);
                return cc.v2(
                    (this.x + (this.y % 2 ? 0.5 : 0)) * CELL_WIDTH - CELL_WIDTH / 2 * Math.cos(angle),
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
}