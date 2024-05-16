// list-folders.tsx
import {
  List,
  ActionPanel,
  Action,
  Alert,
  useNavigation,
  confirmAlert,
  showToast,
  Toast,
  Icon,
  popToRoot,
} from "@raycast/api";
import { FolderProvider, useFolders } from "./context";
import { links } from "./links/LinkRegistar";

// Assurez-vous que le `FolderProvider` enveloppe correctement `ProjectList`
function ProjectList() {
  const { folders, deleteFolder } = useFolders();
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
          icon={Icon.Folder}
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

function LinkList({
  folder,
}: {
  folder: { name: string; links: { title: string; linkType: string; link: string; folder: string }[] };
}) {
  const { deleteLink } = useFolders();

  async function handleDelete(folderName: string, linkUrl: string) {
    const options = {
      title: "Supprimer le lien",
      message: `Êtes-vous sûr de vouloir supprimer ce lien ?`,
      primaryAction: {
        onAction: () => {},
        title: "Supprimer",
      },
      style: Action.Style.Destructive, // Utiliser Action.Style.Destructive ici aussi
    };

    const result = await confirmAlert(options);
    if (result) {
      deleteLink(folderName, linkUrl);
      showToast({ title: "Lien supprimé", style: Toast.Style.Success });
      popToRoot(); // Retourner à l'écran précédent après la suppression
    }
  }

  return (
    <List navigationTitle={`Liens dans le projet ${folder.name}`}>
      {folder.links.map((link) => links[link.linkType].setLink(link).render())}
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
