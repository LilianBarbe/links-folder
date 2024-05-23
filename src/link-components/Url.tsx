import { Action } from "@raycast/api";
import { JSX } from "react";
import { BaseLink } from "./BaseLink";
import { randomUUID } from "node:crypto";
import { Link } from "../types/Types";

export const Url = (link: Link): JSX.Element => {
    return (
        <BaseLink key={randomUUID()} link={link} subtitle={new URL(link.link).hostname}>
            <Action.OpenInBrowser url={link.link} />
        </BaseLink>
    )
}