import { AngleUtil } from "../../utils/AngleUtil";
import { LockablePieceView } from "../../view/LockablePieceView";
import { LockView } from "../../view/LockView";
import { BaseCollisionHandler } from "./BaseCollisionHandler";

const { ccclass, property } = cc._decorator;

const enum ColliderType {
    Body = 0,
    Hole = 1
}

@ccclass
export class LockCollisionHandler extends BaseCollisionHandler {
    @property({
        type: LockView,
        visible: true,
    })
    protected _lockView: LockView = null;

    protected _collisions: Set<cc.Collider> = new Set();

    protected _addCollision(other: cc.Collider, self: cc.Collider): void {
        if (other.tag !== ColliderType.Hole) {
            this._collisions.add(other);
            this._processCollisions();
        }
    }

    protected _stayCollision(other: cc.Collider, self: cc.Collider): void {
        if (other.tag === ColliderType.Hole) {
            const entering = this._checkEntering(other, self);

            if (entering && !this._collisions.has(other)) {
                this._collisions.add(other);
                this._processCollisions();
            } 
            
            if (!entering && this._collisions.has(other)) {
                this._collisions.delete(other);
                this._processCollisions();
            }
        }
    }

    protected _removeCollision(other: cc.Collider, self: cc.Collider): void {
        this._collisions.delete(other);
        this._processCollisions();
    }

    protected _processCollisions(): void {
        if (this._lockView) {
            const collisions = Array.from(this._collisions);

            if (!(collisions.some(({tag}) => tag === ColliderType.Hole))) {
                if (collisions.length) {
                    const collider = collisions[0];
                    const lockablePieceView = collider.getComponent(LockablePieceView) || collider.node.parent.getComponent(LockablePieceView);
                    
                    if (lockablePieceView) {
                        this._lockView.addLockedView(lockablePieceView);

                        return;
                    }
                }
            }

            this._lockView.deleteLockedView();
        }
    }

    protected _checkEntering(other: cc.Collider, self: cc.Collider): boolean {
        if (self instanceof cc.CircleCollider && other instanceof cc.CircleCollider) {
            const selfRect = self.world.aabb;
            const otherRect = other.world.aabb;

            return selfRect.x >= otherRect.x &&
                selfRect.x + selfRect.width <= otherRect.x + otherRect.width &&
                selfRect.y >= otherRect.y &&
                selfRect.y + selfRect.height <= otherRect.y + otherRect.height;
        }

        return false;
    }
}