import { IGetter } from "../interface/IGetter";

export class ColorSpriteFrameGetter implements IGetter<cc.SpriteFrame, string> {
    private _bundleName: string;
    private _spriteNamePrefix: string;

    constructor(bundleName: string, spriteNamePrefix: string) {
        this._bundleName = bundleName;
        this._spriteNamePrefix = spriteNamePrefix;
    }

    public async get(color: string): Promise<cc.SpriteFrame> {
        return new Promise((resolve, reject) => {
            const bundle = cc.assetManager.getBundle(this._bundleName);
    
            bundle.load(`${this._spriteNamePrefix}${color}`, cc.SpriteFrame, null, (error, asset) => {
                if (error) {
                    reject(error);
                }

                resolve(asset);
            });
        });
    }
    
}