// list-folders.tsx
import { List, ActionPanel, Action, useNavigation, confirmAlert, showToast, ToastStyle, popToRoot } from "@raycast/api";
import { FolderProvider, useFolders } from "./context";

// Assurez-vous que le `FolderProvider` enveloppe correctement `ProjectList`
function ProjectList() {
  const { folders, deleteFolder } = useFolders();
  const { push } = useNavigation();

  async function handleDelete(folderName: string) {
    const options = {
      title: "Supprimer le dossier",
      message: `Êtes-vous sûr de vouloir supprimer le dossier ${folderName} ?`,
      primaryAction: {
        title: "Supprimer",
        style: ToastStyle.Destruction,
      },
    };

    const result = await confirmAlert(options);
    if (result) {
      deleteFolder(folderName);
      showToast({ title: "Dossier supprimé", style: ToastStyle.Success });
      popToRoot();
    }
  }

  function handleProjectSelect(folderName: string) {
    const selectedFolder = folders.find((folder) => folder.name === folderName);
    if (selectedFolder) {
      push(
        <FolderProvider>
          <LinkList folder={selectedFolder} />
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

function LinkList({ folder }: { folder: { name: string; links: { title: string; url: string; folder: string }[] } }) {
  const { deleteLink } = useFolders();

  async function handleDelete(folderName: string, linkUrl: string) {
    const options = {
      title: "Supprimer le lien",
      message: `Êtes-vous sûr de vouloir supprimer ce lien ?`,
      primaryAction: {
        title: "Supprimer",
        style: ToastStyle.Destruction,
      },
    };

    const result = await confirmAlert(options);
    if (result) {
      deleteLink(folderName, linkUrl);
      showToast({ title: "Lien supprimé", style: ToastStyle.Success });
      popToRoot(); // Retourner à l'écran précédent après la suppression
    }
  }

  return (
    <List navigationTitle={`Liens dans le projet ${folder.name}`}>
      {folder.links.map((link) => (
        <List.Item
          key={link.url}
          title={link.title}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={link.url} />
              <Action
                title="Supprimer le lien"
                style={Action.Style.Destructive}
                onAction={() => handleDelete(folder.name, link.url)}
              />
            </ActionPanel>
          }
        />
      ))}
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
