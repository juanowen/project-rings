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
            const lockModels = view.locks.map((view: LockView) => this._fieldModel.getPieceModel(view));

            lockablePieceModel.updateLocks(lockModels as LockModel[]);
        }
    }
}