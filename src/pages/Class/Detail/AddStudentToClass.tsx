import { Modal } from 'antd';
import Dropdown from '../../../components/Dropdown';
import useStudent from '../../Users/Student/hooks/useStudent';
import { useState } from 'react';
import { addStudentToClass } from '../../../api/class.api';
import toast from 'react-hot-toast';

interface IPropsType {
    setIsModalOpen: (isOpen: boolean) => void,
    isModalOpen: boolean,
    classId: number
}

function AddStudentToClass({
    isModalOpen,
    setIsModalOpen,
    classId
}: IPropsType) {
    const { students } = useStudent()
    const [userSelected, setUserSelected] = useState<null | number>(null)

    const handleOk = async () => {
        if (userSelected) {
            const data = {
                classId,
                userId: userSelected
            }

            try {
                await addStudentToClass(data)
                setIsModalOpen(false)
            } catch (error: any) {
                toast.error(error?.response?.data?.message)
            }
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const data = students.map((student) => {
        return {
            value: student.id,
            label: student.fullname
        }
    })

    const handleChange = (value: number) => {
        setUserSelected(value);
    }
  return (
    <>
        {students.length > 0 &&
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <Dropdown 
                            data={data} 
                            handleChange={handleChange} 
                        />
                </div>
            </Modal>
        }    
    </>

  )
}

export default AddStudentToClass
