const {ccclass, property} = cc._decorator;

@ccclass
export default class PhysicsManager extends cc.Component {
    @property({
        visible: true,
    })
    protected _enablePhysics2D: boolean = false;

    @property({
        visible() {
            return this._enablePhysics2D;
        },
    })
    protected _enableAccumulator: boolean = false;

    @property({
        visible() {
            return this._enablePhysics2D;
        },
    })
    protected _gravity2D = cc.v2(0, -980);

    @property({
        visible() {
            return this._enablePhysics2D;
        },
    })
    protected _debugPhysics2D: boolean = false;

    @property({
        visible: true,
    })
    protected _enablePhysics3D: boolean = false;

    @property({
        visible() {
            return this._enablePhysics3D;
        },
    })
    protected _gravity3D = cc.v3(0, -10, 0);

    @property({
        visible: true,
    })
    protected _enableCollision: boolean = false;

    @property({
        visible() {
            return this._enableCollision;
        },
    })
    protected _debugCollision: boolean = false;

    protected _physics2DManager: cc.PhysicsManager = null;
    protected _physics3DManager: cc.Physics3DManager = null;
    protected _collisionManager: cc.CollisionManager = null;

    protected onLoad(): void {
        // 2d physics
        if (this._enablePhysics2D) {
            this._physics2DManager = cc.director.getPhysicsManager();

            if (this._physics2DManager) {
                this._physics2DManager.enabled = true;
                this._physics2DManager.gravity = this._gravity2D;
                this._physics2DManager.enabledAccumulator = this._enableAccumulator;
                
                if (this._debugPhysics2D) {
                    this._physics2DManager.debugDrawFlags =
                        cc.PhysicsManager.DrawBits.e_aabbBit |
                        // cc.PhysicsManager.DrawBits.e_pairBit |
                        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
                        cc.PhysicsManager.DrawBits.e_jointBit |
                        cc.PhysicsManager.DrawBits.e_shapeBit;
                }
            }
        } 

        // 3d physics
        if (this._enablePhysics3D) {
            this._physics3DManager = cc.director.getPhysics3DManager();

            if (this._physics3DManager) {
                this._physics3DManager.enabled = true;
                this._physics3DManager.gravity = this._gravity3D;
            }
        }

        // collision
        if (this._enableCollision) {
            this._collisionManager = cc.director.getCollisionManager();
            
            if (this._collisionManager) {
                this._collisionManager.enabled = true;
                this._collisionManager.enabledDrawBoundingBox = this._debugCollision;
                this._collisionManager.enabledDebugDraw = this._debugCollision;
            }
        }
    }
}
