import { IProxy } from "../shared/interfaces/proxy";
import http from "./http";

export const createProxies = (proxies: { proxies: string[] }) => http.post<IProxy[]>(`/proxies`, proxies);
export const getProxies = () => http.get<IProxy[]>(`/proxies`);
export const getProxy = () => http.get<IProxy[]>(`/proxies`);
export const deleteProxy = (id: number) => http.delete<null>(`/proxies/${id}`);