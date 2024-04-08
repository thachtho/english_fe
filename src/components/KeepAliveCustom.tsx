import { ReactNode } from 'react';
import KeepAlive from 'react-activation'

interface IProps {
    children?: ReactNode;
}

function KeepAliveCustom({ children }: IProps) {
  return (
        <KeepAlive cacheKey={window.location.href}>
            {children}
        </KeepAlive>
  )
}

export default KeepAliveCustom
