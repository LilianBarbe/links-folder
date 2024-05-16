import ILink from "./ILink";
import { Action, ActionPanel, List, Icon } from "@raycast/api";
import { Link } from "../context";

export default class Url implements ILink {
  link: Link = null;

  setLink(link: Link): ILink {
    this.link = link;
    return this;
  }

  is = (link: string): boolean => {
    return /^\//gm.test(link);
  };

  render(): any {
    return (
      <List.Item
        key={this.link.link}
        title={this.link.title}
        subtitle={this.link.link} // Afficher uniquement le nom de domaine
        icon={Icon.Folder}
        actions={
          <ActionPanel>
            <Action.Open title={this.link.linkType} target={this.link.link} />
          </ActionPanel>
        }
      />
    );
  }
}
