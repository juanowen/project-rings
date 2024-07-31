import { BlockerPieceBuilder } from "../../builder/BlockerPieceBuilder";
import { LockablePieceController } from "../../controller/LockablePieceController";
import { LockController } from "../../controller/LockController";
import { RingController } from "../../controller/RingController";
import { TutorialController } from "../../controller/TutorialController";
import { BundlePrefabGetter } from "../../getter/BundlePrefabGetter";
import { ColorSpriteFrameGetter } from "../../getter/ColorSpriteFrameGetter";
import { CacheManager } from "../../managers/CacheManager";
import ModelInjectorConfig from "./ModelInjectorConfig";

export const CacheResolver = new CacheManager();

export default {
    'BlockerPieceBuilder': new BlockerPieceBuilder({
        prefabGetter: new BundlePrefabGetter({
            bundleName: 'prefabs', 
            cacheManager: CacheResolver
        }),
        spriteFrameGetter: new ColorSpriteFrameGetter({
            bundleName: 'images', 
            spriteNamePrefix: 'single_blocker_',
            cacheManager: CacheResolver
        }),
        fieldModel: ModelInjectorConfig.FieldModel,
        prefabName: 'LockView',
        handlers: {
            'collisionHandler': new LockController({
                fieldModel: ModelInjectorConfig.FieldModel,
                lockablePieceController: new LockablePieceController({
                    fieldModel: ModelInjectorConfig.FieldModel,
                })
            }),
        }
    }),

    'RingController': new RingController({
        fieldModel: ModelInjectorConfig.FieldModel,
        tutorialController: new TutorialController({
            tutorNodePath: 'Canvas/Tutorial',
            fieldModel: ModelInjectorConfig.FieldModel
        })
    }),

    'LockablePieceController': new LockablePieceController({
        fieldModel: ModelInjectorConfig.FieldModel,
    }),

    'TutorialController': new TutorialController({
        tutorNodePath: 'Canvas/Tutorial',
        fieldModel: ModelInjectorConfig.FieldModel
    }),

    'CacheManager': CacheResolver
}