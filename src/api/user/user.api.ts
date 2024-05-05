import http from '../http';

type USER_KEY = 'students' | 'teachers';

export const getUsers = () => http.get<any>(`/users`);
export const creatUser = (data: any) => http.post<IUser>(`/users`, data);
export const getUsersByKey = (key: USER_KEY) =>
  http.get<IUser[]>(`/users/${key}`);
export const deleteUser = (id: number) => http.delete(`/users/${id}`);
export const updateUser = (
  id: number,
  data: { fullname: string; nickname: string },
) => http.put(`/users/${id}`, data);
export const getRole = () => http.get<number>(`/users/get-role`);
