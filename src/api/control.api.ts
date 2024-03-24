import http from './http';

export const getTitleByPath = (path: string) => http.get<IControl>(`/control/path?path=${path}`);