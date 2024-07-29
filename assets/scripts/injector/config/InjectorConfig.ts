import { BlockerPieceBuilder } from "../../builder/BlockerPieceBuilder";
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
    'BundleLoader': new BundleLoader([
        'images',
        'prefabs'
    ]),

    'PieceFactory': new PieceFactory({
        builderMap: {
            [PieceType.Ring]: new RingPieceBuilder({
                prefabGetter: new BundlePrefabGetter('prefabs', 'Ring'),
                spriteFrameGetter: new ColorSpriteFrameGetter('images', 'ring_'),
                fieldModel: ModelInjectorConfig.FieldModel,
                blockerBuilder: CommonInjectorConfig.BlockerPieceBuilder,
                linkModel: ModelInjectorConfig.LinkModel,
                handlers: {
                    'touchHandler': CommonInjectorConfig.RingController,
                    'collisionHandler': CommonInjectorConfig.LockablePieceController,
                    'destroyHandler': CommonInjectorConfig.DestroyController
                }
            }),
            
            [PieceType.Lock]: new LockablePieceBuilder({
                prefabGetter: new BundlePrefabGetter('prefabs', 'Lock'),
                fieldModel: ModelInjectorConfig.FieldModel,
                blockerBuilder: CommonInjectorConfig.BlockerPieceBuilder,
                linkModel: ModelInjectorConfig.LinkModel,
                handlers: {
                    'collisionHandler': CommonInjectorConfig.LockablePieceController,
                    'destroyHandler': CommonInjectorConfig.DestroyController
                }
            }),
        }
    })
};