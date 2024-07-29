import { FieldModel } from "../model/FieldModel";
import { RingModel } from "../model/RingModel";
import { RingView } from "../view/RingView";
import { IController } from "../interface/IController";
import { LockView } from "../view/LockView";
import { LockModel } from "../model/LockModel";
import { LinkModel } from "../model/LinkModel";
import { LockablePieceModel } from "../model/LockablePieceModel";
import { AngleUtil } from "../utils/AngleUtil";

export namespace RingController {
    export type Options = {
        fieldModel: FieldModel,
        linkModel: LinkModel,
    }
}

export class RingController implements IController<RingView, cc.Event.EventTouch> {
    private _fieldModel: FieldModel;
    private _linkModel: LinkModel;

    constructor({ fieldModel, linkModel }: RingController.Options) {
        this._fieldModel = fieldModel;
        this._linkModel = linkModel;
    }

    public handle(view: RingView, data: cc.Event.EventTouch): void {
        const ringModel = this._fieldModel.getPieceModel(view);

        if (ringModel instanceof RingModel) {
            this._handleRotation(view, data, ringModel);
            this._handleLockedBy(view, data, ringModel);

            ringModel.updateLockedState();
        }
    }

    protected _handleRotation(view: RingView, data: cc.Event.EventTouch, ringModel: RingModel) {
        const ringModelData = ringModel.getData();

        if (ringModelData.isRotatable) {
            const ringPos = data.currentTarget.convertToWorldSpaceAR(cc.Vec2.ZERO);
            const prevTouchPos = data.touch.getPreviousLocation();
            const currentTouchPos = data.touch.getLocation();

            const deltaAngle = AngleUtil.getDeltaAngle(ringPos, prevTouchPos, currentTouchPos);
            ringModel.updateData({angle: AngleUtil.validateAngle(ringModelData.angle - deltaAngle)});
        } else {
            view.animateBlock();
        }
    }

    protected _handleLockedBy(view: RingView, data: cc.Event.EventTouch, ringModel: RingModel) {
        const ringModelData = ringModel.getData();
        const ringPos = data.currentTarget.convertToWorldSpaceAR(cc.Vec2.ZERO);

        view.lockedBy.forEach((view: LockView) => {
            const {colliderWorldPos} = view;
            const colliderAngle = AngleUtil.getDegreeAngle(ringPos, colliderWorldPos);

            const lockModel = this._fieldModel.getPieceModel(view);
            
            if (lockModel instanceof LockModel) {
                const isUnlocked = ringModelData.gapRange.minAngle + ringModelData.angle <= colliderAngle && ringModelData.gapRange.maxAngle + ringModelData.angle >= colliderAngle;

                lockModel.updateData({isLocked: !isUnlocked});
            }
            
            const lockableModel = this._linkModel.getLinkedModel(view);

            if (lockableModel instanceof LockablePieceModel) {
                lockableModel.updateLockedState();
            }
        });
    }
}