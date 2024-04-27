import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { getVariableByLessonId } from '../../../../api/lesson.api';

interface VariableState {
  lessonId: String | undefined;
  variables: IVariable[];
}

export const VariableContext = React.createContext<VariableState>({
  lessonId: undefined,
  variables: [],
});

const VariableProvider = ({ children }: any) => {
  const { id: lessonId } = useParams();
  const [variables, setVariables] = useState<IVariable[]>([]);

  const values = {
    lessonId,
    variables,
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getVariableByLessonId(Number(lessonId));
        setVariables(data.variables);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    })();
  }, []);

  return (
    <VariableContext.Provider value={values}>
      {children}
    </VariableContext.Provider>
  );
};

export default VariableProvider;

export const useVariable = (): VariableState => {
  return useContext(VariableContext);
};
