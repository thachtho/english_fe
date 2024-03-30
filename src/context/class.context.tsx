import React, { useContext } from 'react';
import useTeacher from '../pages/Users/Teacher/hooks/useTeacher';

interface ClassState {
    teachers: IUser[]
}

export const ClassContext = React.createContext<ClassState>({
    teachers: []
});

const ClassProvider = ({ children }: any) => {
    const { teachers } = useTeacher()

    const values = {
        teachers
    };

    return <ClassContext.Provider value={values}>{children}</ClassContext.Provider>;
};

export default ClassProvider;

export const useClass = (): ClassState => {
    return useContext(ClassContext);
};