import { RenderModel } from "../model/RenderModel";
import { IView } from "../interface/IView";

const {ccclass, property} = cc._decorator;

@ccclass
export class BaseView extends cc.Component implements IView<RenderModel.Data> {
    @property({
        type: cc.Sprite,
        visible: true,
    })
    protected _renderSprite: cc.Sprite = null;

    @property
    public get angle(): number {
        return this.node.angle;
    }

    public set angle(value: number) {
        this.node.angle = value;
    }

    public render(data?: RenderModel.Data): void {
        this.node.setPosition(data.x, data.y);
        this.node.angle = data.angle;
    }

    public changeSpriteFrame(spriteFrame: cc.SpriteFrame): void {
        if (this,this._renderSprite) {
            this._renderSprite.spriteFrame = spriteFrame;
        }
    }
}