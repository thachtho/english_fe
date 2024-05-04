import http from './http';

export const getClassManager = (id: number) =>
  http.get<IClassManager>(`/class-manager/${id}`);
export const createClassManager = (
  data: Pick<IClassManager, 'classId' | 'unitId'>,
) => http.post<IClassManager>(`/class-manager`, data);
export const getUnitLessonInClass = (classId: number) =>
  http.get<IClassManager[]>(`/class-manager/get-unit-lesson-class/${classId}`);
