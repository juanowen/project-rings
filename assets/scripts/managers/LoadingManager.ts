import { Injector } from "../injector/Injector";
import { BundleLoader } from "../loader/BundleLoader";

const { ccclass, property } = cc._decorator;

@ccclass
export class LoadingManager extends cc.Component {
    @property({
        visible: true,
    })
    protected _nextSceneName: string = 'Main';

    @Injector('BundleLoader')
    protected _bundleLoader: BundleLoader;

    protected onLoad(): void {
        this._loadBundles();
    }

    protected async _loadBundles() {
        await this._bundleLoader.load();

        cc.director.loadScene(this._nextSceneName);
    }
}