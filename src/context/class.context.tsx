import React, { useContext } from 'react';
import useTeacher from '../pages/Users/Teacher/hooks/useTeacher';
import useFetchCourse from '../pages/Course/hooks/useFetchCourse';

interface ClassState {
    teachers: IUser[],
    courses: ICourse[],
    dataTeachersDropdown: IPropsDropdown[]
}

export const ClassContext = React.createContext<ClassState>({
    teachers: [],
    courses: [],
    dataTeachersDropdown: []
});

const ClassProvider = ({ children }: any) => {
    const { teachers, dataTeachersDropdown } = useTeacher()
    const { courses } = useFetchCourse({});

    const values = {
        teachers,
        courses,
        dataTeachersDropdown
    };

    return <ClassContext.Provider value={values}>{children}</ClassContext.Provider>;
};

export default ClassProvider;

export const useClass = (): ClassState => {
    return useContext(ClassContext);
};