import React, { useContext } from 'react';
import useTeacher from '../pages/Users/Teacher/hooks/useTeacher';
import useFetchCourse from '../pages/Course/hooks/useFetchCourse';

interface ClassState {
    teachers: IUser[],
    courses: ICourse[]
}

export const ClassContext = React.createContext<ClassState>({
    teachers: [],
    courses: []
});

const ClassProvider = ({ children }: any) => {
    const { teachers } = useTeacher()
    const { courses } = useFetchCourse({});

    const values = {
        teachers,
        courses
    };

    return <ClassContext.Provider value={values}>{children}</ClassContext.Provider>;
};

export default ClassProvider;

export const useClass = (): ClassState => {
    return useContext(ClassContext);
};