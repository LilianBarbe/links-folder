import { Action, ActionPanel, List } from "@raycast/api";
import { Link } from "../context";
import { JSX } from "react";

export const Url = (link: Link): JSX.Element => {
    return (
        <List.Item
            key={link.link}
            title={link.title}
            subtitle={new URL(link.link).hostname}
            actions={
                <ActionPanel>
                    <Action.OpenInBrowser url={link.link} />
                </ActionPanel>
            }
        />
    )
}