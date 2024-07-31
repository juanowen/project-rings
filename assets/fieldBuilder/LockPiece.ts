const { ccclass, property } = cc._decorator;

@ccclass('LockPiece')
export class LockPiece {
    @property()
    public angle: number = 0;
}