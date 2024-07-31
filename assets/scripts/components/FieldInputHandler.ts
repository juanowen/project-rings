import { RingView } from "../view/RingView";

const {ccclass} = cc._decorator;

@ccclass
export class FieldInputHandler extends cc.Component {
    protected onEnable(): void {
        this._listenEvents(true);
    }

    protected onDisable(): void {
        this._listenEvents(false);
    }

    protected _touchTarget: RingView;

    protected _listenEvents(isListening: boolean): void {
        const func = isListening ? 'on' : 'off';

        this.node[func](cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node[func](cc.Node.EventType.TOUCH_END, this._clearTarget, this);
        this.node[func](cc.Node.EventType.TOUCH_CANCEL, this._clearTarget, this);
    }
    
    protected _onTouchMove(event: cc.Event.EventTouch): void {
        if (this._touchTarget) {
            this._touchTarget.handleTouchMove(event);
        } else {

            const ringViews: RingView[] = this.getComponentsInChildren(RingView);
            
            for (const ringView of ringViews) {
                const target = ringView.handleTouchMove(event);

                if (target) {
                    this._touchTarget = target;

                    break;
                }
            }
        }
    }

    protected _clearTarget(): void {
        this._touchTarget = null;
    }
}