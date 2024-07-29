import { BlockerPieceBuilder } from "../../builder/BlockerPieceBuilder";
import { DestroyController } from "../../controller/DestroyController";
import { LockablePieceController } from "../../controller/LockablePieceController";
import { RingController } from "../../controller/RingController";
import { BundlePrefabGetter } from "../../getter/BundlePrefabGetter";
import { ColorSpriteFrameGetter } from "../../getter/ColorSpriteFrameGetter";
import ModelInjectorConfig from "./ModelInjectorConfig";

export default {
    'BlockerPieceBuilder': new BlockerPieceBuilder({
        prefabGetter: new BundlePrefabGetter('prefabs', 'LockView'),
        spriteFrameGetter: new ColorSpriteFrameGetter('images', 'single_blocker_'),
        fieldModel: ModelInjectorConfig.FieldModel,
    }),

    'RingController': new RingController({
        fieldModel: ModelInjectorConfig.FieldModel,
        linkModel: ModelInjectorConfig.LinkModel,
    }),

    'LockablePieceController': new LockablePieceController({
        fieldModel: ModelInjectorConfig.FieldModel
    }),

    'DestroyController': new DestroyController({
        fieldModel: ModelInjectorConfig.FieldModel,
        linkModel: ModelInjectorConfig.LinkModel,
    }),
}