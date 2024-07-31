import { PieceType } from "../enum/PieceType";
import { IView } from "../interface/IView";
import { BaseModel } from "./BaseModel";

export namespace RenderModel {
    export type Data = {
        type?: string,
        x?: number,
        y?: number,
        angle?: number,
        color?: string,
    }
}

export class RenderModel extends BaseModel<RenderModel.Data> {
    protected _type: PieceType;
    protected _x: number;
    protected _y: number;
    protected _angle: number;
    protected _view: IView;
    protected _color: string;

    public get view(): IView {
        return this._view;
    }

    public set view(value: IView) {
        this._view = value;
    }

    public initData(data: RenderModel.Data): void {
        this._x = data.x ?? 0;
        this._y = data.y ?? 0;
        this._angle = data.angle ?? 0;
        this._color = data.color;
    }

    public updateData(data: Record<string, unknown>): void {
        super.updateData(data);

        this._renderView();
    }

    public getData(): RenderModel.Data {
        return {
            type: this._type,
            x: this._x,
            y: this._y,
            angle: this._angle,
        };
    }

    protected _renderView(): void {
        this.view?.render(this.getData());
    }

    public serialize(): RenderModel.Data {
        return {
            type: this._type,
            x: this._x,
            y: this._y,
            angle: this._angle,
            color: this._color,
        };
    }
}