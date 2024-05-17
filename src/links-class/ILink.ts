import { JSX } from "react";
import { Link } from "../context";

export default interface ILink {
    is(link: string): boolean;
    render(link: Link): JSX.Element|null;
}