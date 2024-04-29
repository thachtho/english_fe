import { Box, Button } from '@mui/material';
import { Button as ButtonAtd } from 'antd';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../../context/app.context';
import { IResponseClassList } from '../../../untils';
import ModalAddUnitLessonTolass from './ModalAddUnitLessonTolass';
import toast from 'react-hot-toast';
import { getClass } from '../../../api/class.api';

const ClassManager = () => {
  const navigation = useNavigate();
  const { id: classId } = useParams();
  const { optionsReactTableDefault } = useApp();
  const [isModalAdd, setIsModalAdd] = useState<boolean>(false);
  const [classOtions, setClassOption] = useState<IClass | null>(null);
  const columns = useMemo<MRT_ColumnDef<IResponseClassList>[]>(() => {
    return [
      {
        header: 'Unit',
        accessorKey: 'courseName',
      },
      {
        header: 'Lesson',
        accessorKey: 'blockId',
      },
    ];
  }, []);

  const table = useMaterialReactTable({
    ...optionsReactTableDefault,
    columns,
    data: [],
    groupedColumnMode: 'remove',
    initialState: {
      expanded: true, //expand all groups by default
      grouping: ['courseName', 'blockId'], //an array of columns to group by by default (can be multiple)
      ...optionsReactTableDefault.initialState,
    },

    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <ButtonAtd
          type="primary"
          size={'small'}
          onClick={() => navigation(`/class-manager/${row.original.id}`)}
        >
          Quản lý
        </ButtonAtd>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Button variant="contained" onClick={() => setIsModalAdd(true)}>
        Add
      </Button>
    ),
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getClass(Number(classId));
        setClassOption(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    })();
  }, [classId]);

  return (
    <>
      <MaterialReactTable table={table} />
      {isModalAdd && (
        <ModalAddUnitLessonTolass
          isModalOpen={isModalAdd}
          setIsModalOpen={setIsModalAdd}
          classOtions={classOtions}
        />
      )}
    </>
  );
};

export default ClassManager;
