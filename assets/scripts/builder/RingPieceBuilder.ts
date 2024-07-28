import { RingController } from "../controller/RingController";
import { PieceFactory } from "../factory/PieceFactory";
import { FieldModel } from "../model/FieldModel";
import { RingModel } from "../model/RingModel";
import { RingView } from "../view/RingView";
import { LockablePieceBuilder } from "./LockablePieceBuilder";
import { PieceBuilder } from "./PieceBuilder";

export namespace RingPieceBuilder {
    export type Payload = PieceBuilder.Payload & {
        field: FieldModel
    }
}

export class RingPieceBuilder extends LockablePieceBuilder {
    protected async _getPieceData(node: cc.Node, payload?: RingPieceBuilder.Payload): Promise<PieceFactory.PieceData> {
        const view = node?.getComponent(RingView);
        const locks = await this._configureLocks(payload.configEntry, node, view);
        const model = new RingModel(Object.assign({}, payload.configEntry, { locks }));

        view.handler = new RingController({ field: payload.field });

        return { node, view, model };
    }
}