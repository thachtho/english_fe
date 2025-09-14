import http from './http';

interface ILoginResponse {
  token: {
    refreshToken: string
  };
}

export const login = (auth: { username: string; password: string }) =>
  http.post<ILoginResponse>(`/auth/login`, auth);
export const getRefreshToken = (refreshToken: string) =>
  http.post(`/auth/refresh-token`, { refreshToken });
