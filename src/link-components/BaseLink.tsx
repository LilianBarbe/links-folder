import { Action, ActionPanel, confirmAlert, Icon, Keyboard, List, showToast, Toast } from "@raycast/api";
import { JSX } from "react";
import AddLinkCommand from "../add-link";
import { Link } from "../types/Types";
import { useFolders } from "../context";

export const BaseLink = (props: { link: Link, subtitle: string, children: JSX.Element }): JSX.Element => {
    const { deleteLink } = useFolders();

    async function handleDelete(folderName: string, linkUrl: string) {
        const options = {
            title: "Supprimer le lien",
            message: `Êtes-vous sûr de vouloir supprimer ce lien ?`,
            primaryAction: {
                onAction: () => {
                },
                title: "Supprimer"
            },
            style: Action.Style.Destructive // Utiliser Action.Style.Destructive ici aussi
        };

        const result = await confirmAlert(options);
        if (result) {
            deleteLink(folderName, linkUrl);
            showToast({ title: "Lien supprimé", style: Toast.Style.Success });
        }
    }

    return (
        <List.Item
            title={props.link.title}
            subtitle={props.subtitle}
            actions={
                <ActionPanel>
                    {props.children}
                    <Action
                        title="Supprimer le lien"
                        style={Action.Style.Destructive}
                        onAction={() => handleDelete(props.link.folder, props.link.link)}
                    />
                    <Action.Push
                        title="Editer le lien"
                        icon={Icon.Pencil}
                        target={<AddLinkCommand link={props.link} />}
                        shortcut={Keyboard.Shortcut.Common.Edit}
                    />
                </ActionPanel>
            }
        />
    );
};