import ILink from "./ILink";
import { Action, ActionPanel, List } from "@raycast/api";
import { Link } from "../context";

export default class Url implements ILink {

    link: Link = null;
    setLink(link: Link): ILink {
        this.link = link;
        return this;
    }
    is = (link: string): boolean => {
        return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gm.test(link);
    }

    render(): any {
        return (
            <List.Item
                key={this.link.link}
                title={this.link.title}
                subtitle={new URL(this.link.link).hostname} // Afficher uniquement le nom de domaine
                actions={
                    <ActionPanel>
                        <Action.OpenInBrowser url={this.link.link} />
                    </ActionPanel>
                }
            />
        )
    }
}