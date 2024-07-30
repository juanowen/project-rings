export class CacheManager {
    private _entries: Record<string, unknown> = {};

    public add(path: string, value: unknown): void {
        this._entries[path] = value;
    }

    public get(path: string): unknown {
        return this._entries[path];
    }
}