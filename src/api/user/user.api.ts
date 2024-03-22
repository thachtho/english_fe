import http from '../http';

export const getUsers = () => http.get<any>(`/users`);
