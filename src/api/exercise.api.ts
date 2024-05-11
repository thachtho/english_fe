import http from './http';

export const createExercise = (data: { classManagerLessonId: number }) =>
  http.post<IExercise>(`/exercise`, data);
export const getExerciseByClassManagerLessonId = (
  classManagerLessonId: number,
) =>
  http.get<IExercise>(
    `/exercise/get-exercise-by-classManagerLessonId/${classManagerLessonId}`,
  );
