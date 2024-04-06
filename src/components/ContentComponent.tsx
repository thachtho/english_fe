import { Empty } from 'antd';
import { ReactNode } from 'react';
import Loader from '../common/Loader';

const ContentComponent = ({ 
    loading,
    data,
    children,
    message
}: {
    loading: boolean,
    data: any[],
    children?: ReactNode;
    message: string
}) => {
    if (loading) {
        return <Loader />
    }

    if (data.length === 0) {
        return <Empty description={message}/>
    }

    return <>{children}</>
}

export default ContentComponent
