import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getAllClassByTeacher } from '../../../api/course.api';
import {
  IResponseClassList,
  renderDataClassListWithTeacher,
} from '../../../untils';

interface ClassListState {
  classList: IResponseClassList[];
}

export const ClassListContext = React.createContext<ClassListState>({
  classList: [],
});

const ClassListProvider = ({ children }: any) => {
  const [classList, setClassList] = useState<IResponseClassList[]>([]);

  const getDataClassList = async () => {
    try {
      const { data } = await getAllClassByTeacher();
      const dataClassList = renderDataClassListWithTeacher(data);
      setClassList(dataClassList);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    (async () => {
      await getDataClassList();
    })();
  }, []);

  const values = {
    classList,
  };

  return (
    <ClassListContext.Provider value={values}>
      {children}
    </ClassListContext.Provider>
  );
};

export default ClassListProvider;

export const useClassList = (): ClassListState => {
  return useContext(ClassListContext);
};
