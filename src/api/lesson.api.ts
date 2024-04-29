import http from './http';

export const getLesson = (id: number) => http.get<ILesson>(`/lesson/${id}`);
export const getLessons = () => http.get<ILesson[]>(`/lesson`);
export const getLessonsByUnitId = (id: number) =>
  http.get<ILesson[]>(`/lesson/lesson-by-unitId/${id}`);
export const getVariableByLessonId = (id: number) =>
  http.get<ILesson>(`/lesson/get-variables/${id}`);

export const createLesson = (data: Pick<ILesson, 'name' | 'unitId'>) =>
  http.post<ILesson>(`/lesson`, data);
export const updateLesson = (id: number, data: Pick<ILesson, 'name'>) =>
  http.put(`/lesson/${id}`, data);
export const deleteLesson = (id: number) => http.delete(`/lesson/${id}`);
