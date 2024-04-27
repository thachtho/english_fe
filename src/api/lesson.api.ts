import http from './http';

export const getLesson = (id: number) => http.get<ILesson>(`/lesson/${id}`);
export const getLessons = () => http.get<ILesson[]>(`/lesson`);
export const getLessonsByUnitId = (id: number) =>
  http.get<ILesson[]>(`/lesson/lesson-by-unitId/${id}`);
export const getVariableByLessonId = (id: number) =>
  http.get<ILesson>(`/lesson/get-variables/${id}`);
