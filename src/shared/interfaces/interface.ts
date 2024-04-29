interface IPropsDropdown {
  label: string | number;
  value: string | number;
}

interface ILogin {
  nickname: string;
  password: string;
}

interface IBaseSize {
  width?: number;
  height?: number;
}

interface IBase {
  id: number;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
}

interface IControl extends IBase {
  path: string;
  name: string;
  controlChildrens: IControl[];
}

interface IUser extends IBase {
  fullname: string | null;
  nickname: string;
  password?: string;
  role: number;
  agencyId: number;
}

interface IClass extends IBase {
  name: string;
  teacherId: number;
  courseId: number;
  blockId: number;
  success: boolean;
  classToStudents: IClassToStudent[];
  teacher: IUser;
}

interface IClassToStudent extends IBase {
  classId: number;
  userId: number;
  user: IUser;
  class: IClass;
}

interface ICourse extends IBase {
  from: number;
  to: number;
  courseName: string;
  classList: IClass[];
}

interface IUnit extends IBase {
  name: string;
  studyProgramId: number;
  lessons: ILesson[];
}

interface ILesson extends IBase {
  name: string;
  unitId: number;
  variables: IVariable[];
}

interface IStudyProgram extends IBase {
  name: string;
  blockId: number;
}

interface IVariable extends IBase {
  name: string;
  vi: string;
  lessonId: number;
}
