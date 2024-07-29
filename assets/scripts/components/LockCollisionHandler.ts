import { LockablePieceView } from "../view/LockablePieceView";
import { LockView } from "../view/LockView";

const { ccclass, property } = cc._decorator;

@ccclass
export class LockCollisionHandler extends cc.Component {
    @property({
        visible: true,
    })
    protected _lockGroup: string = 'lock';

    @property({
        type: LockablePieceView,
        visible: true,
    })
    protected _lockablePieceView: LockablePieceView = null;

    public onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
        if (this._lockablePieceView && other.node.group === this._lockGroup) {
            const lockView = other.node.parent.getComponent(LockView);

            if (lockView) {
                this._lockablePieceView.addLockedBy(lockView);
            }
        }
    }

    public onCollisionExit(other: cc.Collider, self: cc.Collider): void {
        if (this._lockablePieceView && other.node.group === this._lockGroup) {
            const lockView = other.node.parent.getComponent(LockView);

            if (lockView) {
                this._lockablePieceView.deleteLockedBy(lockView);
            }
        }
    }
}