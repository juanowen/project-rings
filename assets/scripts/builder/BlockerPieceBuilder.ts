import { ConfigLockEntry } from "../type/Config";
import { PieceFactory } from "../factory/PieceFactory";
import { LockModel } from "../model/LockModel";
import { LockView } from "../view/LockView";
import { PieceBuilder } from "./PieceBuilder";

export namespace BlockerPieceBuilder {
    export type Payload = {
        configEntry: ConfigLockEntry
    }
}

export class BlockerPieceBuilder extends PieceBuilder<BlockerPieceBuilder.Payload> {
    protected async _getPieceData(node: cc.Node, payload?: BlockerPieceBuilder.Payload): Promise<PieceFactory.PieceData> {
        const view = node.getComponent(LockView);
        const model = new LockModel(payload.configEntry);

        return {node, view, model};
    }
}