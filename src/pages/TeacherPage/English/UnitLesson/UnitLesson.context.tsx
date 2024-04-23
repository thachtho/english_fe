import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getAllUnitLesson } from '../../../../api/unit.api';

interface UnitLessonState {
  unitLessons: IUnit[];
}

export const UnitLessonContext = React.createContext<UnitLessonState>({
  unitLessons: [],
});

const UnitLessonProvider = ({ children }: any) => {
  const [unitLessons, setUnitLessons] = useState<IUnit[]>([]);

  const getDataUnitLesson = async () => {
    try {
      const { data } = await getAllUnitLesson();
      console.log(1111111, data);

      setUnitLessons(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    (async () => {
      await getDataUnitLesson();
    })();
  }, []);

  const values = {
    unitLessons,
  };

  return (
    <UnitLessonContext.Provider value={values}>
      {children}
    </UnitLessonContext.Provider>
  );
};

export default UnitLessonProvider;

export const useUnitLesson = (): UnitLessonState => {
  return useContext(UnitLessonContext);
};
