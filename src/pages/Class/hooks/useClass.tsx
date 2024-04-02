import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getClass } from "../../../api/class.api";
import { DeleteIcon, EditIcon } from "../../../components";
import Button from "../../../components/UiElements/Button";
import { useClass as useClassContext } from "../../../context/class.context";
import UseReactTable from "../../../hooks/useReactTable";
import useQueryUrl from "../../../hooks/useQueryUrl";
import { useApp } from "../../../context/app.context";

function useClass({
  handleEditTeacher,
  setIsModalConfirmDeleteOpen
}: {
  handleEditTeacher: (id: number) => void,
  setIsModalConfirmDeleteOpen: any
}) {
    const navigation = useNavigate();
    const { setTitleGlobal } = useApp()
    const courseId = useQueryUrl('courseId');
    const [classs, setClass] = React.useState<IClass[]>([])
    const [idDelete, setIdDelete] = React.useState<null | number>(null)
    const { teachers } = useClassContext()

    const handleDeleteClass = async (id: number) => {
      setIsModalConfirmDeleteOpen(true)
      setIdDelete(id)
    }

    const navigateDetail = (id: number) => {
      navigation(`/class/${id}`);
    }

    const columns = React.useMemo<ColumnDef<IClass, any>[]>(
      () => [
          {
              id: 'id',
              cell: row => row.row.index + 1,
              header: () => <span>STT</span>,
              footer: props => props.column.id,
            },  
            {
              accessorFn: row => row.name,
              id: 'name',
              cell: info => info.getValue(),
              header: () => <span>Tên lớp</span>,
              footer: props => props.column.id,
            },
            {
              accessorFn: row => {
                const teacherId = row.teacherId;
                const teacher = teachers.find(teacher => teacher.id === teacherId);
  
                return teacher ? teacher.fullname : '';
              },
              id: 'teacherId',
              header: 'Giáo viên',
              cell: (row) => {
                const userId = row.row.original.teacherId;
                return teachers.length > 0 ? teachers.find(teacher => teacher.id === userId)?.fullname : ''
              },
              footer: props => props.column.id,
            },
            {
              header: 'Action',
              cell: (row) => {
                const id = row.row.original.id;

                return <div className='flex justify-center'>
                  <Button handleClick={() => handleEditTeacher(id)} className='pr-5'>
                    <EditIcon />
                  </Button>
                  <Button handleClick={() => handleDeleteClass(id)} className='pr-5'>
                    <DeleteIcon width={20} height={20}/>
                  </Button>
                  <Button handleClick={() => navigateDetail(id)} className='text-meta-5' text={'Chi tiết'}/>
                </div>
              },
            },
      ],
      [teachers]
    )

     const getDataClass = async () => {
        try {
          const { data } = await getClass(Number(courseId))
          setClass(data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    const { table } = UseReactTable({
      columns,
      data: classs
    })

    useEffect(() => {
      setTitleGlobal('Khoa hoc')
      getDataClass();
    }, [courseId])

    return {
        classs,
        getDataClass,
        teachers,
        table,
        idDelete,
        courseId
    }
}

export default useClass
