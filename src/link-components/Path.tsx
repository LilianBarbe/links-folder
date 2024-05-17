import { Action, ActionPanel, List } from "@raycast/api";
import { Link } from "../context";
import { JSX } from "react";

export const Path = (link: Link): JSX.Element => {
    return (
        <List.Item
            key={link.link}
            title={link.title}
            subtitle={link.link}
            actions={
                <ActionPanel>
                    <Action.Open title={link.linkType} target={link.link} />
                </ActionPanel>
            }
        />
    );
}