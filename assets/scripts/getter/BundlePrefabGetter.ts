import { IGetter } from "../interface/IGetter";

export class BundlePrefabGetter implements IGetter<cc.Prefab> {
    private _bundleName: string;
    private _prefabName: string;

    constructor(bundleName: string, prefabName: string) {
        this._bundleName = bundleName;
        this._prefabName = prefabName;
    }

    public async get(): Promise<cc.Prefab> {
        return new Promise((resolve, reject) => {
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