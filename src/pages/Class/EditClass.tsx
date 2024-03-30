import { useMemo } from 'react'
import ModalClass from './Modal'
import { editClass } from '../../api/class.api'

interface IPropsEditClass {
    setIsModalOpen: (isShow: boolean) => void,
    isModalOpen: boolean,
    getDataClass: () => void,
    idEditSelected: number | null,
    dataClass: IClass[],
    teachers: IUser[]
}

function EditClass({
    setIsModalOpen,
    isModalOpen,
    getDataClass,
    dataClass,
    idEditSelected
}: IPropsEditClass) {
    const handleEdit = async (values: { name: string, teacherId: number }) => {
        return editClass(Number(idEditSelected), { ...values, id: idEditSelected as number });
    }

    const data = useMemo(() => {
        const option = dataClass.find((item) => item.id === idEditSelected)

        return {
            className: option?.name,
            teacherId: option?.teacherId
        };
    }, [])
    
    return (
        <ModalClass
            setIsModalOpen={setIsModalOpen} 
            isModalOpen={isModalOpen}
            getDataClass={getDataClass}
            handle={handleEdit}
            options={data}
            isEdit={true}
        />
    )
}

export default EditClass
