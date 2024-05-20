import { Action } from "@raycast/api";
import { Link } from "../context";
import { JSX } from "react";
import { BaseLink } from "./BaseLink";

export const Path = (link: Link): JSX.Element => {
    return (
        <BaseLink key={link.link} link={link} subtitle={link.link}>
            <Action.Open title={link.linkType} target={link.link} />
        </BaseLink>
    );
}