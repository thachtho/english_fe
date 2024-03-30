interface ILogin {
    nickname: string,
    password: string
}

interface IBaseSize {
    width?: number,
    height?: number
}

interface IBase {
    id: number,
    deletedAt: Date,
    createdAt: Date,
    updatedAt: Date,
    createdBy: number
}

interface IControl extends IBase{
    path: string,
    name: string
}

interface IUser extends IBase{
    fullname: string | null;
    nickname: string;
    password?: string;
    role: number;
    agencyId: number;
}

interface IClass extends IBase{
    name: string,
    teacherId: number
}
