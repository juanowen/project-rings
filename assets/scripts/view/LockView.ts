import { LockModel } from "../model/LockModel";
import { IView } from "../interface/IView";

const { ccclass, property } = cc._decorator;

@ccclass
export class LockView extends cc.Component implements IView<LockModel.Data> {
    @property({
        type: cc.Sprite,
        visible: true,
    })
    protected _renderSprite: cc.Sprite = null;

    @property({
        type: cc.CircleCollider,
        visible: true,
    })
    protected _collider: cc.CircleCollider = null;

    public get colliderWorldPos(): cc.Vec2 {
        if (this._collider) {
            return this._collider.node.convertToWorldSpaceAR(this._collider?.offset);
        }

        return this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
    }
    
    @property({
        visible() {
            return this._collider;
        }
    })
    public get radius(): number {
        return this._collider?.node.x ?? 0;
    }

    public set radius(value: number) {
        if (this._collider) {
            this._collider.node.x = value;

            this._setFillRange();
        }
    }

    @property({
        visible() {
            return this._collider;
        }
    })
    public get angle(): number {
        return this._collider?.node.angle ?? 0;
    }

    public set angle(value: number) {
        if (this._collider) {
            this._collider.node.angle = value;
        }
    }

    public render(data: LockModel.Data): void {
        this.angle = data.angle;
        this.radius = data.radius;
    }
    
    protected onLoad(): void {
        this._setFillRange();
    }

    private _setFillRange(): void {
        if (this._renderSprite) {
            const renderNode = this._renderSprite.node;
            const holderWorldPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
            const holderLocalPos = renderNode.convertToNodeSpaceAR(holderWorldPos);
            const fillRange = holderLocalPos.x / renderNode.width + renderNode.anchorX;

            this._renderSprite.type = cc.Sprite.Type.FILLED;
            this._renderSprite.fillType = cc.Sprite.FillType.HORIZONTAL;
            this._renderSprite.fillStart = 0;
            this._renderSprite.fillRange = Math.min(1, Math.max(0, fillRange));
        }
    }
}