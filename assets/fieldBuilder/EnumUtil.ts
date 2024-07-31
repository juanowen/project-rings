export class EnumUtil {
    public static getCCEnum(registry: unknown, exclude?: Array<string | number>) {
        return cc.Enum(Object.values(registry).reduce((pv, el, i) => {
            if (!exclude || !exclude.includes(el)) {
                pv[el] = i;
            }
        
            return pv;
        }, {}));
    }

    public static getCCEnumElement(registry: unknown, el: string | number) {
        return Object.values(registry)[el];
    }

    public static getCCEnumIndex(registry: unknown, el: string): number {
        return Object.values(registry).indexOf(el);
    }
}