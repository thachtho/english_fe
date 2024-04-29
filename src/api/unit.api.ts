import http from './http';

export const getAllUnitLessonByStudyProgramId = (studyProgramId: number) =>
  http.get<IUnit[]>(`/unit/unit-by-studyProgramId/${studyProgramId}`);
export const getUnits = () => http.get<IUnit[]>(`/unit`);
export const createUnit = (data: Pick<IUnit, 'name' | 'studyProgramId'>) =>
  http.post<IUnit>(`/unit`, data);
export const updateUnit = (id: number, data: Pick<IUnit, 'name'>) =>
  http.put(`/unit/${id}`, data);
export const deleteUnit = (id: number) => http.delete(`/unit/${id}`);
