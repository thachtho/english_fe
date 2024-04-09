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
    name: string,
    controlChildrens: IControl[],
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
    teacherId: number,
    courseId: number,
    classToStudents: IClassToStudent[],
    teacher: IUser
}

interface IClassToStudent extends IBase{
    classId: number,
    userId: number
    user: IUser,
    class: IClass
}

interface ICourse extends IBase{
    from: number,
    to: number
}
