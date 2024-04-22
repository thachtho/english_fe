import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { matchRoutes, useLocation } from 'react-router-dom';
import { getTitleByPath } from '../api/control.api';
import { useTabs } from '../context/tabs.context';
import routes from '../routes';
import { getKeyTab } from '../untils';

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
      const { data } = await getTitleByPath(path.length === 0 ? '/' : path);
      const key = getKeyTab(location as any);

      return {
        label: data.name,
        key: key,
        match,
      };
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
}

export default useAddTab;
