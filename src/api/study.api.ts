import http from './http';

export const getStudyPrograms = () =>
  http.get<IStudyProgram[]>(`/study-program`);
export const getStudyProgram = (id: number) =>
  http.get<IStudyProgram>(`/study-program/${id}`);
export const getStudyProgramByBlockId = (id: number) =>
  http.get<IStudyProgram[]>(`/study-program/get-studyProgram-by-blockId/${id}`);
export const createStudyProgram = (data: { name: string; blockId: number }) =>
  http.post<IStudyProgram>(`/study-program`, data);
