import Url from "./UrlClass";
import Path from "./PathClass";
import ILink from "./ILink";

interface Components {
    [key: string]: ILink
}

export const links: Components = {
    url: new Url(),
    path: new Path()
}