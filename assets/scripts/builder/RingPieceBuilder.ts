import { RingController } from "../controller/RingController";
import { PieceFactory } from "../factory/PieceFactory";
import { RingModel } from "../model/RingModel";
import { LockView } from "../view/LockView";
import { RingView } from "../view/RingView";
import { LockablePieceBuilder } from "./LockablePieceBuilder";
import { PieceBuilder } from "./PieceBuilder";

export class RingPieceBuilder extends LockablePieceBuilder {
    protected async _getPieceData(node: cc.Node, payload?: PieceBuilder.Payload): Promise<PieceFactory.PieceData> {
        const view = node?.getComponent(RingView);
        const {lockModels, lockViews} = await this._configureLocks(payload.configEntry, node, view);
        const model = new RingModel(Object.assign({}, payload.configEntry, { locks: lockModels }));

        view.touchHandler = new RingController({ fieldModel: this._fieldModel, linkModel: this._linkModel });
        
        this._fieldModel.addPiece(view, model);
        lockViews.forEach((view: LockView) => {
            this._linkModel.addLink(view, model);
        });

        return { node, view, model };
    }
}