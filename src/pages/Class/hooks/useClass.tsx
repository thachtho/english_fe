import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { getClass } from "../../../api/class.api";

function useClass() {
    const [classs, setClass] = React.useState<IUser[]>([])

    const getDataClass = async () => {
        try {
          const { data } = await getClass()
          setClass(data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getDataClass();
    }, [])

    return {
        classs,
        getDataClass
    }
}

export default useClass
