import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { matchRoutes, useLocation } from 'react-router-dom'
import { getTitleByPath } from '../api/control.api'
import { useTabs } from '../context/tabs.context'
import routes from '../routes'
import { getKeyTab } from '../untils'

function useAddTab() {
    const { addTab } = useTabs();
    const location = useLocation();
    const match = (matchRoutes(routes, location)??[])[0]?.route.path;


    useEffect(() => {
        ( async () => {
            const data = await fetch()

            if (data) {
                addTab(data)
            }
        }) ()
    }, [])

    const fetch = async () => {
        try {
            const path = match?.slice(1)
            const { data } = await getTitleByPath(!path ? '/' : path)
            
            const key = getKeyTab(location as any)

            return {
                label: data.name,
                key: key,
                match
            }
        } catch (error: any) {
            
            toast.error(error?.response?.data?.message)
        }
    }
}

export default useAddTab