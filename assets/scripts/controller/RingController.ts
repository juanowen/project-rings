import { FieldModel } from "../model/FieldModel";
import { RingModel } from "../model/RingModel";
import { RingView } from "../view/RingView";
import { IController } from "./IController";

export namespace RingController {
    export type Options = {
        field: FieldModel,
    }
}

export class RingController implements IController<RingView, cc.Event.EventTouch> {
    private _field: FieldModel;

    constructor({ field }: RingController.Options) {
        this._field = field;
    }

    handle(view: RingView, data: cc.Event.EventTouch): void {
        const model = this._field.getPieceModel(view);

        if (model instanceof RingModel) {
            const ringPos = data.currentTarget.convertToWorldSpaceAR(cc.Vec2.ZERO);
            const prevTouchPos = data.touch.getPreviousLocation();
            const currentTouchPos = data.touch.getLocation();

            const prevRad = Math.atan2(ringPos.y - prevTouchPos.y, ringPos.x - prevTouchPos.x);
            const currentRad = Math.atan2(ringPos.y - currentTouchPos.y, ringPos.x - currentTouchPos.x);
            const deltaRad = prevRad - currentRad;

            const deltaAngle = deltaRad * 180 / Math.PI;
            model.angle -= deltaAngle;

            view.render(model.getData());
        }
    }
}