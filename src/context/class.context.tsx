import React, { useContext } from 'react';
import useFetchCourse from '../pages/AdminAgencyPage/Course/hooks/useFetchCourse';
import useTeacher from '../pages/AdminAgencyPage/Users/Teacher/hooks/useTeacher';

interface ClassState {
  teachers: IUser[];
  courses: ICourse[];
  dataTeachersDropdown: IPropsDropdown[];
}

export const ClassContext = React.createContext<ClassState>({
  teachers: [],
  courses: [],
  dataTeachersDropdown: [],
});

const ClassProvider = ({ children }: any) => {
  const { teachers, dataTeachersDropdown } = useTeacher();
  const { courses } = useFetchCourse();

  const values = {
    teachers,
    courses,
    dataTeachersDropdown,
  };

  return (
    <ClassContext.Provider value={values}>{children}</ClassContext.Provider>
  );
};

export default ClassProvider;

export const useClass = (): ClassState => {
  return useContext(ClassContext);
};
