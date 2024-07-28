export abstract class BaseModel<Data> {
    constructor(data?: Data) {
        if (data) {
            this.setData(data);
        }
    }

    abstract setData(data: Data): void;
    abstract getData(): Data;
}