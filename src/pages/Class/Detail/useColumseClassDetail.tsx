import { ColumnDef } from '@tanstack/react-table';
import React from 'react'
import Button from '../../../components/UiElements/Button';
import { DeleteIcon, EditIcon } from '../../../components';

function useColumnClassDetail() {
  const columns = React.useMemo<ColumnDef<any, any>[]>(
    () => [
        {
            id: 'id',
            cell: row => row.row.index + 1,
            header: () => <span>STT</span>,
            footer: props => props.column.id,
          },  
          {
            accessorFn: row => row.nickname,
            id: 'nickname',
            cell: info => info.getValue(),
            header: () => <span>Nickname</span>,
            footer: props => props.column.id,
          },
          {
            accessorFn: row => row.fullname,
            id: 'fullname',
            header: 'Họ và tên',
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            header: 'Action',
            cell: (row) => (
              <div className='flex justify-center'>
                <Button handleClick={() => console.log(333333, row)} className='pr-5'>
                  <EditIcon />
                </Button>
                <Button handleClick={() => console.log(333333, row)} className='pr-5'>
                  <DeleteIcon width={20} height={20}/>
                </Button>
                <Button handleClick={() => alert(1)} className='text-meta-5' text={'Chi tiết'}/>
              </div>
            ),
          },
    ],
    []
  )
  return {
    columns
  }
}

export default useColumnClassDetail
