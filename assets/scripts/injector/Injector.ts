import InjectorConfig from "./config/InjectorConfig";

export function Injector(className: string = undefined) {
    const prop = Symbol();

    return function (classEntity: any, propertyName: string) {
        return Object.defineProperty(classEntity, propertyName, {
            get() {
                if (this[prop] === undefined) {
                    const value = InjectorConfig[className];

                    if (value) {
                        this[prop] = value;
                        return value;

                    } else {
                        return null;
                    }
                }

                return this[prop];
            }
        });
    };
}
