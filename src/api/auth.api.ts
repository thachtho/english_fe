import http from './http';

export const login = (auth: { nickname: string; password: string }) => http.post(`/auth/login`, auth);