export abstract class BaseModel<Data> {
    constructor(data?: Data) {
        if (data) {
            this.initData(data);
        }
    }

    public updateData(data: Record<string, unknown>): void {
        const newData = Object.assign({}, this.getData(), data);

        this.initData(newData);
    }

    abstract initData(data: Data): void;
    abstract getData(): Data;
}