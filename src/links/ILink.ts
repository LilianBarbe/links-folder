import { Link } from "../context";

export default interface ILink {
    is(link: string): boolean;
    setLink(link: Link): ILink;
    render(): any;
}