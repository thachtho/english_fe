import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getVariableByLessonId } from '../api/lesson.api';

function useFetchVariable(lessonId: any) {
  const [variables, setVariables] = useState<IVariable[]>([]);
  const [isReload, setIsReload] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (lessonId) {
        try {
          const { data } = await getVariableByLessonId(Number(lessonId));
          setVariables(data.variables);
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        }
      }
    })();
  }, [isReload, lessonId]);

  return {
    variables,
    setVariables,
    setIsReload,
    isReload,
  };
}

export default useFetchVariable;
