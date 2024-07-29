import { IController } from "../interface/IController";
import { FieldModel } from "../model/FieldModel";
import { LinkModel } from "../model/LinkModel";
import { LockablePieceModel } from "../model/LockablePieceModel";
import { LockModel } from "../model/LockModel";
import { LockablePieceView } from "../view/LockablePieceView";
import { LockView } from "../view/LockView";

export namespace LockablePieceController {
    export type Options = {
        fieldModel: FieldModel,
        linkModel: LinkModel,
    }
}

export class LockablePieceController implements IController<LockablePieceView> {
    private _fieldModel: FieldModel;
    private _linkModel: LinkModel;

    constructor({ fieldModel, linkModel }: LockablePieceController.Options) {
        this._fieldModel = fieldModel;
        this._linkModel = linkModel;
    }

    handle(view: LockablePieceView): void {
        const lockablePieceModel = this._fieldModel.getPieceModel(view);

        if (lockablePieceModel instanceof LockablePieceModel) {
            const modelData = lockablePieceModel.getData();
            const allLocks = Array.from(this._fieldModel.getData().pieces.values());

            const viewIsLocked = allLocks.some(piece => piece instanceof LockModel && piece.getData().lockedTarget === lockablePieceModel);
            const hasLockedLock = modelData.locks.some((lock: LockModel) => lock.getData().isLocked);

            if (!viewIsLocked && !hasLockedLock) {
                view.locks.forEach((lockView: LockView) => {
                    this._fieldModel.removePiece(lockView);
                    this._linkModel.removeLink(lockView);
                });

                this._fieldModel.removePiece(view);

                view.destroyView();
            }
        }
    }
}