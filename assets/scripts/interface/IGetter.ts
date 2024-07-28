export interface IGetter<Value> {
    get(): Promise<Value> | Value;
}