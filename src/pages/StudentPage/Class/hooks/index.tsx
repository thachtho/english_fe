import { useEffect } from 'react';
import { getAllClassWithStudentId } from '../../../../api/class.api';
import toast from 'react-hot-toast';
import useClass from '../state';

const useFetchDataClass = () => {
  const { setClassList } = useClass();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllClassWithStudentId();
        setClassList(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    })();
  }, []);
};

export { useFetchDataClass };
