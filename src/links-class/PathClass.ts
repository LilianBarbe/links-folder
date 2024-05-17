import ILink from "./ILink";
import { Link } from "../context";
import { JSX } from "react";
import { Path } from "../link-components/Path";

export default class PathClass implements ILink {
    is = (link: string): boolean => {
        return /^\//gm.test(link);
    };

    render(link: Link): JSX.Element | null {
        return Path(link);
    }
}