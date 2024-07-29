import { IController } from "../interface/IController";
import { FieldModel } from "../model/FieldModel";
import { LinkModel } from "../model/LinkModel";
import { LockablePieceModel } from "../model/LockablePieceModel";
import { LockablePieceView } from "../view/LockablePieceView";
import { LockView } from "../view/LockView";

export namespace DestroyController {
    export type Options = {
        fieldModel: FieldModel,
        linkModel: LinkModel,
    }
}

export class DestroyController implements IController<LockablePieceView> {
    private _fieldModel: FieldModel;
    private _linkModel: LinkModel;

    constructor({ fieldModel, linkModel }: DestroyController.Options) {
        this._fieldModel = fieldModel;
        this._linkModel = linkModel;
    }

    handle(view: LockablePieceView): void {
        const lockablePieceModel = this._fieldModel.getPieceModel(view);

        if (lockablePieceModel instanceof LockablePieceModel) {
            view.locks.forEach((lockView: LockView) => {
                this._fieldModel.removePiece(lockView);
                this._linkModel.removeLink(lockView);
            });

            this._fieldModel.removePiece(view);
        }
    }
}