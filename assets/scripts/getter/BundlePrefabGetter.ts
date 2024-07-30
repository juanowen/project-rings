import { IGetter } from "../interface/IGetter";
import { CacheManager } from "../managers/CacheManager";

export namespace BundlePrefabGetter {
    export type Options = {
        bundleName: string,
        prefabName: string,
        cacheManager?: CacheManager,
    }
}

export class BundlePrefabGetter implements IGetter<cc.Prefab> {
    private _bundleName: string;
    private _prefabName: string;
    private _cacheManager: CacheManager;

    constructor({bundleName, prefabName, cacheManager}: BundlePrefabGetter.Options) {
        this._bundleName = bundleName;
        this._prefabName = prefabName;
        this._cacheManager = cacheManager;
    }

    public async get(): Promise<cc.Prefab> {
        return new Promise((resolve, reject) => {
            const cachedValue = this._cacheManager?.get(`${this._bundleName}/${this._prefabName}`);

            if (cachedValue) {
                resolve(cachedValue as cc.Prefab);
            }

            const bundle = cc.assetManager.getBundle(this._bundleName);

            bundle.load(this._prefabName, cc.Prefab, null, (error, asset) => {
                if (error) {
                    reject(error);
                }

                resolve(asset);
            });
        });
    }

}