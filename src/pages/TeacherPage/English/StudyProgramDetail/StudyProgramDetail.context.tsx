import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

interface StudyProgramDetailState {
  studyProgramId: String | undefined;
}

export const StudyProgramDetailContext =
  React.createContext<StudyProgramDetailState>({
    studyProgramId: undefined,
  });

const StudyProgramDetailProvider = ({ children }: any) => {
  const { id: studyProgramId } = useParams();

  const values = {
    studyProgramId,
  };

  return (
    <StudyProgramDetailContext.Provider value={values}>
      {children}
    </StudyProgramDetailContext.Provider>
  );
};

export default StudyProgramDetailProvider;

export const useStudyProgramDetail = (): StudyProgramDetailState => {
  return useContext(StudyProgramDetailContext);
};
