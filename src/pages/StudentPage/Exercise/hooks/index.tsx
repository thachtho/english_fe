import { useEffect } from 'react';
import { getClassManagerLesson } from '../../../../api/class-manager-lesson.api';
import useExercise from '../state';
import {
  createExercise,
  getExerciseByClassManagerLessonId,
} from '../../../../api/exercise.api';
import { getItemRandom } from '../utils';

const useFetDataClassManagerLesson = (classManagerLessonId: string | null) => {
  const { setClassManagerLesson } = useExercise();
  useEffect(() => {
    const fetch = async () => {
      setTimeout(async () => {
        const { data } = await getClassManagerLesson(
          Number(classManagerLessonId),
        );
        setClassManagerLesson(data);
      }, 500);
    };
    classManagerLessonId && classManagerLessonId && fetch();
  }, []);
};

const useCreateExercise = (classManagerLessonId: string | null) => {
  useEffect(() => {
    classManagerLessonId &&
      createExercise({
        classManagerLessonId: Number(classManagerLessonId),
      });
  }, []);
};

const useGetExercise = (classManagerLessonId: string | null) => {
  const { setVariable } = useExercise();
  useEffect(() => {
    const fetch = async () => {
      const { data } = await getExerciseByClassManagerLessonId(
        Number(classManagerLessonId),
      );
      const itemRandom = getItemRandom(data.exerciseVariables);
      if (itemRandom) {
        setVariable(itemRandom?.variable);
      }
    };

    classManagerLessonId && fetch();
  }, []);
};

export { useFetDataClassManagerLesson, useCreateExercise, useGetExercise };
