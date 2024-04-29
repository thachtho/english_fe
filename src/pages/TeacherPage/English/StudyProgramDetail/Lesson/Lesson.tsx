import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Button, Empty, Spin } from 'antd';
import {
  LiteralUnion,
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  createLesson,
  deleteLesson,
  getLessonsByUnitId,
  updateLesson,
} from '../../../../../api/lesson.api';
import { DeleteIcon, EditIcon } from '../../../../../components';
import { useNavigate } from 'react-router-dom';
import useRenderCreateRowDialogContent from '../../../../../hooks/handle/useRenderCreateRowDialogContent';
import useRenderEditRowDialogContent from '../../../../../hooks/handle/useRenderEditRowDialogContent';
import { validateLesson } from './validate';
import useHandleCreateUpdate from '../../../../../hooks/handle/useHandleCreateUpdate';
import ModalConfirm from '../../../../../components/Modal/Confirm';

interface ILessonProps {
  commonTableProps: any;
  unitIdSelected: number | null;
  isReloadLesson: boolean;
  setIsReloadLesson: (isReload: boolean) => void;
}

interface IIputCreate extends Pick<ILesson, 'name' | 'unitId'> {}

function Lesson({
  commonTableProps,
  unitIdSelected,
  isReloadLesson,
  setIsReloadLesson,
}: ILessonProps) {
  const navigation = useNavigate();
  const { renderCreateRowDialogContent } =
    useRenderCreateRowDialogContent('Add Lesson');
  const { renderEditRowDialogContent } =
    useRenderEditRowDialogContent('Edit Lesson');
  const [lessons, setLessons] = useState<any[]>([]);
  const [isLoadding, setIsLoadding] = useState<boolean>(false); // Initial loading state
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [idLessonSelected, setIdLessonSelected] = useState<null | number>(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Tên Lesson',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
    ],
    [validationErrors],
  );

  const { handleCreateUpdate: handleCreate } = useHandleCreateUpdate({
    validate: validateLesson,
    createOption: (values: Record<LiteralUnion<string, string>, any>) => {
      return {
        ...values,
        unitId: Number(unitIdSelected),
      };
    },
    handle: async ({ values }: { values: IIputCreate }) => {
      await createLesson(values);
      setIsReloadLesson(!isReloadLesson);
    },
    setValidationErrors,
    isCreate: true,
  });

  const { handleCreateUpdate: handleUpdate } = useHandleCreateUpdate({
    validate: validateLesson,
    handle: async ({ values, id }) => {
      updateLesson(Number(id), values);
      setIsReloadLesson(!isReloadLesson);
    },
    setValidationErrors,
    isEdit: true,
  });

  const handleDelete = () => {
    deleteLesson(Number(idLessonSelected));
    setIsReloadLesson(!isReloadLesson);
  };

  const getDataLessons = async () => {
    if (unitIdSelected) {
      try {
        const { data } = await getLessonsByUnitId(Number(unitIdSelected));
        setLessons(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoadding(false); // Set loading state to false after fetching (regardless of success or error)
      }
    }
  };

  useEffect(() => {
    setIsLoadding(true); // Set loading state to true before fetching data
    const timeoutId = setTimeout(getDataLessons, 500); // Schedule data fetch after 3 seconds

    return () => clearTimeout(timeoutId); // Clear timeout on component unmount to prevent memory leaks
  }, [unitIdSelected, isReloadLesson]); // Dependency array ensures effect runs only when unitIdSelected changes

  const table = useMaterialReactTable({
    ...commonTableProps,
    columns,
    data: unitIdSelected ? lessons : [],
    defaultColumn: {
      size: 100,
    },
    getRowId: (originalRow) => `table-2-${originalRow.firstName}`,
    onCreatingRowSave: handleCreate,
    onEditingRowSave: handleUpdate,
    renderCreateRowDialogContent,
    renderEditRowDialogContent,
    renderTopToolbarCustomActions: () => (
      <Button type="primary" onClick={() => table.setCreatingRow(true)}>
        Add
      </Button>
    ),

    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Tooltip title="Edit">
          <IconButton color="primary" onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              setIsModalDeleteOpen(true);
              setIdLessonSelected(row.original.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Button
          type="primary"
          size={'small'}
          onClick={() =>
            navigation(`/english/lesson/${row.original.id}/variable`)
          }
        >
          Từ vựng
        </Button>
      </Box>
    ),
  });

  if (!unitIdSelected) {
    return (
      <div className="flex justify-center items-center">
        <Empty />
      </div>
    );
  }

  return (
    <div>
      <Typography color="success.main" component="span" variant="h4">
        Lesson
      </Typography>
      {isLoadding ? (
        <div className="flex justify-center">
          <Spin />
        </div>
      ) : (
        <>
          <MaterialReactTable table={table} />
          {isModalDeleteOpen && (
            <ModalConfirm
              isOpen={isModalDeleteOpen}
              setIsOpen={setIsModalDeleteOpen}
              handle={handleDelete}
              message={'Xác nhận xóa?'}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Lesson;
