import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { getUsersByKey } from "../../../../api/user/user.api";

function useTeacher() {
    const [teachers, setTeacher] = React.useState<IUser[]>([])
    const dataTeachersDropdown = teachers.map((teacher) => {
        return {
            value: teacher.id,
            label: teacher.fullname as string
        }
    })

    const getDataTeacher = async () => {
        try {
            const { data } = await getUsersByKey('teachers')
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
        getDataTeacher,
        dataTeachersDropdown
    }
}

export default useTeacher
