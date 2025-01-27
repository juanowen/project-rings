import { IController } from "../interface/IController";

const { ccclass, property } = cc._decorator;

@ccclass
export class TutorialView extends cc.Component {
    @property({
        type: sp.Skeleton,
        visible: true,
    })
    protected _spine: sp.Skeleton = null;

    @property({
        visible() {
            return this._spine;
        },
    })
    protected _spineAnimationName: string = 'swipe';
    
    @property({
        type: cc.Animation,
        visible: true,
    })
    protected _animation: cc.Animation = null;

    @property({
        visible: true,
    })
    protected _tutorialTimeout: number = 3;

    protected _sleepTimer: number = 0;
    
    protected _tutorialController: IController<TutorialView> = null;
    protected _target: cc.Node = null;

    public set tutorialController(value: IController<TutorialView>) {
        this._tutorialController = value;

        this._tutorialController.handle(this);
    }

    public set target(value: cc.Node) {
        this._target = value;
    }

    protected update(dt: number): void {
        if (
            this._sleepTimer < this._tutorialTimeout &&
            this._sleepTimer + dt >= this._tutorialTimeout
        ) {
            this.playTutorial();
        }

        this._sleepTimer += dt;
    }

    public playTutorial() {
        if (this._target?.isValid === false) {
            this._tutorialController?.handle(this, true);
        }

        if (this._target) {
            const ringWorldPos = this._target.convertToWorldSpaceAR(cc.Vec2.ZERO);
            const ringLocalPos = this.node.parent.convertToNodeSpaceAR(ringWorldPos);

            this.node.setPosition(ringLocalPos);

            this._animation?.play();
            this._spine?.setAnimation(0, this._spineAnimationName, true);
            this.node.opacity = 255;
        }
    }

    public setSlippingMode(): void {
        cc.tween(this.node)
            .to(0.25, { opacity: 0 })
            .call(() => {
                this._sleepTimer = 0;
            })
            .start();
    }
}