import http from "./http";


export const getClass = () => http.get<any>(`/class`);
export const creatClass = (data: { name: string }) => http.post<any>(`/class`, data);

