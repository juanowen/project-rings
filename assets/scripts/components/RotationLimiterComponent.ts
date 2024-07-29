const { ccclass, property } = cc._decorator;

@ccclass
export class RotationLimiterComponent extends cc.Component {
    @property({
        type: cc.Collider,
        visible: true,
    })
    protected _clockwiseCollider: cc.Collider = null;
    
    @property({
        type: cc.Collider,
        visible: true,
    })
    protected _overClockwiseCollider: cc.Collider = null;

    protected _clockwiseCollisions: Set<cc.Collider> = new Set();
    protected _overClockwiseCollisions: Set<cc.Collider> = new Set();

    public get clockwiseBlocked(): boolean {
        return this._clockwiseCollisions.size > 0;
    }

    public get overClockwiseBlocked(): boolean {
        return this._overClockwiseCollisions.size > 0;
    }

    public onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
        switch (self) {
            case this._overClockwiseCollider: {
                this._overClockwiseCollisions.add(other);

                break;
            }
            case this._clockwiseCollider: {
                this._clockwiseCollisions.add(other);

                break;
            }
        }
    }

    public onCollisionExit(other: cc.Collider, self: cc.Collider): void {
        switch (self) {
            case this._overClockwiseCollider: {
                this._overClockwiseCollisions.delete(other);

                break;
            }
            case this._clockwiseCollider: {
                this._clockwiseCollisions.delete(other);

                break;
            }
        }
    }
}