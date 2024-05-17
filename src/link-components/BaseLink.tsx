import { Action, ActionPanel, confirmAlert, List, popToRoot, showToast, Toast } from "@raycast/api";
import { JSX } from "react";
import { useFolders } from "../context";

export const BaseLink = (props: any): JSX.Element => {

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
                </ActionPanel>
            }
        />
    );
};