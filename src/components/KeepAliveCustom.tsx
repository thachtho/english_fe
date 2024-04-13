import { ReactNode } from 'react';
import KeepAlive from 'react-activation';
import { useLocation } from 'react-router-dom';
import useAddTab from '../hooks/useAddTab';
import { getKeyTab } from '../untils';

interface IProps {
    children?: ReactNode;
}

function KeepAliveCustom({ children }: IProps) {
  const location = useLocation();
  useAddTab()
  const key = getKeyTab(location as any);

  return (
        <KeepAlive cacheKey={key} name={key}>
            {children}
        </KeepAlive>
  )
}

export default KeepAliveCustom
