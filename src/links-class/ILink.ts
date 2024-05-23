import { JSX } from "react";
import { Link } from "../types/Types";

export default interface ILink {
    is(link: string): boolean;
    render(link: Link): JSX.Element|null;
    treatment(link: string): string;
}