import http from './http';

export const updateExerciseVariable = (
  id: number,
  data: Pick<IExerciseVariable, 'id' | 'count'>,
) => http.put(`/exercise-variable/${id}`, data);
