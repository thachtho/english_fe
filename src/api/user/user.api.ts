import http from '../http';

export const getUsers = () => http.get<any>(`/users`);
export const creatUser = (data: any) => http.post<any>(`/users`, data);
export const getTeachers = () => http.get<any>(`/users/teacher`);

