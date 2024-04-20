import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClass } from '../../../../api/class.api';
import KeepAliveCustom from '../../../../components/KeepAliveCustom';
import { useTabs } from '../../../../context/tabs.context';
import useFetchData from '../../../../hooks/useFetchData';
import { getKeyTab } from '../../../../untils';
import DetailClass from './DetailClass';

function index() {
  const { setTitleCurrentTab } = useTabs();
  const { id: classId } = useParams();
  const { fetch } = useFetchData({
    api: getClass,
    params: classId,
  });

  useEffect(() => {
    (async () => {
      const data = (await fetch()) as IClass;
      const key = getKeyTab(location as any);
      setTitleCurrentTab(data.name, key);
    })();
  }, [classId]);

  return (
    <KeepAliveCustom>
      <DetailClass />
    </KeepAliveCustom>
  );
}

export default index;
