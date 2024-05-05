import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { getVariableByLessonId } from '../../../../api/lesson.api';
import useFetchVariable from '../../../../hooks/useFetchVariable';

interface VariableState {
  lessonId: String | undefined;
  variables: IVariable[];
  isReload: boolean;
  setIsReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VariableContext = React.createContext<VariableState>({
  lessonId: undefined,
  variables: [],
  isReload: false,
  setIsReload: () => {},
});

const VariableProvider = ({ children }: any) => {
  const { id: lessonId } = useParams();
  const { isReload, setIsReload, variables } = useFetchVariable(lessonId);

  const values = {
    lessonId,
    variables,
    isReload,
    setIsReload,
  };

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
