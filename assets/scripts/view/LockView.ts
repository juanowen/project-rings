import { LockModel } from "../model/LockModel";
import { IView } from "../interface/IView";
import { BaseView } from "./BaseView";
import { LockablePieceView } from "./LockablePieceView";
import { IController } from "../interface/IController";

const { ccclass, property } = cc._decorator;

@ccclass
export class LockView extends BaseView implements IView<LockModel.Data> {
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
    
    protected _lockedView: LockablePieceView = null;

    public get lockedView(): LockablePieceView {
        return this._lockedView;
    }

    protected _collisionHandler: IController<LockView> = null;

    public set collisionHandler(value: IController<LockView>) {
        this._collisionHandler = value;
    }

    public override render(data: LockModel.Data): void {
        this.angle = data.angle;
        this.radius = data.radius;
    }

    public addLockedView(view: LockablePieceView): void {
        this._lockedView = view;

        this._collisionHandler?.handle(this);
    }

    public deleteLockedView(): void {
        const lockedView = this._lockedView;

        this._lockedView = null;
        this._collisionHandler?.handle(this);

        lockedView?.release();
    }

    public destroyView(): void {
        this._collider.enabled = false;
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