export type ConfigEntry = {
    type: string,
    x: number,
    y: number,
    locks: ConfigLockEntry[],
    angle: number
};

export type ConfigLockEntry = {
    radius: number,
    angle: number,
    isLocked: boolean
};