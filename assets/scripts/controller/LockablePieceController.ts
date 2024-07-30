import { PieceType } from "../enum/PieceType";
import { IController } from "../interface/IController";
import { FieldModel } from "../model/FieldModel";
import { LockablePieceModel } from "../model/LockablePieceModel";
import { LockModel } from "../model/LockModel";
import { LockablePieceView } from "../view/LockablePieceView";
import { LockView } from "../view/LockView";

export namespace LockablePieceController {
    export type Options = {
        fieldModel: FieldModel,
    }
}

export class LockablePieceController implements IController<LockablePieceView> {
    private _fieldModel: FieldModel;

    constructor({ fieldModel }: LockablePieceController.Options) {
        this._fieldModel = fieldModel;
    }

    handle(view: LockablePieceView): void {
        const lockablePieceModel = this._fieldModel.getPieceModel(view);

        if (lockablePieceModel instanceof LockablePieceModel) {
            const modelData = lockablePieceModel.getData();
            const allLocks = this._fieldModel.getModelsByType(PieceType.Lock);

            const viewIsLocked = allLocks.some((piece: LockModel) => piece.getData().lockedTarget === lockablePieceModel);
            const hasLockedLock = modelData.locks.some((lock: LockModel) => lock.getData().isLocked);

            if (!viewIsLocked && !hasLockedLock) {
                view.locks.forEach((lockView: LockView) => {
                    this._fieldModel.removePiece(lockView);
                });

                this._fieldModel.removePiece(view);

                view.destroyView();
            }
        }
    }
}