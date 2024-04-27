import http from './http';

export const getAllUnitLessonByStudyProgramId = (studyProgramId: number) =>
  http.get<IUnit[]>(`/unit/unit-by-studyProgramId/${studyProgramId}`);
export const getUnits = () => http.get<IUnit[]>(`/unit`);
