import { ILink } from './link'

export interface IComment {
    id: number
    postId: string
    userId: number
    uid?: string
    name?: string
    message?: string
    timeCreated?: Date
    phoneNumber?: string
    cmtId: string
    linkId: number
    hideCmt: boolean
    link: ILink
}