export interface IGetter<Value, Params = unknown> {
    get(params?: Params): Promise<Value> | Value;
}