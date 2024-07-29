import { BlockerPieceBuilder } from "../../builder/BlockerPieceBuilder";
import { LockablePieceController } from "../../controller/LockablePieceController";
import { LockController } from "../../controller/LockController";
import { RingController } from "../../controller/RingController";
import { TutorialController } from "../../controller/TutorialController";
import { BundlePrefabGetter } from "../../getter/BundlePrefabGetter";
import { ColorSpriteFrameGetter } from "../../getter/ColorSpriteFrameGetter";
import ModelInjectorConfig from "./ModelInjectorConfig";

export default {
    'BlockerPieceBuilder': new BlockerPieceBuilder({
        prefabGetter: new BundlePrefabGetter('prefabs', 'LockView'),
        spriteFrameGetter: new ColorSpriteFrameGetter('images', 'single_blocker_'),
        fieldModel: ModelInjectorConfig.FieldModel,
        handlers: {
            'collisionHandler': new LockController({
                fieldModel: ModelInjectorConfig.FieldModel,
                linkModel: ModelInjectorConfig.LinkModel,
                lockablePieceController: new LockablePieceController({
                    fieldModel: ModelInjectorConfig.FieldModel,
                    linkModel: ModelInjectorConfig.LinkModel,
                })
            }),
        }
    }),

    'RingController': new RingController({
        fieldModel: ModelInjectorConfig.FieldModel,
        tutorialController: new TutorialController({
            tutorNodePath: 'Canvas/Tutorial',
        })
    }),

    'LockablePieceController': new LockablePieceController({
        fieldModel: ModelInjectorConfig.FieldModel,
        linkModel: ModelInjectorConfig.LinkModel,
    })
}