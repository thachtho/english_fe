import { createClass } from '../../api/class.api'
import ModalClass from './Modal'

interface IPropsAddClass {
    setIsModalOpen: (isShow: boolean) => void,
    isModalOpen: boolean,
    getDataClass: () => void,
}

function AddClass({
    setIsModalOpen,
    isModalOpen,
    getDataClass,
}: IPropsAddClass) {
    const handleAdd = (values: { name: string, teacherId: number }) => {
        return createClass(values)
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
