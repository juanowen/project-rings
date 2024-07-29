const { ccclass, property } = cc._decorator;

@ccclass
export abstract class BaseCollisionHandler extends cc.Component {
    @property({
        type: [cc.String],
        visible: true,
    })
    protected _lockGroups: string[] = ['lock'];

    public onCollisionEnter(other: cc.Collider, self: cc.Collider): void {
        if (this._lockGroups.includes(other.node.group)) {
            this._addCollision(other, self);
        }
    }

    public onCollisionExit(other: cc.Collider, self: cc.Collider): void {
        if (this._lockGroups.includes(other.node.group)) {
            this._removeCollision(other, self);
        }
    }

    protected abstract _addCollision(other: cc.Collider, self: cc.Collider): void;
    protected abstract _removeCollision(other: cc.Collider, self: cc.Collider): void;
}