// list-folders.tsx
import { Action, ActionPanel, Alert, confirmAlert, List, showToast, Toast, useNavigation } from "@raycast/api";
import { FolderProvider, useFolders } from "./context";
import { links } from "./links-class/LinkRegistar";

// Assurez-vous que le `FolderProvider` enveloppe correctement `ProjectList`
function ProjectList() {
  const { folders, deleteFolder } = useFolders();
  const { setFolder } = useFolders();
  const { push } = useNavigation();

  async function handleDelete(folderName: string) {
    const options = {
      title: "Supprimer le dossier",
      message: `Êtes-vous sûr de vouloir supprimer le dossier ${folderName} ?`,
      primaryAction: {
        onAction: () => {
          console.log("Action - Folder removed");
        },
        title: "Supprimer",
      },
      style: Action.Style.Destructive, // Utiliser Action.Style.Destructive ici
    } as Alert.Options;

    const result = await confirmAlert(options);
    if (result) {
      deleteFolder(folderName);
      showToast({ title: "Dossier supprimé", style: Toast.Style.Success });
    }
  }

  function handleProjectSelect(folderName: string) {
    const selectedFolder = folders.find((folder) => folder.name === folderName);
    if (selectedFolder) {
      setFolder(selectedFolder);
      push(
        <FolderProvider>
          <LinkList />
        </FolderProvider>,
      );
    }
  }

  return (
    <List>
      {folders.map((folder) => (
        <List.Item
          key={folder.name}
          title={folder.name}
          actions={
            <ActionPanel>
              <Action title="Voir les liens" onAction={() => handleProjectSelect(folder.name)} />
              <Action
                title="Supprimer le dossier"
                style={Action.Style.Destructive}
                onAction={() => handleDelete(folder.name)}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

function LinkList() {
  const {folder} = useFolders();
  return (
    <List navigationTitle={`Liens dans le projet ${folder?.name}`}>
      {folder?.links.map((link) => links[link.linkType].render(link))}
    </List>
  );
}

export default function ListFoldersCommand() {
  return (
    <FolderProvider>
      <ProjectList />
    </FolderProvider>
  );
}
