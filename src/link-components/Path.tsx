import { Action } from "@raycast/api";
import { JSX } from "react";
import { BaseLink } from "./BaseLink";
import { randomUUID } from "node:crypto";
import { Link } from "../types/Types";

export const Path = (link: Link): JSX.Element => {
    return (
        <BaseLink key={randomUUID()} link={link} subtitle={link.link}>
            <Action.Open title={link.linkType} target={link.link} />
        </BaseLink>
    );
}