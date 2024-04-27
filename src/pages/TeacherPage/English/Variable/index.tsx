import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { getLesson } from '../../../../api/lesson.api';
import KeepAliveCustom from '../../../../components/KeepAliveCustom';
import { useTabs } from '../../../../context/tabs.context';
import { getKeyTab } from '../../../../untils';
import Variable from './Variable';
import VariableProvider from './Variable.context';

function index() {
  const { id: lessonId } = useParams();
  const { setTitleCurrentTab } = useTabs();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getLesson(Number(lessonId));
        const key = getKeyTab(location as any);
        setTitleCurrentTab(`[${data.name}]`, key);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    })();
  }, [lessonId]);

  return (
    <KeepAliveCustom>
      <VariableProvider>
        <Variable />
      </VariableProvider>
    </KeepAliveCustom>
  );
}

export default index;
