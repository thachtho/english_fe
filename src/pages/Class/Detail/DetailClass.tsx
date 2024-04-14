import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip
} from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef
} from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { removeStudentInClass, studentsInClass } from '../../../api/class.api';
import { DeleteIcon } from '../../../components';
import { useApp } from '../../../context/app.context';
import AddStudentToClass from './AddStudentToClass';
import ModalConfirm from '../../../components/Modal/Confirm';

const DetailClass = () => {
  const { height } = useApp()
  const { id: classId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState<IUser[]>([])
  const [teacherName, setTeacherName] = useState<string>('')
  const [className, setClassName] = useState<string>('')
  const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] = useState(false);
  const [idStudentSelected, setIdStudentSelected] = useState<null | number>(null)

  useEffect(() => {
    ( async () => {
      try {
        await getStudentsInClass();
      } catch (error: any) {
        toast.error(error?.response?.data?.message)
      }
    })() 
  }, [])

  const getStudentsInClass = async () => {
    const { data } = await studentsInClass(Number(classId));
    const students = data.classToStudents.map((item) => {
      return item.user
    })

    setTeacherName(data.teacher.fullname as string);
    setStudents(students)    
    setClassName(data.name)
  }

  const handleDelete = async() => {
    try {
        const values = {
          userId: idStudentSelected as number, 
          classId: Number(classId)
        }

        await removeStudentInClass(values);
        return getStudentsInClass()
      } catch (error: any) {
        toast.error(error?.response?.data?.message)
    }
  }

  const columns = useMemo<MRT_ColumnDef<IUser>[]>(() => {
    return [
      {
        header: 'Tên học sinh',
        accessorKey: 'fullname',
      },
      {
        header: 'Nickname',
        accessorKey: 'nickname',
      }
    ]
  }, [])

  const table = useMaterialReactTable({
    columns,
    data: students,
    enableGrouping: true,
    enableBottomToolbar: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enablePagination: false,
    enableEditing: true,

    muiTableContainerProps: { sx: { maxHeight: `${(height-180)}px` } },

    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => {
            setIsModalConfirmDeleteOpen(true)
            setIdStudentSelected(row.original.id)
          }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <div className='flex items-center'>
        <Button
          variant="contained"
          onClick={() => {
            setIsModalOpen(true); //simplest way to open the create row modal with no default values
          }}
        >
          Add
        </Button>
        <span className='ml-10'>Lớp: {className}</span>
        <span className='ml-10'>GV: {teacherName}</span>
      </div>
    ),

  });

  return (
    <>
      <Stack gap="1rem">
        <MaterialReactTable table={table} />
      </Stack>    
      {isModalOpen &&
          <AddStudentToClass
            setIsModalOpen={setIsModalOpen} 
            isModalOpen={isModalOpen}
            classId={Number(classId)}
            getStudentsInClass={getStudentsInClass}
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
  );
};

export default DetailClass;

