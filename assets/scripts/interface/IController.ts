export interface IController<View, Data = unknown> {
    handle(view?: View, data?: Data): void;
}