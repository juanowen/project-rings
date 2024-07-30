import { LockablePieceBuilder } from "../../builder/LockablePieceBuilder";
import { RingPieceBuilder } from "../../builder/RingPieceBuilder";
import { PieceType } from "../../enum/PieceType";
import { PieceFactory } from "../../factory/PieceFactory";
import { BundlePrefabGetter } from "../../getter/BundlePrefabGetter";
import { ColorSpriteFrameGetter } from "../../getter/ColorSpriteFrameGetter";
import { BundleLoader } from "../../loader/BundleLoader";
import CommonInjectorConfig from "./CommonInjectorConfig";
import ModelInjectorConfig from "./ModelInjectorConfig";

export default {
    'BundleLoader': new BundleLoader({
        cacheManager: CommonInjectorConfig.CacheManager,
        bundleConfig: {
            'images': {
                type: cc.SpriteFrame,
                files: [
                    'ring_blue',
                    'ring_green',
                    'ring_pink',
                    'ring_red',
                    'ring_yellow',
                    'single_blocker_blue',
                    'single_blocker_green',
                    'single_blocker_pink',
                    'single_blocker_red',
                    'single_blocker_yellow',
                ],
            },
            'prefabs': {
                type: cc.Prefab,
                files: [
                    'Lock',
                    'LockView',
                    'Ring'
                ]
            }
        }
    }),

    'PieceFactory': new PieceFactory({
        builderMap: {
            [PieceType.Ring]: new RingPieceBuilder({
                prefabGetter: new BundlePrefabGetter({
                    bundleName: 'prefabs', 
                    prefabName: 'Ring',
                    cacheManager: CommonInjectorConfig.CacheManager
                }),
                spriteFrameGetter: new ColorSpriteFrameGetter({
                    bundleName: 'images', 
                    spriteNamePrefix: 'ring_',
                    cacheManager: CommonInjectorConfig.CacheManager
                }),
                fieldModel: ModelInjectorConfig.FieldModel,
                blockerBuilder: CommonInjectorConfig.BlockerPieceBuilder,
                handlers: {
                    'touchHandler': CommonInjectorConfig.RingController,
                    'releaseHandler': CommonInjectorConfig.LockablePieceController
                }
            }),
            
            [PieceType.LockablePiece]: new LockablePieceBuilder({
                prefabGetter: new BundlePrefabGetter({
                    bundleName: 'prefabs', 
                    prefabName: 'Lock',
                    cacheManager: CommonInjectorConfig.CacheManager
                }),
                fieldModel: ModelInjectorConfig.FieldModel,
                blockerBuilder: CommonInjectorConfig.BlockerPieceBuilder,
                handlers: {
                    'releaseHandler': CommonInjectorConfig.LockablePieceController
                }
            }),
        }
    }),

    'FieldModel': ModelInjectorConfig.FieldModel
};