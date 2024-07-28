import { RingController } from "../controller/RingController";
import { FieldModel } from "../model/FieldModel";
import { LockablePieceModel } from "../model/LockablePieceModel";
import { LockModel } from "../model/LockModel";
import { RenderModel } from "../model/RenderModel";
import { RingModel } from "../model/RingModel";
import { IView } from "../view/IView";
import { LockablePieceView } from "../view/LockablePieceView";
import { LockView } from "../view/LockView";
import { RingView } from "../view/RingView";

const { ccclass, property } = cc._decorator;

@ccclass('TypePrefabMapping')
class TypePrefabMapping {
    @property()
    public type: string = '';

    @property({
        type: cc.Prefab
    })
    public prefab: cc.Prefab = null;
}

@ccclass
export class GameManager extends cc.Component {
    @property({
        type: cc.JsonAsset,
        visible: true,
    })
    protected _config: cc.JsonAsset = null;

    @property({
        type: cc.Node,
        visible: true,
    })
    protected _fieldHolder: cc.Node = null;

    @property({
        type: [TypePrefabMapping],
        visible: true,
    })
    protected _typePrefabMapping: TypePrefabMapping[] = [];

    protected onLoad(): void {
        this._initGame();
    }

    protected _initGame(): void {
        if (this._config && this._fieldHolder) {
            const config = this._config.json;
            const fieldModel = new FieldModel();

            if (Array.isArray(config)) {
                const fieldData: Map<IView, RenderModel> = new Map();

                config.forEach(piece => {
                    switch (piece.type) {
                        case 'ring': {
                            const { node, view, model } = this._createRing(piece, fieldModel);

                            fieldData.set(view, model);
                            this._fieldHolder.addChild(node);

                            break;
                        }
                        case 'lock': {
                            const { node, view, model } = this._createLock(piece);

                            fieldData.set(view, model);
                            this._fieldHolder.addChild(node);

                            break;
                        }
                    }
                });

                fieldModel.setData({ pieces: fieldData });
            }
        }
    }

    protected _createRing(data: RingModel.Data, field: FieldModel) {
        const prefabConfig = this._typePrefabMapping.find(({ type }) => type === 'ring');

        if (prefabConfig?.prefab) {
            const node = cc.instantiate(prefabConfig.prefab);
            const model = new RingModel(data);
            const view = node.getComponent(RingView);

            data.locks.forEach((lockData: LockModel.Data) => {
                const blocker = this._createBlocker(lockData);
                view.addLockView(blocker.view);
                node.addChild(blocker.node);
            });

            view.handler = new RingController({ field });
            view.render(model.getData());

            return { node, view, model };
        }
    }

    protected _createLock(data: LockablePieceModel.Data) {
        const prefabConfig = this._typePrefabMapping.find(({ type }) => type === 'lock');

        if (prefabConfig?.prefab) {
            const node = cc.instantiate(prefabConfig.prefab);
            const model = new LockablePieceModel(data);
            const view = node.getComponent(LockablePieceView);

            data.locks.forEach((lockData: LockModel.Data) => {
                const blocker = this._createBlocker(lockData);
                view.addLockView(blocker.view);
                node.addChild(blocker.node);
            });

            view.render(model.getData());

            return { node, view, model };
        }
    }

    protected _createBlocker(data: LockModel.Data) {
        const prefabConfig = this._typePrefabMapping.find(({ type }) => type === 'blocker');

        if (prefabConfig?.prefab) {
            const node = cc.instantiate(prefabConfig.prefab);
            const model = new LockModel(data);
            const view = node.getComponent(LockView);

            view.render(model.getData());

            return { node, view, model };
        }
    }
}