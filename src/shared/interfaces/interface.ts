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
    classToUsers: IClassToUser[]
}

interface IClassToUser extends IBase{
    classId: number,
    userId: number
    user: IUser,
    class: IClass
}

interface ICourse extends IBase{
    from: number,
    to: number
}
