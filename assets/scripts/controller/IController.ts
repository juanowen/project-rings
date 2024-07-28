export interface IController<Data> {
    handle(data: Data): void;
}