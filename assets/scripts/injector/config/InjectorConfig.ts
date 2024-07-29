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
        'images': [
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
        'prefabs': [
            'Lock',
            'LockView',
            'Ring'
        ]
    }),

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
                    'releaseHandler': CommonInjectorConfig.LockablePieceController
                }
            }),
            
            [PieceType.Lock]: new LockablePieceBuilder({
                prefabGetter: new BundlePrefabGetter('prefabs', 'Lock'),
                fieldModel: ModelInjectorConfig.FieldModel,
                blockerBuilder: CommonInjectorConfig.BlockerPieceBuilder,
                linkModel: ModelInjectorConfig.LinkModel,
                handlers: {
                    'releaseHandler': CommonInjectorConfig.LockablePieceController
                }
            }),
        }
    }),

    'FieldModel': ModelInjectorConfig.FieldModel
};