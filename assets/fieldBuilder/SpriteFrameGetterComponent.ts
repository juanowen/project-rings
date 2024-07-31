import { ColorType } from "../scripts/enum/ColorType";
import { IGetter } from "../scripts/interface/IGetter";
import { EnumUtil } from "./EnumUtil";
import { PieceColorMap } from "./PieceColorMap";

const {ccclass, property} = cc._decorator;

@ccclass
export class SpriteFrameGetterComponent extends cc.Component implements IGetter<cc.SpriteFrame, string> {
    @property({
        type: [PieceColorMap],
        visible: true,
    })
    protected _spriteFrameConfig: PieceColorMap[] = [];

    public get(color: string): cc.SpriteFrame {
        return this._spriteFrameConfig.find(({ colorType }) => colorType === EnumUtil.getCCEnumIndex(ColorType, color))?.spriteFrame;
    }
}