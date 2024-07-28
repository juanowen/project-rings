import { BlockerPieceBuilder } from "../../builder/BlockerPieceBuilder";
import { LockablePieceBuilder } from "../../builder/LockablePieceBuilder";
import { RingPieceBuilder } from "../../builder/RingPieceBuilder";
import { PieceType } from "../../enum/PieceType";
import { PieceFactory } from "../../factory/PieceFactory";
import { BundlePrefabGetter } from "../../getter/BundlePrefabGetter";
import { BundleLoader } from "../../loader/BundleLoader";
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
                fieldModel: ModelInjectorConfig.FieldModel,
                blockerBuilder: new BlockerPieceBuilder({
                    prefabGetter: new BundlePrefabGetter('prefabs', 'LockView'),
                    fieldModel: ModelInjectorConfig.FieldModel,
                }),
                linkModel: ModelInjectorConfig.LinkModel
            }),
            
            [PieceType.Lock]: new LockablePieceBuilder({
                prefabGetter: new BundlePrefabGetter('prefabs', 'Lock'),
                fieldModel: ModelInjectorConfig.FieldModel,
                blockerBuilder: new BlockerPieceBuilder({
                    prefabGetter: new BundlePrefabGetter('prefabs', 'LockView'),
                    fieldModel: ModelInjectorConfig.FieldModel,
                }),
                linkModel: ModelInjectorConfig.LinkModel
            }),
        }
    })
};