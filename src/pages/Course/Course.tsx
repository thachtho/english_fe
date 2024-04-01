import { useEffect, useState } from 'react';
import HeaderAddElementComponent from '../../components/HeaderAddElementComponent';
import Panigation from '../../components/React-table/Panigation';
import TableList from '../../components/React-table/Table';
import UseReactTable from '../../hooks/useReactTable';
import useTitle from '../../hooks/useTitle';
import BaseLayoutContent from '../../layout/BaseLayoutContent';
import ModalAddCourse from './ModalAddCourse';
import useColumnCourse from './useColumnCourse';
import { deleteCourse, getCourses } from '../../api/course.api';
import toast from 'react-hot-toast';
import ModalEditCourse from './ModalEditCourse';
import ModalConfirm from '../../components/Modal/Confirm';

function Course() {
    useTitle();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] = useState(false);

    const [courses, setCourses] = useState<ICourse[]>([])
    const [idSelected, setIdSelected] = useState<null | number>(null)
    const { columns, idDelete } = useColumnCourse({
        setIdSelected,
        setIsModalEditOpen,
        setIsModalConfirmDeleteOpen
    })


    const handleAdd = () => {
        setIsModalOpen(true)
    }

    const handleDelete = async () => {
        try {
            await deleteCourse(Number(idDelete));
          } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    const { table } = UseReactTable({
        columns,
        data: courses
    })

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
    
    return (
        <div className='course'>
            <HeaderAddElementComponent 
                handleAdd={handleAdd}
                isButtonImportExcell={false}
            />   
            {courses.length > 0 &&
                <BaseLayoutContent>
                    <div className='student'>
                        <TableList table={table}/>
                        <div className="h-2" />
                        <Panigation table={table} />                
                    </div>
                </BaseLayoutContent>
            }

            {isModalOpen &&
                <ModalAddCourse
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            } 

            {isModalEditOpen && idSelected &&
                <ModalEditCourse
                    isModalOpen={isModalEditOpen}
                    setIsModalOpen={setIsModalEditOpen}
                    id={idSelected}
                />
            } 


            {isModalConfirmDeleteOpen &&
                <ModalConfirm 
                    isOpen={isModalConfirmDeleteOpen} 
                    setIsOpen={setIsModalConfirmDeleteOpen} 
                    handle={handleDelete}
                    message={'Xác nhận xóa?'}
                />
            }
        </div>
    )
}

export default Course
