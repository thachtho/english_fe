import { useState } from 'react'

import {
  FilterFn
} from '@tanstack/react-table'

import {
  RankingInfo
} from '@tanstack/match-sorter-utils'
import Panigation from '../../components/React-table/Panigation'
import TableList from '../../components/React-table/Table'
import Button from '../../components/UiElements/Button'
import useTitle from '../../hooks/useTitle'
import BaseLayoutContent from '../../layout/BaseLayoutContent'
import AddClass from './AddClass'
import useClass from './hooks/useClass'
import EditClass from './EditClass'
import ModalConfirm from '../../components/Modal/Confirm'
import { deleteClass } from '../../api/class.api'
import toast from 'react-hot-toast'
import HeaderAddElementComponent from '../../components/HeaderAddElementComponent'

declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

function Class() {
  useTitle();
  const [idEditSelected, setIdEditSelected] = useState<number | null>(null)
  const handleEditTeacher = (id: number) => {
    setIsModalEditOpen(true);
    setIdEditSelected(id);
  }
  const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] = useState(false);
  const { getDataClass, table, classs, teachers, idDelete } = useClass({ handleEditTeacher, setIsModalConfirmDeleteOpen });
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
        <HeaderAddElementComponent 
            handleAdd={handleAddClass}
            handleImportExcell={handleAddClass}
        />    
        <BaseLayoutContent>
          <div className='student'>
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
  )
}

export default Class;
