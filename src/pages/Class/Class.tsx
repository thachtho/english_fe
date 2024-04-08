import { useState } from 'react'

import {
  FilterFn
} from '@tanstack/react-table'

import {
  RankingInfo
} from '@tanstack/match-sorter-utils'
import toast from 'react-hot-toast'
import { deleteClass } from '../../api/class.api'
import HeaderAddElementComponent from '../../components/HeaderAddElementComponent'
import ModalConfirm from '../../components/Modal/Confirm'
import Panigation from '../../components/React-table/Panigation'
import TableList from '../../components/React-table/Table'
import { useClass as useClassContext } from "../../context/class.context"
import useLoader from '../../hooks/useLoader'
import BaseLayoutContent from '../../layout/BaseLayoutContent'
import AddClass from './AddClass'
import DropdownCourse from './DropdownCourse'
import EditClass from './EditClass'
import useClass from './hooks/useClass'
import useAddTab from '../../hooks/useAddTab'

declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

function Class() {
  useAddTab()
  const { loading } = useLoader()
  const [idEditSelected, setIdEditSelected] = useState<number | null>(null)
  const { courses } = useClassContext()
  const handleEditTeacher = (id: number) => {
    setIsModalEditOpen(true);
    setIdEditSelected(id);
  }
  const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] = useState(false);
  const { 
    getDataClass, 
    table, 
    classs, 
    teachers, 
    idDelete,
    courseId
  } = useClass({ handleEditTeacher, setIsModalConfirmDeleteOpen });
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const handleAddClass = () => {
    setIsModalAddOpen(true);
  }

  const handleDelete = async() => {
    try {
        await deleteClass(Number(idDelete));
        return getDataClass()
      } catch (error: any) {
        toast.error(error?.response?.data?.message)
    }
  }
  
  return (
    <>
      {courseId && 
        <>
        <div className='flex justify-between'>
          <HeaderAddElementComponent 
              handleAdd={handleAddClass}
              handleImportExcell={handleAddClass}
              isButtonImportExcell={false}
          />  

          <DropdownCourse 
            courseId={Number(courseId)}
            courses={courses}
          />

        </div>

          <BaseLayoutContent
            data={classs}
            loading={loading}
            message='Chưa có lớp học nào'
          >
            <div className='react-table'>
              <TableList table={table}/>
              <div className="h-2" />
              <Panigation table={table} />                
            </div>
          </BaseLayoutContent>
          {isModalAddOpen &&
            <AddClass
              setIsModalOpen={setIsModalAddOpen} 
              isModalOpen={isModalAddOpen}
              getDataClass={getDataClass}
              courseId={Number(courseId)}
            />
          }
          {isModalEditOpen &&
            <EditClass
              setIsModalOpen={setIsModalEditOpen} 
              isModalOpen={isModalEditOpen}
              getDataClass={getDataClass}
              idEditSelected={idEditSelected}
              dataClass={classs}
              teachers={teachers}
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
        </>
      }

    </>
  )
}

export default Class;
