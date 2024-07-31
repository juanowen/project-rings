import { BlockAnimator } from "../components/animator/BlockAnimator";
import { IController } from "../interface/IController";
import { LockablePieceView } from "./LockablePieceView";

const { ccclass, property } = cc._decorator;

@ccclass
export class RingView extends LockablePieceView {
    @property({
        type: cc.Collider,
        visible: true,
    })
    protected _collider: cc.Collider = null;

    @property({
        type: BlockAnimator,
        visible: true,
    })
    protected _blockAnimator: BlockAnimator = null;

    protected _touchHandler: IController<RingView, cc.Event.EventTouch> = null;

    public set touchHandler(value: IController<RingView, cc.Event.EventTouch>) {
        this._touchHandler = value;
    }

    protected _onTouchMove(event: cc.Event.EventTouch): void {
        this._touchHandler?.handle(this, event);
    }

    public animateBlock(): void {
        this._blockAnimator.animate();
    }

    public destroyView(): void {
        this._collider.enabled = false;

        super.destroyView();
    }

    public handleTouchMove(event: cc.Event.EventTouch): RingView {
        const camera = cc.Camera.findCamera(this.node);
        
        const worldPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        const touchPos = event.touch.getLocation();
        const touchWorldPos = cc.v2(camera.getScreenToWorldPoint(touchPos));

        if (Math.hypot(worldPos.x - touchWorldPos.x, worldPos.y - touchWorldPos.y) < this.node.width / 2) {
            this._onTouchMove(event);

            return this;
        }

        return null;
    }
}