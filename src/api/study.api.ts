import http from './http';

export const getStudyPrograms = () =>
  http.get<IStudyProgram[]>(`/study-program`);
export const createStudyProgram = (data: { name: string; blockId: number }) =>
  http.post<IStudyProgram>(`/study-program`, data);
