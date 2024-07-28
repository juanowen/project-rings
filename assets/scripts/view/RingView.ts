import { IController } from "../controller/IController";
import { LockablePieceView } from "./LockablePieceView";

const { ccclass, property } = cc._decorator;

@ccclass
export class RingView extends LockablePieceView {
    @property({
        type: cc.Sprite,
        visible: true,
    })
    protected _renderSprite: cc.Sprite = null;

    @property({
        type: cc.Collider,
        visible: true,
    })
    protected _collider: cc.Collider = null;

    @property
    public get angle(): number {
        return this.node.angle;
    }

    public set angle(value: number) {
        this.node.angle = value;
    }

    protected _handler: IController<cc.Event.EventTouch> = null;

    public set handler(value: IController<cc.Event.EventTouch>) {
        this._handler = value;
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
        this._handler?.handle(event);
    }
}