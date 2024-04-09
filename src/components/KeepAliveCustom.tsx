import { ReactNode } from 'react';
import KeepAlive from 'react-activation'
import { useLocation } from 'react-router-dom';

interface IProps {
    children?: ReactNode;
}

function KeepAliveCustom({ children }: IProps) {
  const location = useLocation();
  return (
        <KeepAlive id={location.pathname} name={location.pathname}>
            {children}
        </KeepAlive>
  )
}

export default KeepAliveCustom
