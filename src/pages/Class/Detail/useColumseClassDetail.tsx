import { ColumnDef } from '@tanstack/react-table';
import React from 'react'

function useColumnClassDetail() {
    const columns = React.useMemo<ColumnDef<IClass, any>[]>(
        () => [
            {
                id: 'id',
                cell: row => row.row.index + 1,
                header: () => <span>STT</span>,
                footer: props => props.column.id,
              },  
              {
                // accessorFn: row => row.name,
                id: 'name',
                cell: info => info.getValue(),
                header: () => <span>Tên học sinh</span>,
                footer: props => props.column.id,
              }
            //   {
            //     header: 'Action',
            //     cell: (row) => {
            //       const id = row.row.original.id;
  
            //       return <div className='flex justify-center'>
            //         <Button handleClick={() => handleEditTeacher(id)} className='pr-5'>
            //           <EditIcon />
            //         </Button>
            //         <Button handleClick={() => handleDeleteClass(id)} className='pr-5'>
            //           <DeleteIcon width={20} height={20}/>
            //         </Button>
            //         <Button handleClick={() => navigateDetail(id)} className='text-meta-5' text={'Chi tiết'}/>
            //       </div>
            //     },
            //   },
        ],
        []
      )
  return {
    columns
  }
}

export default useColumnClassDetail
