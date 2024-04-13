import { ColumnDef } from '@tanstack/react-table';
import React from 'react'
import Button from '../../../components/UiElements/Button';
import { DeleteIcon, EditIcon } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/app.context';

function useColumnCourse({
  setIdSelected,
  setIsModalEditOpen,
  setIsModalConfirmDeleteOpen
}: {
  setIdSelected: (id: number) => void,
  setIsModalEditOpen: (isOpen: boolean) => void,
  setIsModalConfirmDeleteOpen: (isOpen: boolean) => void,
}) {
  const navigation = useNavigate();
  const { setCourseIdSelected } = useApp()
  const [idDelete, setIdDelete] = React.useState<null | number>(null)
  const handleEdit = (id: number) => {
    setIsModalEditOpen(true)
    setIdSelected(id)
  }

  const handleDeleteCourse = async (id: number) => {
    setIsModalConfirmDeleteOpen(true)
    setIdDelete(id)
  }

  const navigateClass = (id: number, course: string) => {
    setCourseIdSelected(id);
    navigation(`/class`);
  }

  const columns = React.useMemo<ColumnDef<ICourse, any>[]>(
    () => [
        {
            id: 'id',
            cell: row => <div className='text-center'>{row.row.index + 1}</div>,
            header: () => <span>STT</span>,
            footer: props => props.column.id,
          },  
          {
            id: 'from',
            cell: (row) => {
              const { from, to } = row.row.original
              
              return <div className='text-center'>{`${from}-${to}`}</div> 
            },
            header: () => <span>Khóa học</span>,
            footer: props => props.column.id,
          },
          {
            header: 'Action',
            cell: (row) => {
              const id = row.row.original.id;
              const from = row.row.original.from
              const to = row.row.original.to
              const course = `${from}-${to}`


              return(
                <div className='flex justify-center'>
                  <Button handleClick={() => handleEdit(id)} className='pr-5'>
                    <EditIcon />
                  </Button>
                  <Button handleClick={() => handleDeleteCourse(id)} className='pr-5'>
                    <DeleteIcon width={20} height={20}/>
                  </Button>
                  <Button handleClick={() => navigateClass(id, course)} className='text-meta-5' text={'Chi tiết'}/>
                </div>
              )
            } 
          },
    ],
    []
  )
  return {
    columns,
    idDelete
  }
}

export default useColumnCourse
