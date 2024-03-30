import http from '../http';

type USER_KEY = 'students' | 'teachers'

export const getUsers = () => http.get<any>(`/users`);
export const creatUser = (data: any) => http.post<IUser>(`/users`, data);
export const getUsersByKey = (key: USER_KEY) => http.get<IUser[]>(`/users/${key}`);

