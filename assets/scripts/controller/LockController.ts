import { IController } from "../interface/IController";
import { FieldModel } from "../model/FieldModel";
import { LinkModel } from "../model/LinkModel";
import { LockModel } from "../model/LockModel";
import { LockablePieceView } from "../view/LockablePieceView";
import { LockView } from "../view/LockView";
import { LockablePieceController } from "./LockablePieceController";

export namespace LockController {
    export type Options = {
        fieldModel: FieldModel,
        linkModel: LinkModel,
        lockablePieceController: LockablePieceController,
    }
}

export class LockController implements IController<LockView> {
    private _fieldModel: FieldModel;
    private _linkModel: LinkModel;
    private _lockablePieceController: LockablePieceController;

    constructor({ fieldModel, linkModel, lockablePieceController }: LockController.Options) {
        this._fieldModel = fieldModel;
        this._linkModel = linkModel;
        this._lockablePieceController = lockablePieceController;
    }

    handle(view: LockView): void {
        const lockModel = this._fieldModel.getPieceModel(view);

        if (lockModel instanceof LockModel) {
            const {lockedView} = view;
            const lockedModel = lockedView ? this._fieldModel.getPieceModel(lockedView) : null;
            const parentModel = this._linkModel.getLinkedModel(view);

            lockModel.updateData({lockedTarget: lockedModel});

            if (parentModel) {
                parentModel?.updateLockedState();

                this._lockablePieceController.handle(parentModel.view as LockablePieceView);
            }
        }
    }
}