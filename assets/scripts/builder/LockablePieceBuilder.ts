import { ConfigEntry, ConfigLockEntry } from "../type/Config";
import { PieceFactory } from "../factory/PieceFactory";
import { LockablePieceModel } from "../model/LockablePieceModel";
import { LockModel } from "../model/LockModel";
import { LockablePieceView } from "../view/LockablePieceView";
import { LockView } from "../view/LockView";
import { BlockerPieceBuilder } from "./BlockerPieceBuilder";
import { PieceBuilder } from "./PieceBuilder";

export namespace LockablePieceBuilder {
    export type Options = PieceBuilder.Options & {
        blockerBuilder: BlockerPieceBuilder,
    }
}

export class LockablePieceBuilder extends PieceBuilder<PieceBuilder.Payload> {
    protected _blockerBuilder: BlockerPieceBuilder;

    constructor({blockerBuilder, ...options}: LockablePieceBuilder.Options) {
        super(options);

        this._blockerBuilder = blockerBuilder;
    }

    protected async _getPieceData(node: cc.Node, payload?: PieceBuilder.Payload): Promise<PieceFactory.PieceData> {
        const view = node?.getComponent(LockablePieceView);
        const locks = await this._configureLocks(payload.configEntry, node, view);
        const model = new LockablePieceModel(Object.assign({}, payload.configEntry, { locks }));

        return { node, view, model };
    }

    protected async _configureLocks(payload: ConfigEntry, node: cc.Node, view: LockablePieceView): Promise<LockModel[]> {
        const locks: LockModel[] = [];

        payload?.locks.forEach(async (lockData: ConfigLockEntry) => {
            const blocker = await this._blockerBuilder.build({configEntry: lockData});

            view.addLockView(blocker.view as LockView);
            node.addChild(blocker.node);

            locks.push(blocker.model as LockModel);
        });

        return locks;
    }
}