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
      const { data } = await getClassManagerLesson(
        Number(classManagerLessonId),
      );

      setClassManagerLesson(data);
    };
    classManagerLessonId && fetch();
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
  const {
    setVariable,
    setExerciseVariable,
    isReload,
    classManagerLesson,
    setNumberRepeat,
  } = useExercise();
  useEffect(() => {
    const fetch = async () => {
      const { data } = await getExerciseByClassManagerLessonId(
        Number(classManagerLessonId),
      );
      const { exerciseVariables } = data;

      if (exerciseVariables && classManagerLesson) {
        const count = exerciseVariables.reduce(
          (accumulator, currentValue) => accumulator + currentValue.count,
          0,
        );
        const numberRepeat =
          classManagerLesson.numberRepeat * exerciseVariables.length;
        const itemRandom = getItemRandom(exerciseVariables);
        setNumberRepeat(`${count}/${numberRepeat}`);

        if (itemRandom) {
          setExerciseVariable(itemRandom);
          setVariable(itemRandom?.variable);
        }
      }
    };

    classManagerLessonId && fetch();
  }, [isReload, classManagerLesson]);
};

export { useFetDataClassManagerLesson, useCreateExercise, useGetExercise };
