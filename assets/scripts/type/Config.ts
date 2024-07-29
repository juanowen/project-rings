import { ColorType } from "../enum/ColorType";

export type ConfigEntry = {
    type: string,
    x: number,
    y: number,
    locks: ConfigLockEntry[],
    angle: number,
    color: ColorType,
};

export type ConfigLockEntry = {
    radius: number,
    angle: number,
    isLocked: boolean,
    color: ColorType,
};