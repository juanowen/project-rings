import { RenderModel } from "../model/RenderModel";
import { IView } from "../interface/IView";

const {ccclass, property} = cc._decorator;

@ccclass
export class BaseView extends cc.Component implements IView<RenderModel.Data> {
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
}