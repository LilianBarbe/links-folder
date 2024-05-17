import { Action, ActionPanel, Form, popToRoot, showToast } from "@raycast/api";
import { FolderProvider, useFolders } from "./context";
import { useEffect, useState } from "react";
import { links } from "./links-class/LinkRegistar";

function AddLinkForm() {
    const { folders, addLink } = useFolders();
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
    const [newFolderName, setNewFolderName] = useState("");
    const [link, setLink] = useState("");
    const [linkType, setLinkType] = useState("");

    // Mettre à jour le dossier sélectionné par défaut (le dernier ajouté)
    useEffect(() => {
        if (folders.length > 0) {
            setSelectedFolder(folders[folders.length - 1].name);
        }
    }, [folders]);

    useEffect(() => {
        for (const [key, value] of Object.entries(links)) {
            if (value.is(link)) {
                console.log("is ", key);
                setLinkType(key);
            }
        }
    }, [link]);

    function handleAddLink(values: { title: string; linkType:string; link: string; folder: string }) {
        const folderName = selectedFolder === "new" ? newFolderName : selectedFolder;
        const newLink = { title: values.title, linkType: linkType, link: link, folder: folderName! }; // Compiler sans erreur possible
        addLink(newLink);
        showToast({ title: "Lien sauvegardé !", message: "Lien ajouté au dossier" });

        // Retourné à l'état initial de Raycast après la soumission
        popToRoot({ clearSearchBar: true });
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
            <Form.TextField id="title" title="Nom" placeholder="Nom" defaultValue="" />
            <Form.TextField id="url" title="Lien Url" placeholder="Entrez le lien" defaultValue="" onChange={(newValue) => setLink(newValue) } />

            <Form.Dropdown
                id="folder"
                title="Dossier"
                value={selectedFolder ?? ""}
                onChange={(newValue) => setSelectedFolder(newValue)}
            >
                {folders.map((folder) => (
                    <Form.Dropdown.Item key={folder.name} value={folder.name} title={folder.name} />
                ))}
                <Form.Dropdown.Item value="new" title="Créer un nouveau dossier" />
            </Form.Dropdown>

            {selectedFolder === "new" && (
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

export default function AddLinkCommand() {
    return (
        <FolderProvider>
            <AddLinkForm />
        </FolderProvider>
    );
}
