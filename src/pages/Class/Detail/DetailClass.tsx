import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getClassDetail } from '../../../api/class.api';
import HeaderAddElementComponent from '../../../components/HeaderAddElementComponent';
import Panigation from '../../../components/React-table/Panigation';
import TableList from '../../../components/React-table/Table';
import { useApp } from '../../../context/app.context';
import useFetchData from '../../../hooks/useFetchData';
import UseReactTable from '../../../hooks/useReactTable';
import BaseLayoutContent from '../../../layout/BaseLayoutContent';
import AddStudentToClass from './AddStudentToClass';
import './detail.scss';
import useColumnClassDetail from './useColumseClassDetail';

function DetailClass() {
  const { id: classId } = useParams();
  const { setTitleGlobal } = useApp()
  const { columns } = useColumnClassDetail()
  const [students, setStudents] = useState<IUser[]>()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fetch } = useFetchData({
    api: getClassDetail,
    params: classId
  })
  
  useEffect(() => {
    ( async () => {
      const data = await fetch() as IClass;
      const students = data.classToUsers.map((item) => {
        return item.user
      })
      setStudents(students)
      setTitleGlobal(`Lớp ${data.name}`)
    })() 
  }, [])

  const handleAddStudent = () => {
    setIsModalOpen(true);
  }

  const { table } = UseReactTable({
    columns,
    data: students??[]
  })
  
  return (
    <div className='detail-class'>
      <div className='flex justify-between'> 
        <div>
          <HeaderAddElementComponent 
              handleAdd={handleAddStudent}
              handleImportExcell={handleAddStudent}
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
          <AddStudentToClass
            setIsModalOpen={setIsModalOpen} 
            isModalOpen={isModalOpen}
            classId={Number(classId)}
          />
      }
    </div>
  )
}

export default DetailClass
