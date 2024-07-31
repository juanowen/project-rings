import { IGetter } from "../interface/IGetter";
import { CacheManager } from "../managers/CacheManager";

export namespace BundlePrefabGetter {
    export type Options = {
        bundleName: string,
        cacheManager?: CacheManager,
    }
}

export class BundlePrefabGetter implements IGetter<cc.Prefab, string> {
    private _bundleName: string;
    private _cacheManager: CacheManager;

    constructor({bundleName, cacheManager}: BundlePrefabGetter.Options) {
        this._bundleName = bundleName;
        this._cacheManager = cacheManager;
    }

    public async get(prefabName: string): Promise<cc.Prefab> {
        return new Promise((resolve, reject) => {
            const cachedValue = this._cacheManager?.get(`${this._bundleName}/${prefabName}`);

            if (cachedValue) {
                resolve(cachedValue as cc.Prefab);
            }

            const bundle = cc.assetManager.getBundle(this._bundleName);

            bundle.load(prefabName, cc.Prefab, null, (error, asset) => {
                if (error) {
                    reject(error);
                }

                resolve(asset);
            });
        });
    }

}