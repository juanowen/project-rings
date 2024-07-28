import { BlockerPieceBuilder } from "../../builder/BlockerPieceBuilder";
import { LockablePieceBuilder } from "../../builder/LockablePieceBuilder";
import { RingPieceBuilder } from "../../builder/RingPieceBuilder";
import { PieceType } from "../../enum/PieceType";
import { PieceFactory } from "../../factory/PieceFactory";
import { BundlePrefabGetter } from "../../getter/BundlePrefabGetter";
import { BundleLoader } from "../../loader/BundleLoader";

export default {
    'BundleLoader': new BundleLoader([
        'images',
        'prefabs'
    ]),

    'PieceFactory': new PieceFactory({
        builderMap: {
            [PieceType.Ring]: new RingPieceBuilder({
                prefabGetter: new BundlePrefabGetter('prefabs', 'Ring'),
                blockerBuilder: new BlockerPieceBuilder({
                    prefabGetter: new BundlePrefabGetter('prefabs', 'LockView'),
                })
            }),
            [PieceType.Lock]: new LockablePieceBuilder({
                prefabGetter: new BundlePrefabGetter('prefabs', 'Lock'),
                blockerBuilder: new BlockerPieceBuilder({
                    prefabGetter: new BundlePrefabGetter('prefabs', 'LockView'),
                })
            }),
        }
    })
};