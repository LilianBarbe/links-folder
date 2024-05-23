import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { Folder, Link } from "./types/Types";

type FolderContextType = {
    folders: Folder[];
    addLink: (link: Link) => void;
    deleteFolder: (folderName: string) => void;
    deleteLink: (folderName: string, inputLink: string) => void;
    editLink: (folderName: string | undefined, previousFolder: string, inputLink: Link) => void;
    getLinks: (folderName: string) => Link[] | undefined;
    linkExist: (link: string) => boolean;
};

// Path to the storage file
const FILE_PATH = resolve(__dirname, "storage.json");

// Create the context
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
            }).filter(folder => folder.links.length > 0); // remove empty folders
            saveToFile(updatedFolders);
            return updatedFolders;
        });
    }

    function getLinks(folderName: string): Link[] | undefined {
        const folder = folders.find((folder) => folder.name === folderName);
        return folder ? folder.links : undefined;
    }

    function linkExist(link: string): boolean {
        let res = false;
        folders.forEach((folder) => {
            if (folder.links.some((f) => f.link === link)) {
                res = true;
            }
        });
        return res;
    }

    function editLink(folderName: string | undefined, previousFolder: string, updatedLink: Link) {
        setFolders((prevFolders) => {
            const updatedFolders = prevFolders.map((folder) => {
                if (folder.name === folderName && folder.name === previousFolder) {
                    const updatedLinks = folder.links.map((link) =>
                        link.link === updatedLink.link ? updatedLink : link
                    );
                    return { ...folder, links: updatedLinks };
                } else if (folderName && folder.name === folderName) {
                    return { ...folder, links: [...folder.links, updatedLink] };
                }
                return folder;
            });

            if (!updatedFolders.some((f) => f.name === folderName)) {
                updatedFolders.push({ name: updatedLink.folder, links: [updatedLink] });
            }

            if (folderName !== previousFolder) {
                updatedFolders.forEach((folder) => {
                    const linkToDelete = folder.links.findIndex((link) => link.folder === previousFolder && link.link === updatedLink.link);
                    if (linkToDelete !== -1) {
                        folder.links.splice(linkToDelete, 1);
                    }
                });
            }

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
        <FolderContext.Provider value={{ folders, addLink, editLink, deleteFolder, deleteLink, getLinks, linkExist }}>
            {children}
        </FolderContext.Provider>
    );
}

export function useFolders() {
    const context = useContext(FolderContext);
    if (context === undefined) {
        throw new Error("useFolders must be used within a FolderProvider");
    }
    return context;
}
