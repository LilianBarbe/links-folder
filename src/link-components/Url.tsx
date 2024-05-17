import { Action } from "@raycast/api";
import { Link } from "../context";
import { JSX } from "react";
import { BaseLink } from "./BaseLink";
import { randomUUID } from "node:crypto";

export const Url = (link: Link): JSX.Element => {
    return (
        <BaseLink key={randomUUID()} link={link} subtitle={new URL(link.link).hostname}>
            <Action.OpenInBrowser url={link.link} />
        </BaseLink>
    )
}