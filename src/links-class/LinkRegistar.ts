import Url from "./UrlClass";
import Path from "./PathClass";
import { Link } from "../types/Types";

interface ConstructorMap {
    [key: string]: new (value?: Link) => Url | Path;
}

export const typeToClassMap: ConstructorMap = {
    url: Url,
    path: Path,
};

export function getComponentsInstance(type: string, link?: Link) {
    const ClassConstructor = typeToClassMap[type];
    if (!ClassConstructor) {
        throw new Error(`Unknown type: ${type}`);
    }
    return new ClassConstructor(link);
}