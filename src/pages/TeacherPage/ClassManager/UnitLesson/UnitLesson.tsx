import { Box, Button } from '@mui/material';
import { Button as ButtonAtd } from 'antd';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import {
  createClassManager,
  getUnitLessonInClass,
} from '../../../../api/class-manager.api';
import { getClass } from '../../../../api/class.api';
import { useApp } from '../../../../context/app.context';
import ListLesson from './ListLesson';
import ModalAddUnitTolass, { IOptionState } from './ModalAddUnitTolass';
import ModalAddLesson from './ModalAddLesson';

interface IDataTableState {
  id: number;
  unitName: string;
  unitId: number;
  lessons: ILesson[];
}

const UnitLesson = () => {
  const { optionsReactTableDefault } = useApp();
  const { id: classId } = useParams();
  const [isModalAddUnit, setIsModalAddUnit] = useState<boolean>(false);
  const [isModalAddLesson, setIsModalAddLesson] = useState<boolean>(false);
  const [classOption, setClassOption] = useState<IClass | null>(null);
  const [unitLesson, setUnitLesson] = useState<IClassManager[]>([]);
  const [isReload, setIsReload] = useState<boolean>(false);
  const [idClassManagerSelected, setIdClassManagerSelected] = useState<
    number | null
  >(null);

  const columns = useMemo<MRT_ColumnDef<IDataTableState>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'unitName',
        header: 'Tên Unit',
      },
    ],
    [],
    //end
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getClass(Number(classId));
        const { data: unitLesson } = await getUnitLessonInClass(
          Number(classId),
        );
        setUnitLesson(unitLesson);
        setClassOption(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    })();
  }, [classId, isReload]);

  const handleAddLesson = (classManagerId: number) => {
    setIdClassManagerSelected(classManagerId);
    setIsModalAddLesson(true);
  };

  const renderDataTable = () => {
    return unitLesson.map((item) => {
      const { id, unit, classManagerLessons } = item;
      return {
        id,
        unitName: unit.name,
        unitId: unit.id,
        lessons: classManagerLessons.map((item) => {
          return item.lesson;
        }),
      };
    });
  };

  const table = useMaterialReactTable({
    ...optionsReactTableDefault,
    columns,
    data: renderDataTable(),
    initialState: {
      expanded: { 0: true },
      ...optionsReactTableDefault.initialState,
    },
    enableEditing: false,
    renderDetailPanel: ({ row }) => {
      const lessons: ILesson[] = row.original.lessons;

      return (
        <>
          <ListLesson lessons={lessons} />
          <Button
            variant="contained"
            onClick={() => handleAddLesson(row.original.id)}
          >
            Add Lesson
          </Button>
        </>
      );
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <ButtonAtd type="primary" size={'small'}>
          Quản lý
        </ButtonAtd>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Button variant="contained" onClick={() => setIsModalAddUnit(true)}>
        Add Unit
      </Button>
    ),
  });

  const handleAddUnit = async (option: IOptionState) => {
    const input = {
      unitId: Number(option.unitId),
      classId: Number(classId),
    };

    await createClassManager(input);
    setIsReload(!isReload);
    setIsModalAddUnit(false);
  };

  return (
    <>
      <MaterialReactTable table={table} />;
      {isModalAddUnit && (
        <ModalAddUnitTolass
          isModalOpen={isModalAddUnit}
          setIsModalOpen={setIsModalAddUnit}
          classOption={classOption}
          handle={handleAddUnit}
        />
      )}
      {isModalAddLesson && idClassManagerSelected && (
        <ModalAddLesson
          isModalOpen={isModalAddLesson}
          setIsModalOpen={setIsModalAddLesson}
          idClassManagerSelected={idClassManagerSelected}
          classOption={classOption}
        />
      )}
    </>
  );
};

export default UnitLesson;
