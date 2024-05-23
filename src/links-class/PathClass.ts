import ILink from "./ILink";
import { JSX } from "react";
import { Path } from "../link-components/Path";
import { ALink } from "./ALink";
import { Link } from "../types/Types";

export default class PathClass extends ALink {
    is = (link: string): boolean => {
        return /^\//gm.test(link);
    };

    treatment(link: string): string {
        return link;
    }

    render(link: Link): JSX.Element | null {
        return Path(link);
    }
}