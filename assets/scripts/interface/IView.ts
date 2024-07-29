export interface IView<Data = unknown> {
    render(data?: Data): void;
    rerender(data?: Data): void;
    changeSpriteFrame(spriteFrame: cc.SpriteFrame): void;
}