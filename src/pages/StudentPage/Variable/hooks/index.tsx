import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import {
  checkPermisson,
  getClassManagerLesson,
} from '../../../../api/class-manager-lesson.api';
import useNavigatePermissonDenied from '../../../../hooks/useNavigatePermissonDenied';
import useVariable from '../state';
import { getVariableByLessonId } from '../../../../api/lesson.api';

const useCheckPermisson = (classManagerLessonId: string | null) => {
  const { navigationPermissonDenied } = useNavigatePermissonDenied();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await checkPermisson(Number(classManagerLessonId));

        if (!data) {
          navigationPermissonDenied();
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    };

    classManagerLessonId && fetch();
  }, []);
};

const useFetchDataByManagerLessonId = (classManagerLessonId: string | null) => {
  const { setClassManagerLesson, setVariables } = useVariable();

  useEffect(() => {
    const fetch = async () => {
      setTimeout(async () => {
        const { data } = await getClassManagerLesson(
          Number(classManagerLessonId),
        );
        const { data: lesson } = await getVariableByLessonId(data?.lessonId);
        setClassManagerLesson(data);
        setVariables(lesson.variables);
      }, 500);
    };
    classManagerLessonId && classManagerLessonId && fetch();
  }, []);
};

const useGetBreadCrumbs = () => {
  const classOption = null;
  const breadCrumbs = useMemo(() => {
    return [
      {
        url: '/',
        name: `Home`,
      },
    ];
  }, [classOption]);

  return breadCrumbs;
};

export { useCheckPermisson, useFetchDataByManagerLessonId, useGetBreadCrumbs };
