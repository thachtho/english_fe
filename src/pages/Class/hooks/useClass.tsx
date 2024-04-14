import React, { useEffect } from "react";
import toast from "react-hot-toast";

import { getClassListByCourseId } from "../../../api/class.api";
import { useApp } from "../../../context/app.context";
import { useClass as useClassContext } from "../../../context/class.context";

function useClass() {
    const { courseIdSelected: courseId, setCourseIdSelected } = useApp()
    const [classs, setClass] = React.useState<IClass[]>([])
    const { teachers, dataTeachersDropdown, courses } = useClassContext()

    const getDataClass = async () => {
        try {
          const { data } = await getClassListByCourseId(Number(courseId))
          setClass(data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
      getDataClass();
    }, [courseId])

    return {
        classs,
        getDataClass,
        teachers,
        courseId,
        dataTeachersDropdown,
        courses,
        setCourseIdSelected
    }
}

export default useClass
