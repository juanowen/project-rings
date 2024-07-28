export interface IView<Data = unknown> {
    render(data?: Data): void;
}