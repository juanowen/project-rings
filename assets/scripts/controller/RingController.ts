import { FieldModel } from "../model/FieldModel";
import { RingModel } from "../model/RingModel";
import { RingView } from "../view/RingView";
import { IController } from "../interface/IController";
import { LockView } from "../view/LockView";
import { LockModel } from "../model/LockModel";
import { LinkModel } from "../model/LinkModel";
import { LockablePieceModel } from "../model/LockablePieceModel";

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
            if (!this._ringIsLocked(ringModel.getData())) {
                const ringPos = data.currentTarget.convertToWorldSpaceAR(cc.Vec2.ZERO);
                const prevTouchPos = data.touch.getPreviousLocation();
                const currentTouchPos = data.touch.getLocation();

                const prevRad = Math.atan2(ringPos.y - prevTouchPos.y, ringPos.x - prevTouchPos.x);
                const prevAngle = prevRad * 180 / Math.PI + 180;
                const currentRad = Math.atan2(ringPos.y - currentTouchPos.y, ringPos.x - currentTouchPos.x);
                const currentAngle = currentRad * 180 / Math.PI + 180;

                const deltaAngle = prevAngle - currentAngle;
                ringModel.angle -= deltaAngle;

                const modelData = ringModel.getData();

                view.render(modelData);

                view.locks.forEach((view: LockView) => {
                    const {colliderWorldPos} = view;

                    const colliderRad = Math.atan2(ringPos.y - colliderWorldPos.y, ringPos.x - colliderWorldPos.x);
                    const colliderAngle = colliderRad * 180 / Math.PI + 180;
                    
                    const lockModel = this._fieldModel.getPieceModel(view);
                    
                    if (lockModel instanceof LockModel) {
                        const isUnlocked = modelData.gapRange.minAngle + modelData.angle <= colliderAngle && modelData.gapRange.maxAngle + modelData.angle >= colliderAngle;

                        lockModel.isLocked = !isUnlocked;
                    }
                    
                    const lockableModel = this._linkModel.getLinkedModel(view);

                    if (lockableModel instanceof LockablePieceModel) {
                        lockableModel.updateLockedState();
                    }
                });
            }
        }
    }

    protected _ringIsLocked(data: RingModel.Data): boolean {
        return data.locks.some(lock => lock.getData().isLocked);
    }


}