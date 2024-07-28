export interface IController<View, Data> {
    handle(view: View, data: Data): void;
}