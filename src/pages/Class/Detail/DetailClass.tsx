import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { studentsInClass } from '../../../api/class.api';
import HeaderAddElementComponent from '../../../components/HeaderAddElementComponent';
import Panigation from '../../../components/React-table/Panigation';
import TableList from '../../../components/React-table/Table';
import useFetchData from '../../../hooks/useFetchData';
import useLoader from '../../../hooks/useLoader';
import UseReactTable from '../../../hooks/useReactTable';
import BaseLayoutContent from '../../../layout/BaseLayoutContent';
import AddStudentToClass from './AddStudentToClass';
import useColumnClassDetail from './useColumseClassDetail';

function DetailClass() {
  const { loading } = useLoader()
  const { id: classId } = useParams();
  const { columns } = useColumnClassDetail()
  const [students, setStudents] = useState<IUser[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherName, setTeacherName] = useState<string>('')

  const { fetch } = useFetchData({
    api: studentsInClass,
    params: classId
  })
  
  useEffect(() => {
    ( async () => {
      const data = await fetch() as IClass;
      const students = data.classToStudents.map((item) => {
        return item.user
      })

      setTeacherName(data.teacher.fullname as string);
      setStudents(students)

    })() 
  }, [isModalOpen, classId])

  const handleAddStudent = () => {
    setIsModalOpen(true);
  }

  const { table } = UseReactTable({
    columns,
    data: students??[]
  })
  
  return (
    <div className='react-table'>
      <div className='flex justify-between'> 
        <div>
          <HeaderAddElementComponent 
              handleAdd={handleAddStudent}
              handleImportExcell={handleAddStudent}
          />  
        </div>
        <span>
          GV: {teacherName}
        </span>
      </div>
      <BaseLayoutContent
        data={students}
        loading={loading}
        message='Chưa có học sinh nào'
      >
        {students.length > 0 && 
          <div className='student'>
            <TableList table={table}/>
            <div className="h-2" />
            <Panigation  table={table} />                
          </div>
        }

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
