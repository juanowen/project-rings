import { LockablePiece } from "../model/LockablePiece";
import { LockView } from "./LockView";

const { ccclass, property } = cc._decorator;

@ccclass
export class LockablePieceView extends cc.Component {
    @property({
        type: [LockView],
        visible: true,
    })
    protected _locks: LockView[] = [];

    @property
    public get angle(): number {
        return this.node.angle;
    }

    public set angle(value: number) {
        this.node.angle = value;
    }

    render(data: LockablePiece.Data): void {
        this.angle = data.angle;
    }
}