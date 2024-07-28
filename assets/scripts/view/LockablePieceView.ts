import { LockView } from "./LockView";

const { ccclass, property } = cc._decorator;

@ccclass
export class LockablePieceView extends cc.Component {
    @property({
        type: [LockView],
        visible: true,
    })
    protected _locks: LockView[] = [];
}