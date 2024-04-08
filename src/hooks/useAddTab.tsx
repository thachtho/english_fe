import { useEffect } from 'react'
import { useTabs } from '../context/tabs.context'
import { getTitleByPath } from '../api/control.api'
import toast from 'react-hot-toast'
import { matchRoutes, useLocation}  from 'react-router-dom'
import routes from '../routes'

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
            const search = location.search
            const { data } = await getTitleByPath(path)

            return {
                label: data.name,
                key: location.pathname,
                search,
                match
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }
}

export default useAddTab