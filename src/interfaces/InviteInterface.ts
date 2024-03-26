export interface InviteCreate {
    userId: string | null;
    email:string;
    invited_by: string;
    groupId: string
}

export interface Invite extends InviteCreate {
    id: string;
}