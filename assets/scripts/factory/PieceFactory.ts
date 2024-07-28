import { PieceType } from "../enum/PieceType";
import { IView } from "../interface/IView";
import { RenderModel } from "../model/RenderModel";

export namespace PieceFactory {
    export type Options = {
        builderMap: Record<PieceType, IPieceBuilder>,
    }

    export type PieceData = {
        node: cc.Node,
        view: IView,
        model: RenderModel,
    }

    export interface IPieceBuilder<Payload = unknown> {
        build(payload?: Payload): Promise<PieceData>;
    }
}

export class PieceFactory {
    private _builderMap: Record<PieceType, PieceFactory.IPieceBuilder>;

    constructor({builderMap}: PieceFactory.Options) {
        this._builderMap = builderMap;
    }

    public async createPiece(type: string, payload: unknown): Promise<PieceFactory.PieceData> {
        const builder = this._builderMap[type];

        if (builder) {
            const data = await builder.build(payload);

            return data;
        }

        return null;
    } 
}