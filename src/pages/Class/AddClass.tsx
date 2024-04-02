import { createClass } from '../../api/class.api'
import ModalClass from './Modal'

interface IPropsAddClass {
    setIsModalOpen: (isShow: boolean) => void,
    isModalOpen: boolean,
    getDataClass: () => void,
    courseId: number
}

function AddClass({
    setIsModalOpen,
    isModalOpen,
    getDataClass,
    courseId
}: IPropsAddClass) {
    const handleAdd = async (values: { name: string, teacherId: number }) => {
        return createClass({ ...values, courseId: Number(courseId) })
    }
    
    return (
        <ModalClass
            setIsModalOpen={setIsModalOpen} 
            isModalOpen={isModalOpen}
            getDataClass={getDataClass}
            handle={handleAdd}
        />
    )
}

export default AddClass
