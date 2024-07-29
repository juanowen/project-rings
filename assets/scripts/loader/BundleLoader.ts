export class BundleLoader {
    private _bundleList: Record<string, string[]>;
    private _progress: number;
    private _wholeProgress: number;
    private _progressCallback: (progress: number) => void;

    constructor(bundleList: Record<string, string[]> = {}) {
        this._bundleList = bundleList;
        this._wholeProgress = Object.values(this._bundleList).reduce((pv, files) => pv + files.length, 0);
    }

    public async load(progressCallback: (progress: number) => void) {
        this._progressCallback = progressCallback;
        this._progress = 0;

        for (const [bundleName, files] of Object.entries(this._bundleList)) {
            await this._loadBundle(bundleName, files);

            console.log(bundleName, 'loaded!');
        }
    }

    protected async _loadBundle(bundleName: string, files: string[]) {
        return new Promise((resolve, reject) => {
            cc.assetManager.loadBundle(bundleName, async (error, bundle) => {
                if (!error) {
                    for (const file of files) {
                        await this._loadFile(bundle, file);
                    }

                    resolve(bundle);
                } else {
                    reject(error);
                }
            });
        });
    }

    protected async _loadFile(bundle: cc.AssetManager.Bundle, path: string) {
        return new Promise((resolve, reject) => {
            bundle.load(path, null, (error, asset) => {
                const percent = ++this._progress / this._wholeProgress;
                this._progressCallback(percent);

                if (!error) {
                    resolve(asset);
                } else {
                    reject(error);
                }
            });
        });
    }
}