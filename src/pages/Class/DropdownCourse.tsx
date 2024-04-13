import React, { useEffect, useState } from "react"
import { getCourse } from "../../api/course.api"
import toast from "react-hot-toast"
import Dropdown from "../../components/Dropdown"
import { useNavigate } from "react-router-dom"

interface IProps {
    courseId: number,
    courses: ICourse[],
    setCourseIdSelected: (value: number) => void
}

function DropdownCourse({
    courseId,
    courses,
    setCourseIdSelected
}: IProps) {
    const navigation = useNavigate();
    const [courseName, setCourseName] = useState<string>('')
    useEffect(() => {
        ( async () => {
            try {
                const { data } = await getCourse(courseId)
                const courseName = `${data.from}-${data.to}`
                setCourseName(courseName);
              } catch (error: any) {
                toast.error(error?.response?.data?.message)
            }
        }) ()
    }, [])

    const dataDropdown = courses.map((course) => {
        const { from, to } = course
        return {
            value: course.id,
            label: `${from}-${to}`
        }
    })

    const handleChangeCourse = (value: number) => {
        setCourseIdSelected(value)
        navigation(`/class`)
    }

    return (
        <div>
            {courseName && dataDropdown.length > 0 &&
                <div className="flex justify-center items-center cursor-pointer">
                    <span>Khóa:</span>
                    <Dropdown 
                        data={dataDropdown} 
                        defaultValue={courseId}
                        handleChange={handleChangeCourse}
                    />
                </div>
            }
        </div>
    )
}

export default React.memo(DropdownCourse)
