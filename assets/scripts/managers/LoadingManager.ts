import { Injector } from "../injector/Injector";
import { BundleLoader } from "../loader/BundleLoader";

const { ccclass, property } = cc._decorator;

@ccclass
export class LoadingManager extends cc.Component {
    @property({
        visible: true,
    })
    protected _nextSceneName: string = 'Main';

    @property({
        type: cc.Label,
        visible: true,
    })
    protected _loadingLabel: cc.Label = null;

    @Injector('BundleLoader')
    protected _bundleLoader: BundleLoader;

    protected onLoad(): void {
        this._loadBundles();
    }

    protected async _loadBundles() {
        await this._bundleLoader.load(this._progressCallback.bind(this));

        cc.director.loadScene(this._nextSceneName);
    }

    protected _progressCallback(percent: number) {
        if (this._loadingLabel) {
            this._loadingLabel.string = `Loading... ${Math.floor(percent * 100)}%`;
        }
    }
}