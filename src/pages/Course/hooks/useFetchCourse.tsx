import React, { useEffect, useState } from 'react'
import { getCourses } from '../../../api/course.api';
import toast from 'react-hot-toast';

interface IProps {
    isModalOpen?: boolean,
    isModalEditOpen?: boolean, 
    isModalConfirmDeleteOpen?: boolean
}

function useFetchCourse({
    isModalConfirmDeleteOpen,
    isModalEditOpen,
    isModalOpen
}: IProps) {
    const [courses, setCourses] = useState<ICourse[]>([])

    useEffect(() => {
        ( async () => {
            try {
                const { data } = await getCourses();
                setCourses(data);
            } catch (error: any) {
                toast.error(error?.response?.data?.message)
            }
        })()
    }, [isModalOpen, isModalEditOpen, isModalConfirmDeleteOpen])

  return {
    courses
  }
}

export default useFetchCourse
