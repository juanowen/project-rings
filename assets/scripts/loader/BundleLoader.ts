export class BundleLoader {
    private _bundleList: string[];

    constructor(bundleList: string[] = []) {
        this._bundleList = bundleList;
    }

    public async load() {
        for (const entry of this._bundleList) {
            await this._loadBundle(entry);

            console.log(entry, 'loaded!');
        }
    }

    protected async _loadBundle(bundleName: string) {
        return new Promise((resolve, reject) => {
            cc.assetManager.loadBundle(bundleName, (error, bundle) => {
                if (!error) {
                    resolve(bundle);
                } else {
                    reject(error);
                }
            });
        });
    }
}