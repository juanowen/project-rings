import { PieceType } from "../enum/PieceType";
import { IController } from "../interface/IController";
import { FieldModel } from "../model/FieldModel";
import { RingModel } from "../model/RingModel";
import { RingView } from "../view/RingView";
import { TutorialView } from "../view/TutorialView";

export namespace TutorialController {
    export type Options = {
        tutorNodePath: string,
        fieldModel: FieldModel,
    }
}

export class TutorialController implements IController<TutorialView> {
    private _tutorNodePath: string;
    private _fieldModel: FieldModel;

    constructor({tutorNodePath, fieldModel}: TutorialController.Options) {
        this._tutorNodePath = tutorNodePath;
        this._fieldModel = fieldModel;
    }

    public handle(view?: TutorialView, forceMode: boolean = false): void {
        const tutorialView = view ?? this._getTutorialView();

        if (tutorialView) {
            const models = this._fieldModel.getModelsByType(PieceType.Ring);
            const ringModel = models.find((model: RingModel) => model.getData().isRotatable);

            if (ringModel?.view) {
                const ringView = ringModel.view as RingView;
            
                tutorialView.target = ringView.node;

                if (forceMode) {
                    tutorialView.playTutorial();
                } else {
                    tutorialView.setSlippingMode();
                }
            } else {
                tutorialView.target = null;
            }
        }
    }

    protected _getTutorialView() {
        const node = cc.find(this._tutorNodePath);

        return node?.getComponent(TutorialView);
    }
}