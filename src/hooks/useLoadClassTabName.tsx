import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { getClass } from '../api/class.api';
import { getKeyTab } from '../untils';
import { useTabs } from '../common/context/tabs.context';

function useLoadClassTabName() {
  const { setTitleCurrentTab } = useTabs();
  const { id: classId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getClass(Number(classId));
        const key = getKeyTab(location as any);
        setTitleCurrentTab(`[${data.name}]`, key);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    })();
  }, [classId]);
}

export default useLoadClassTabName;
