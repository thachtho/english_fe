import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { getUsersByKey } from "../../../../api/user/user.api";

function useStudent() {
    const [teachers, setTeacher] = React.useState<IUser[]>([])

    const getDataStudent = async () => {
        try {
          const { data } = await getUsersByKey('student')
          setTeacher(data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getDataStudent();
    }, [])

    return {
        teachers,
        getDataStudent
    }
}

export default useStudent
