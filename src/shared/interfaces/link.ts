export interface ILink {
    id: number,
    linkUrl: string,
    linkName: string,
    content: string,
    type: LinkType
}

export enum ELink {
    LINK_OFF = 'linkOff',
    LINK_ON = 'linkOn',
    LINK_ON_HIDE = 'linkOnHide',
    LINK_OFF_HIDE = 'linkOffHide',
}

export enum LinkStatus {
    Pending = 'pending',
    Started = 'started',
}

export type LinkType = 'die' | 'undefined' | 'public' | 'private'