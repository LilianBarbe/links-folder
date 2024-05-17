import { Action } from "@raycast/api";
import { Link } from "../context";
import { JSX } from "react";
import { randomUUID } from "node:crypto";
import { BaseLink } from "./BaseLink";

export const Path = (link: Link): JSX.Element => {
    return (
        <BaseLink key={randomUUID()} link={link} subtitle={link.link}>
            <Action.Open title={link.linkType} target={link.link} />
        </BaseLink>
    );
}