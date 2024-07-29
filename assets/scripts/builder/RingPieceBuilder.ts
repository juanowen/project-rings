import { DestroyController } from "../controller/DestroyController";
import { LockablePieceController } from "../controller/LockablePieceController";
import { RingController } from "../controller/RingController";
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

    protected override _bindHandlers(view: RingView): void {
        view.touchHandler = new RingController({ fieldModel: this._fieldModel, linkModel: this._linkModel });
        view.collisionHandler = new LockablePieceController({ fieldModel: this._fieldModel });
        view.destroyHandler = new DestroyController({ fieldModel: this._fieldModel, linkModel: this._linkModel });
    }
}