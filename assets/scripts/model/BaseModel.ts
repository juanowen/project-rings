export abstract class BaseModel<Data> {
    constructor(data: Data) {
        this.setData(data);
    }

    abstract setData(data: Data): void;
    abstract getData(): Data;
}