import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { checkPermisson } from '../../../../api/class-manager-lesson.api';
import useNavigatePermissonDenied from '../../../../hooks/useNavigatePermissonDenied';

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

export { useCheckPermisson };
