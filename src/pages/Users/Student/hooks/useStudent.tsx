import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { getUsersByKey } from "../../../../api/user/user.api";

function useStudent() {
    const [students, setStudents] = React.useState<IUser[]>([])

    const getDataStudent = async () => {
        try {
          const { data } = await getUsersByKey('students')
          setStudents(data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getDataStudent();
    }, [])

    return {
        students,
        getDataStudent
    }
}

export default useStudent
