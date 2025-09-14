import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { matchRoutes, useLocation } from 'react-router-dom';
import routes from '../routes';
import { TITLE_PATH } from '../shared/constants';
import { getKeyTab } from '../untils';
import { useTabs } from '../common/context/tabs.context';

function useAddTab() {
  const { addTab } = useTabs();
  const location = useLocation();
  const match = (matchRoutes(routes, location) ?? [])[0]?.route.path;

  useEffect(() => {
    (async () => {
      const data = await fetch();

      if (data) {
        addTab(data);
      }
    })();
  }, []);

  const fetch = async () => {
    try {
      let path = match || '';
      if (path.charAt(0) === '/') {
        path = path.substring(1);
      }
      const res = TITLE_PATH.find(item => item.path === (path.length === 0 ? '/' : path))
      const key = getKeyTab(location as any);

      return {
        label: res?.title??"",
        key: key,
        match,
      };
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
}

export default useAddTab;
