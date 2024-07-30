import { CacheManager } from "../managers/CacheManager";

export namespace BundleLoader {
    export type Options = {
        cacheManager?: CacheManager,
        bundleConfig: Record<string, BundleConfig>
    }

    export type BundleConfig = {
        type: FileType,
        files: string[]
    }

    export type FileType = { 
        prototype: cc.Asset 
    }
}

export class BundleLoader {
    private _cacheManager: CacheManager;
    private _bundleConfig: Record<string, BundleLoader.BundleConfig>;

    private _progress: number;
    private _wholeProgress: number;
    private _progressCallback: (progress: number) => void;

    constructor({cacheManager, bundleConfig}: BundleLoader.Options) {
        this._cacheManager = cacheManager;
        this._bundleConfig = bundleConfig;

        this._wholeProgress = Object.values(this._bundleConfig).reduce((pv, {files}) => pv + files.length, 0);
    }

    public async load(progressCallback: (progress: number) => void) {
        this._progressCallback = progressCallback;
        this._progress = 0;

        for (const [bundleName, {type, files}] of Object.entries(this._bundleConfig)) {
            await this._loadBundle(bundleName, type, files);

            console.log(bundleName, 'loaded!');
        }
    }

    protected async _loadBundle(bundleName: string, type: BundleLoader.FileType, files: string[]) {
        return new Promise((resolve, reject) => {
            cc.assetManager.loadBundle(bundleName, async (error, bundle) => {
                if (!error) {
                    for (const file of files) {
                        await this._loadFile(bundle, type, file);
                    }

                    resolve(bundle);
                } else {
                    reject(error);
                }
            });
        });
    }

    protected async _loadFile(bundle: cc.AssetManager.Bundle, type: BundleLoader.FileType, path: string) {
        return new Promise((resolve, reject) => {
            bundle.load(path, type, null, (error, asset) => {
                const percent = ++this._progress / this._wholeProgress;
                this._progressCallback(percent);

                if (!error) {
                    this._cacheManager?.add(`${bundle.name}/${path}`, asset);
                    resolve(asset);
                } else {
                    reject(error);
                }
            });
        });
    }
}