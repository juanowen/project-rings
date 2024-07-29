import { ConfigEntry, ConfigLockEntry } from "../type/Config";
import { PieceFactory } from "../factory/PieceFactory";
import { LockablePieceModel } from "../model/LockablePieceModel";
import { LockModel } from "../model/LockModel";
import { LockablePieceView } from "../view/LockablePieceView";
import { LockView } from "../view/LockView";
import { BlockerPieceBuilder } from "./BlockerPieceBuilder";
import { PieceBuilder } from "./PieceBuilder";
import { LinkModel } from "../model/LinkModel";
import { LockablePieceController } from "../controller/LockablePieceController";
import { DestroyController } from "../controller/DestroyController";
import { IView } from "../interface/IView";
import { RenderModel } from "../model/RenderModel";

export namespace LockablePieceBuilder {
    export type Options = PieceBuilder.Options & {
        blockerBuilder: BlockerPieceBuilder,
        linkModel: LinkModel,
    }

    export type LocksConfig = {
        lockModels: LockModel[],
        lockViews: LockView[],
    }
}

export class LockablePieceBuilder extends PieceBuilder<PieceBuilder.Payload> {
    protected _blockerBuilder: BlockerPieceBuilder;
    protected _linkModel: LinkModel;
;

    constructor({blockerBuilder, linkModel, ...options}: LockablePieceBuilder.Options) {
        super(options);

        this._blockerBuilder = blockerBuilder;
        this._linkModel = linkModel;
    }

    protected async _getPieceData(node: cc.Node, payload?: PieceBuilder.Payload): Promise<PieceFactory.PieceData> {
        const view = this._getView(node) as LockablePieceView;
        const {lockModels, lockViews} = await this._configureLocks(payload.configEntry, node, view);
        const modelPayload = Object.assign({}, payload.configEntry, { locks: lockModels });
        const model = this._getModel(modelPayload) as LockablePieceModel;

        this._bindHandlers(view);

        this._fieldModel.addPiece(view, model);
        lockViews.forEach((view: LockView) => {
            this._linkModel.addLink(view, model);
        });

        this._updateSpriteFrame(view, payload.configEntry.color);

        return { node, view, model };
    }

    protected _getView(node: cc.Node): IView {
        return node?.getComponent(LockablePieceView);
    }

    protected _getModel(payload: RenderModel.Data): RenderModel {
        return new LockablePieceModel(payload);
    }

    protected _bindHandlers(view: LockablePieceView): void {
        view.collisionHandler = new LockablePieceController({ fieldModel: this._fieldModel });
        view.destroyHandler = new DestroyController({ fieldModel: this._fieldModel, linkModel: this._linkModel });
    }

    protected async _configureLocks(payload: ConfigEntry, node: cc.Node, view: LockablePieceView): Promise<LockablePieceBuilder.LocksConfig> {
        const lockModels: LockModel[] = [];
        const lockViews: LockView[] = [];

        if (payload) {
            for (const lockData of payload.locks) {
                const blocker = await this._blockerBuilder.build({configEntry: lockData});
    
                view.addLockView(blocker.view as LockView);
                node.addChild(blocker.node);
    
                lockModels.push(blocker.model as LockModel);
                lockViews.push(blocker.view as LockView);
            }
        }

        return {lockModels, lockViews};
    }
}