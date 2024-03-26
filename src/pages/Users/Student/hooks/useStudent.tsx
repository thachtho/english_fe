import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { getUserByKey } from "../../../../api/user/user.api";

function useStudent() {
    const [teachers, setTeacher] = React.useState<any[]>([])

    const getDataTeacher = async () => {
        try {
          const { data } = await getUserByKey('student')
          setTeacher(data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getDataTeacher();
    }, [])

    return {
        teachers,
        getDataTeacher
    }
}

export default useStudent
