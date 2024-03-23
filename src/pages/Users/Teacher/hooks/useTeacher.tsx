import React, { useEffect } from "react"
import { getTeachers } from "../../../../api/user/user.api";
import toast from "react-hot-toast";

function useTeacher() {
    const [teachers, setTeacher] = React.useState<any[]>([])

    const getDataTeacher = async () => {
        try {
          const { data } = await getTeachers()
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

export default useTeacher
