import http from '../http';

type USER_KEY = 'student' | 'teacher'

export const getUsers = () => http.get<any>(`/users`);
export const creatUser = (data: any) => http.post<any>(`/users`, data);
export const getUserByKey = (key: USER_KEY) => http.get<any>(`/users/${key}`);

