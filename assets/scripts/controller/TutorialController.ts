import { IController } from "../interface/IController";
import { FieldModel } from "../model/FieldModel";
import { TutorialView } from "../view/TutorialView";

export namespace TutorialController {
    export type Options = {
        tutorNodePath: string,
    }
}

export class TutorialController implements IController<TutorialView> {
    private _tutorNodePath: string;

    constructor({tutorNodePath}: TutorialController.Options) {
        this._tutorNodePath = tutorNodePath;
    }

    public handle(view?: TutorialView): void {
        const tutorialView = view ?? this._getTutorialView();

        tutorialView?.setSlippingMode();
    }

    protected _getTutorialView() {
        const node = cc.find(this._tutorNodePath);

        return node?.getComponent(TutorialView);
    }
}