import { BaseModel } from "./BaseModel";

export namespace RenderModel {
    export type Data = {
        x?: number,
        y?: number,
        angle?: number,
    }
}

export class RenderModel extends BaseModel<RenderModel.Data> {
    protected _x: number;
    protected _y: number;
    protected _angle: number;
    
    public get angle(): number {
        return this._angle;
    }

    public set angle(value: number) {
        this._angle = value;
    }

    public setData(data: RenderModel.Data): void {
        this._x = data.x ?? 0;
        this._y = data.y ?? 0;
        this._angle = data.angle ?? 0;
    }

    public getData(): RenderModel.Data {
        return {
            x: this._x,
            y: this._y,
            angle: this._angle,
        };
    }
}