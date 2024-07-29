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

    protected onEnable(): void {
        this._listenEvents(true);
    }

    protected onDisable(): void {
        this._listenEvents(false);
    }

    protected _listenEvents(isListening: boolean): void {
        const func = isListening ? 'on' : 'off';

        this.node[func](cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
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
}