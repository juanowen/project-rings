export interface IView<Data = null> {
    render(data?: Data): void;
}