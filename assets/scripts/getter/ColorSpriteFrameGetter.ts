import { IGetter } from "../interface/IGetter";
import { CacheManager } from "../managers/CacheManager";

export namespace ColorSpriteFrameGetter {
    export type Options = {
        bundleName: string,
        spriteNamePrefix: string,
        cacheManager?: CacheManager,
    }
}

export class ColorSpriteFrameGetter implements IGetter<cc.SpriteFrame, string> {
    private _bundleName: string;
    private _spriteNamePrefix: string;
    private _cacheManager: CacheManager;

    constructor({bundleName, spriteNamePrefix, cacheManager}: ColorSpriteFrameGetter.Options) {
        this._bundleName = bundleName;
        this._spriteNamePrefix = spriteNamePrefix;
        this._cacheManager = cacheManager;
    }

    public async get(color: string): Promise<cc.SpriteFrame> {
        return new Promise((resolve, reject) => {
            const cachedValue = this._cacheManager?.get(`${this._bundleName}/${this._spriteNamePrefix}${color}`);

            if (cachedValue) {
                resolve(cachedValue as cc.SpriteFrame);
            }

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