import http from './http';

export const createVariable = (
  data: Pick<IVariable, 'name' | 'vi' | 'lessonId'>,
) => http.post<IVariable>(`/variable`, data);
export const deleteVariable = (id: number) => http.delete(`/variable/${id}`);
export const updateVariable = (
  id: number,
  data: Pick<IVariable, 'name' | 'vi' | 'id'>,
) => http.put(`/variable/${id}`, data);
