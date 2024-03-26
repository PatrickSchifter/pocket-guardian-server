export interface GroupCreate {
    name:    string;
    adminId: string;
}

export interface Group extends GroupCreate {
    id: string;
}