import { PieceType } from "../scripts/enum/PieceType";
import { EnumUtil } from "./EnumUtil";

const { ccclass, property } = cc._decorator;

@ccclass('PiecePrefabMap')
export class PiecePrefabMap {
    @property({
        type: EnumUtil.getCCEnum(PieceType, [PieceType.Lock])
    })
    public pieceType: number = 0;

    @property({
        type: cc.Prefab
    })
    public prefab: cc.Prefab = null;
}