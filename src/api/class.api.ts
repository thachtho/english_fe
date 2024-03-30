import http from "./http";


export const getClass = () => http.get<any>(`/class`);
export const createClass = (data: Pick<IClass, 'name' | 'teacherId'>) => http.post<any>(`/class`, data);
export const editClass = (id: number, data: { id: number, name: string, teacherId: number }) => http.patch<IClass>(`/class/${id}`, data);
export const deleteClass = (id: number) => http.delete(`/class/${id}`);
export const getClassDetail = (id: number) => http.get<IClass>(`/class/${id}`);

