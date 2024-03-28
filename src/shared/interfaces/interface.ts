interface ILogin {
    nickname: string,
    password: string
}

interface IBaseSize {
    width?: number,
    height?: number
}

interface IControl {
    id: number,
    path: string,
    name: string
}

interface IUser {
    id: number;
    fullname: string | null;
    nickname: string;
    password: string;
    role: number;
    agencyId: number;
    createdBy: number;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
