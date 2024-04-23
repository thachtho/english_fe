import http from './http';

export const getAllUnitLesson = () => http.get<IUnit[]>(`/unit/unit-lesson`);
export const getUnits = () => http.get<IUnit[]>(`/unit`);
