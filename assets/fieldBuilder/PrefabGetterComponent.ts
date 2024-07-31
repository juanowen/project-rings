import { IGetter } from "../scripts/interface/IGetter";

const {ccclass, property} = cc._decorator;

@ccclass
export class PrefabGetterComponent extends cc.Component implements IGetter<cc.Prefab, string> {
    @property({
        type: [cc.Prefab],
        visible: true,
    })
    protected _prefabs: cc.Prefab[] = [];

    public get(prefabName: string): cc.Prefab {
        return this._prefabs.find(({ name }) => name === prefabName);
    }
}