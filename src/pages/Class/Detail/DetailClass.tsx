import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getClassDetail } from '../../../api/class.api';
import { DeleteIcon, EditIcon } from '../../../components';
import Panigation from '../../../components/React-table/Panigation';
import TableList from '../../../components/React-table/Table';
import Button from '../../../components/UiElements/Button';
import { useApp } from '../../../context/app.context';
import useFetchData from '../../../hooks/useFetchData';
import UseReactTable from '../../../hooks/useReactTable';
import BaseLayoutContent from '../../../layout/BaseLayoutContent';
import AddStudent from '../../Users/Student/AddStudent';
import './detail.scss'

interface IDetailClass extends IClass{
  students: IUser
}

function DetailClass() {
  const { id: classId } = useParams();
  const { setTitleGlobal } = useApp()
  const [classs, setClass] = useState<IDetailClass>()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fetch } = useFetchData({
    api: getClassDetail,
    params: classId,
    setState: setClass
  })
  
  useEffect(() => {
    ( async () => {
      const data = await fetch() as IClass;
      setTitleGlobal(`Lớp ${data.name}`)
    })() 
  }, [])

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

  const handleAddStudent = () => {
    setIsModalOpen(true);
  }

  const { table } = UseReactTable({
    columns,
    data: classs?.students??[]
  })

  
  return (
    <div className='detail-class'>
      <div className='flex justify-between'> 
        <div>
          <Button 
            className='inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5 cursor-pointer mr-2'
            handleClick={handleAddStudent}
            text='Add' 
          />
          <Button 
            className='inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5 cursor-pointer'
            handleClick={() => alert(2)}
            text='Import excel' 
          />
        </div>
        <span>
          GV: Bui Thanh Tho
        </span>
      </div>
      <BaseLayoutContent>
          <div className='student'>
            <TableList table={table}/>
            <div className="h-2" />
            <Panigation  table={table} />                
          </div>
      </BaseLayoutContent>
      {isModalOpen &&
          <AddStudent
            setIsModalOpen={setIsModalOpen} 
            isModalOpen={isModalOpen}
            getDataStudent={() => {}}
          />
      }
    </div>
  )
}

export default DetailClass
