export type Link = {
    title: string;
    linkType: string;
    link: string;
    folder: string;
};

// Type for a folder
export type Folder = {
    name: string;
    links: Link[];
};