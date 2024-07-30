import { ConfigEntry, ConfigLockEntry } from "../type/Config";
import { PieceFactory } from "../factory/PieceFactory";
import { LockablePieceModel } from "../model/LockablePieceModel";
import { LockModel } from "../model/LockModel";
import { LockablePieceView } from "../view/LockablePieceView";
import { LockView } from "../view/LockView";
import { BlockerPieceBuilder } from "./BlockerPieceBuilder";
import { PieceBuilder } from "./PieceBuilder";
import { IView } from "../interface/IView";
import { RenderModel } from "../model/RenderModel";

export namespace LockablePieceBuilder {
    export type Options = PieceBuilder.Options & {
        blockerBuilder: BlockerPieceBuilder,
    }

    export type LocksConfig = {
        lockModels: LockModel[],
        lockViews: LockView[],
    }
}

export class LockablePieceBuilder extends PieceBuilder<PieceBuilder.Payload> {
    protected _blockerBuilder: BlockerPieceBuilder;

    constructor({blockerBuilder, ...options}: LockablePieceBuilder.Options) {
        super(options);

        this._blockerBuilder = blockerBuilder;
    }

    protected async _getPieceData(node: cc.Node, payload?: PieceBuilder.Payload): Promise<PieceFactory.PieceData> {
        const view = this._getView(node) as LockablePieceView;
        const locks = await this._configureLocks(payload.configEntry, node, view);
        const modelPayload = Object.assign({}, payload.configEntry, { locks });
        const model = this._getModel(modelPayload) as LockablePieceModel;

        this._fieldModel.addPiece(view, model);
        locks.forEach((lockModel: LockModel) => {
            lockModel.setOwnerModel(model);
        });

        await this._updateSpriteFrame(view, payload.configEntry.color);
        this._bindHandlers(view);

        return { node, view, model };
    }

    protected _getView(node: cc.Node): IView {
        return node?.getComponent(LockablePieceView);
    }

    protected _getModel(payload: RenderModel.Data): RenderModel {
        return new LockablePieceModel(payload);
    }

    protected async _configureLocks(payload: ConfigEntry, node: cc.Node, view: LockablePieceView): Promise<LockModel[]> {
        const lockModels: LockModel[] = [];

        if (payload) {
            for (const lockData of payload.locks) {
                const blocker = await this._blockerBuilder.build({configEntry: lockData});
    
                view.addLockView(blocker.view as LockView);
                node.addChild(blocker.node);
    
                lockModels.push(blocker.model as LockModel);
            }
        }

        return lockModels;
    }
}