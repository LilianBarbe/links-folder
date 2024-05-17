import ILink from "./ILink";
import { Component, JSX } from "react";

type Link = {
    title: string;
    linkType: string;
    link: string;
    folder: string;
};

export abstract class ALink implements ILink{

    protected _link?: Link;

    constructor(link?: Link) {
        if (link)
            this._link = link;
    }
    get link(): Link | undefined {
        return this._link;
    }

    set link(value: Link) {
        this._link = value;
    }

    is = (link: string): boolean => {
        return false;
    };

    render(link: Link): JSX.Element|null {
        return null;
    }

}
