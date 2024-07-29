import { FieldModel } from "../model/FieldModel";
import { RingModel } from "../model/RingModel";
import { RingView } from "../view/RingView";
import { IController } from "../interface/IController";
import { AngleUtil } from "../utils/AngleUtil";
import { LockView } from "../view/LockView";

export namespace RingController {
    export type Options = {
        fieldModel: FieldModel,
    }
}

export class RingController implements IController<RingView, cc.Event.EventTouch> {
    private _fieldModel: FieldModel;

    constructor({ fieldModel }: RingController.Options) {
        this._fieldModel = fieldModel;
    }

    public handle(view: RingView, data: cc.Event.EventTouch): void {
        const ringModel = this._fieldModel.getPieceModel(view);

        if (ringModel instanceof RingModel) {
            this._handleRotation(view, data, ringModel);

            ringModel.updateLockedState();
        }
    }

    protected _handleRotation(view: RingView, data: cc.Event.EventTouch, ringModel: RingModel) {
        const ringModelData = ringModel.getData();

        if (ringModelData.isRotatable) {
            const ringWorldPos = data.currentTarget.convertToWorldSpaceAR(cc.Vec2.ZERO);
            const ringPos = cc.v2(cc.Camera.findCamera(view.node).getWorldToScreenPoint(ringWorldPos));
            const prevTouchPos = data.touch.getPreviousLocation();
            const currentTouchPos = data.touch.getLocation();
            const lastAngle = ringModelData.angle;
            const deltaAngle = AngleUtil.getDeltaAngle(ringPos, prevTouchPos, currentTouchPos);

            if (view.locks.some((lock: LockView) => {
                return this._checkRotationBlocked(lock, deltaAngle);
            })) {
                return;
            }

            ringModel.updateData({angle: AngleUtil.validateAngle(lastAngle - deltaAngle)});
        } else {
            view.animateBlock();
        }
    }

    protected _checkRotationBlocked(lock: LockView, deltaAngle: number): boolean {
        if (deltaAngle < 0) {
            return lock.rotationLimiter.overClockwiseBlocked;
        } else {
            return lock.rotationLimiter.clockwiseBlocked;
        }
    }
}