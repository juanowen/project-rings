import { IView } from "../interface/IView";
import { RenderModel } from "../model/RenderModel";
import { RingModel } from "../model/RingModel";
import { RingView } from "../view/RingView";
import { LockablePieceBuilder } from "./LockablePieceBuilder";

export class RingPieceBuilder extends LockablePieceBuilder {
    protected override _getView(node: cc.Node): IView {
        return node?.getComponent(RingView);
    }

    protected override _getModel(payload: RenderModel.Data): RenderModel {
        return new RingModel(payload);
    }
}