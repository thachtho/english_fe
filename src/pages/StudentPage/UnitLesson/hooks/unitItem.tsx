import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { checkPermisson } from '../../../../api/class-manager-lesson.api';

const useHandle = () => {
  const navigation = useNavigate();

  const navigationVariablePage = async (classManagerLessonId: number) => {
    try {
      const { data } = await checkPermisson(Number(classManagerLessonId));
      if (!data) return toast.error('Bạn không có quyền');

      navigation(
        `/studentPage/variable?classManagerLessonId=${classManagerLessonId}`,
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return {
    navigationVariablePage,
  };
};

export { useHandle };
