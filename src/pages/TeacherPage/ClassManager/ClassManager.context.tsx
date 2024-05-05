import React, { useContext, useState } from 'react';

interface ClassManagerState {
  lessonIdSelected: number | null;
  setLessonIdSelected: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ClassManagerContext = React.createContext<ClassManagerState>({
  lessonIdSelected: null,
  setLessonIdSelected: () => {},
});

const ClassManagerProvider = ({ children }: any) => {
  const [lessonIdSelected, setLessonIdSelected] = useState<number | null>(null);

  const values = {
    lessonIdSelected,
    setLessonIdSelected,
  };

  return (
    <ClassManagerContext.Provider value={values}>
      {children}
    </ClassManagerContext.Provider>
  );
};

export default ClassManagerProvider;

export const useClassManager = (): ClassManagerState => {
  return useContext(ClassManagerContext);
};
