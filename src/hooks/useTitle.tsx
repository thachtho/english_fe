import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTitleByPath } from '../api/control.api';
import { useApp } from '../context/app.context';
import toast from 'react-hot-toast';

function useTitle() {
    const { setTitleGlobal } = useApp()
    const location = useLocation();

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        try {
            const path = location.pathname?.slice(1)
            const { data } = await getTitleByPath(path)
            setTitleGlobal(data?.name)
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }
}

export default useTitle
