import { ALink } from "./ALink";
import { JSX } from "react";
import { Url } from "../link-components/Url";
import { Link } from "../types/Types";

export default class UrlClass extends ALink {
    is = (link: string): boolean => {
        return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gm.test(link);
    }

    render(link: Link): JSX.Element | null {
        return Url(link);
    }
}