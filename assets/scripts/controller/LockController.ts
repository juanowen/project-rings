import { IController } from "../interface/IController";
import { FieldModel } from "../model/FieldModel";
import { LockModel } from "../model/LockModel";
import { LockablePieceView } from "../view/LockablePieceView";
import { LockView } from "../view/LockView";
import { LockablePieceController } from "./LockablePieceController";

export namespace LockController {
    export type Options = {
        fieldModel: FieldModel,
        lockablePieceController: LockablePieceController,
    }
}

export class LockController implements IController<LockView> {
    private _fieldModel: FieldModel;
    private _lockablePieceController: LockablePieceController;

    constructor({ fieldModel, lockablePieceController }: LockController.Options) {
        this._fieldModel = fieldModel;
        this._lockablePieceController = lockablePieceController;
    }

    handle(view: LockView): void {
        const lockModel = this._fieldModel.getPieceModel(view);

        if (lockModel instanceof LockModel) {
            const {lockedView} = view;
            const lockModel = this._fieldModel.getPieceModel(view) as LockModel;
            const lockedModel = lockedView ? this._fieldModel.getPieceModel(lockedView) : null;
            const ownerModel = lockModel.getData().ownerModel;

            lockModel.updateData({lockedTarget: lockedModel});

            if (ownerModel) {
                ownerModel?.updateLockedState();

                this._lockablePieceController.handle(ownerModel.view as LockablePieceView);
            }
        }
    }
}