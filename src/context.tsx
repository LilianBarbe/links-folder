// context.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// Type pour un lien
export type Link = {
    title: string;
    linkType: string;
    link: string;
    folder: string;
};

// Type pour un dossier
type Folder = {
    name: string;
    links: Link[];
};

type FolderContextType = {
    folders: Folder[];
    addLink: (link: Link) => void;
    deleteFolder: (folderName: string) => void;
    deleteLink: (folderName: string, inputLink: string) => void;
};

// Chemin du fichier de stockage des dossiers et des liens
const FILE_PATH = resolve(__dirname, "storage.json");

// Créer le contexte
const FolderContext = createContext<FolderContextType | undefined>(undefined);

export function FolderProvider({ children }: { children: ReactNode }) {
    const [folders, setFolders] = useState<Folder[]>([]);

    function addLink(link: Link) {
        setFolders((prevFolders) => {
            let folderExists = false;

            const updatedFolders = prevFolders.map((folder) => {
                if (folder.name === link.folder) {
                    folderExists = true;
                    return { ...folder, links: [...folder.links, link] };
                }
                return folder;
            });

            if (!folderExists) {
                updatedFolders.push({ name: link.folder, links: [link] });
            }

            saveToFile(updatedFolders);
            return updatedFolders;
        });
    }

    function deleteFolder(folderName: string) {
        setFolders((prevFolders) => {
            const updatedFolders = prevFolders.filter((folder) => folder.name !== folderName);
            saveToFile(updatedFolders);
            return updatedFolders;
        });
    }

    function deleteLink(folderName: string, inputLink: string) {
        setFolders((prevFolders) => {
            const updatedFolders = prevFolders.map((folder) => {
                if (folder.name === folderName) {
                    const updatedLinks = folder.links.filter((link) => link.link !== inputLink);
                    return { ...folder, links: updatedLinks };
                }
                return folder;
            });
            saveToFile(updatedFolders);
            return updatedFolders;
        });
    }

    function saveToFile(folders: Folder[]) {
        try {
            writeFileSync(FILE_PATH, JSON.stringify(folders, null, 2));
        } catch (error) {
            console.error("Failed to save data", error);
        }
    }

    function loadFromFile() {
        try {
            const data = readFileSync(FILE_PATH, { encoding: "utf-8" });
            setFolders(JSON.parse(data));
        } catch (error) {
            console.error("Failed to load data", error);
        }
    }

    useEffect(() => {
        loadFromFile();
    }, []);

    return (
        <FolderContext.Provider value={{ folders, addLink, deleteFolder, deleteLink }}>{children}</FolderContext.Provider>
    );
}

export function useFolders() {
    const context = useContext(FolderContext);
    if (context === undefined) {
        throw new Error("useFolders must be used within a FolderProvider");
    }
    return context;
}
