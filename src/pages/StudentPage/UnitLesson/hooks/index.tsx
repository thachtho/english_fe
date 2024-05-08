import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { getUnitLessonInClass } from '../../../../api/class-manager.api';
import { getClass } from '../../../../api/class.api';
import useUnitLesson from '../state';

const useFetchDataUnitLessonInClass = (classId: string | undefined) => {
  const { setClassOption, setUnitLesson } = useUnitLesson();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getClass(Number(classId));
        const { data: unitLesson } = await getUnitLessonInClass(
          Number(classId),
        );
        setClassOption(data);
        setUnitLesson(unitLesson);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    };

    classId && fetch();
  }, [classId]);
};

const useGetBreadCrumbs = () => {
  const { classOption } = useUnitLesson();

  const breadCrumbs = useMemo(() => {
    if (!classOption) {
      return [];
    }
    return [
      {
        url: '/studentPage/class',
        name: 'Trang chủ',
      },
      {
        name: `Lớp ${classOption?.name}`,
        isPrimary: true,
      },
    ];
  }, [classOption]);

  return breadCrumbs;
};

export { useFetchDataUnitLessonInClass, useGetBreadCrumbs };
