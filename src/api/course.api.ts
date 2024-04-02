import http from './http';

export const createCourse = (data: Pick<ICourse, 'from' | 'to'>) => http.post<ICourse>(`/course`, data);
export const getCourses = () => http.get<ICourse[]>(`/course`);
export const getCourse = (id: number) => http.get<ICourse>(`/course/${id}`);
export const updateCourse = (id: number, data: Pick<ICourse, 'from' | 'to' | 'id'>) => http.patch<ICourse>(`/course/${id}`, data);
export const deleteCourse = (id: number) => http.delete(`/course/${id}`);
export const getDefaultCourse = () => http.get(`/course/default`);

