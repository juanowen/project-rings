import { ConfigEntry } from "../type/Config";
import { PieceFactory } from "../factory/PieceFactory";
import { IGetter } from "../interface/IGetter";

export namespace PieceBuilder {
    export type Options = {
        prefabGetter: IGetter<cc.Prefab>,
    }

    export type Payload = {
        configEntry: ConfigEntry
    }
}

export abstract class PieceBuilder<Payload> implements PieceFactory.IPieceBuilder<Payload> {
    protected _prefabGetter: IGetter<cc.Prefab>;

    constructor({prefabGetter}: PieceBuilder.Options) {
        this._prefabGetter = prefabGetter;
    }

    public async build(payload?: Payload): Promise<PieceFactory.PieceData> {
        const prefab = await this._prefabGetter.get();

        if (prefab) {
            const node = cc.instantiate(prefab);
            const data = await this._getPieceData(node, payload);

            data.view?.render(data.model.getData());

            return data;
        }
    }

    protected abstract _getPieceData(node: cc.Node, payload?: Payload): Promise<PieceFactory.PieceData>
}