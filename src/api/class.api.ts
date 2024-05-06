import http from './http';

export const getClassListByCourseId = (courseId: number) =>
  http.get<any>(`/class?courseId=${courseId}`);
export const getClass = (classId: number) =>
  http.get<IClass>(`/class/${classId}`);
export const createClass = (
  data: Pick<IClass, 'name' | 'teacherId' | 'courseId' | 'blockId'>,
) => http.post<any>(`/class`, data);
export const editClass = (
  id: number,
  data: {
    id: number;
    name: string;
    teacherId: number;
    courseId: number;
    blockId: number;
  },
) => http.patch<IClass>(`/class/${id}`, data);
export const deleteClass = (id: number) => http.delete(`/class/${id}`);
export const studentsInClass = (id: number) =>
  http.get<IClass>(`/class/studentsInClass/${id}`);
export const addStudentToClass = (
  data: Pick<IClassToStudent, 'classId' | 'userId'>,
) => http.post<any>(`/class-user`, data);
export const removeStudentInClass = (
  data: Pick<IClassToStudent, 'classId' | 'userId'>,
) => http.post<any>(`/class-user/remove-student`, data);
export const getAllClassWithStudentId = () =>
  http.get<IClassStudent[]>(`/class-user/get-classList`);
