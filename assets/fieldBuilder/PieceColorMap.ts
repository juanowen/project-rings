import { ColorType } from "../scripts/enum/ColorType";
import { EnumUtil } from "./EnumUtil";

const { ccclass, property } = cc._decorator;

@ccclass('PieceColorMap')
export class PieceColorMap {
    @property({
        type: EnumUtil.getCCEnum(ColorType)
    })
    public colorType: number = 0;

    @property({
        type: cc.SpriteFrame
    })
    public spriteFrame: cc.SpriteFrame = null;
}