import { Action, ActionPanel, Form, popToRoot, showToast } from "@raycast/api";
import { FolderProvider, Link, useFolders } from "./context";
import { useEffect, useState } from "react";
import { linksComponents } from "./links-class/LinkRegistar";

function AddLinkForm(props: { linkData: Link | null }) {
    const { folders, addLink, editLink } = useFolders();
    const { linkData } = props;
    const [selectedFolder, setSelectedFolder] = useState<string | undefined>(linkData?.folder);
    const [newFolderName, setNewFolderName] = useState("");
    const [link, setLink] = useState(linkData ? linkData.link : "");
    const [linkType, setLinkType] = useState("");

    useEffect(() => {
        if (folders.length > 0) {
            if (linkData?.folder) {
                setSelectedFolder(linkData.folder);
            } else {
                setSelectedFolder(folders[folders.length - 1].name);
            }
        }
    }, [folders]);

    useEffect(() => {
        for (const [key, value] of Object.entries(linksComponents)) {
            if (value.is(link)) {
                setLinkType(key);
            }
        }
    }, [link]);

    function handleAddLink(values: { title: string; linkType: string; link: string; folder: string }) {
        const folderName = selectedFolder === "new" ? newFolderName : selectedFolder;
        const newLink = { title: values.title, linkType: linkType, link: link, folder: folderName! };
        if (linkData) {
            editLink(folderName, linkData.folder, newLink);
            showToast({ title: "Lien mis à jour !", message: "Lien mis à jour dans le dossier" });
        } else {
            addLink(newLink);
            showToast({ title: "Lien sauvegardé !", message: "Lien ajouté au dossier" });
        }

        popToRoot({ clearSearchBar: true });
    }

    if (folders.length === 0 && linkData) {
        return (
            <Form>
                <Form.Description text="Loading folders..." />
            </Form>
        )
    }

    return (
        <Form
            actions={
                <ActionPanel>
                    <Action.SubmitForm onSubmit={handleAddLink} />
                </ActionPanel>
            }
        >
            <Form.Description text="Ajouter un lien dans un dossier." />
            <Form.TextField id="title" title="Nom" placeholder="Nom" defaultValue={linkData?.title} />
            <Form.TextField
                id="url"
                title="Lien Url"
                placeholder="Entrez le lien"
                defaultValue={linkData ? linkData.link : ""}
                onChange={(newValue) => setLink(newValue)}
            />

            <Form.Dropdown
                id="folder"
                title="Dossier"
                value={selectedFolder ?? ""}
                onChange={(newValue) => setSelectedFolder(newValue)}
            >
                <Form.Dropdown.Item value="new" title="Créer un nouveau dossier" />
                {folders.map((folder) => (
                    <Form.Dropdown.Item key={folder.name} value={folder.name} title={folder.name} />
                ))}
            </Form.Dropdown>

            {(selectedFolder === "new") && (
                <Form.TextField
                    id="newFolderName"
                    title="Nom du nouveau dossier"
                    placeholder="Entrez le nom du nouveau dossier"
                    defaultValue=""
                    onChange={(newValue) => setNewFolderName(newValue)}
                />
            )}
        </Form>
    );
}

export default function AddLinkCommand(props: { link: Link | null }) {
    return (
        <FolderProvider>
            <AddLinkForm linkData={props.link} />
        </FolderProvider>
    );
}
