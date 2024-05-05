import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../../../context/app.context';
import useFetchVariable from '../../../../hooks/useFetchVariable';
import useSound from '../../../../hooks/useSound';
import { useClassManager } from '../ClassManager.context';
import Sound from '../../../../components/Source';
import { Spin } from 'antd';

function Variable() {
  const { optionsReactTableDefault } = useApp();
  const { lessonIdSelected: lessonId } = useClassManager();
  const { variables } = useFetchVariable(lessonId);
  const { audio, handleChangeSource, audioSrc, setIsPlaying } = useSound();
  const [isLoadding, setIsLoadding] = useState<boolean>(true);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Từ vựng',
      },
      {
        header: 'Âm thanh',
        enableEditing: false,
        Cell: ({ row }) => {
          return (
            <Sound
              handleChangeSound={handleChangeSource}
              name={row.original.name}
            />
          );
        },
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    ...optionsReactTableDefault,
    enableEditing: false,
    columns,
    data: variables,
    defaultColumn: {
      size: 100,
    },
  });

  useEffect(() => {
    setIsLoadding(true);
    setTimeout(() => {
      setIsLoadding(false);
    }, 500);
  }, [lessonId]);
  return (
    <>
      {isLoadding ? (
        <div className="flex justify-center">
          <Spin />
        </div>
      ) : (
        <>
          <MaterialReactTable table={table} />
          <audio
            id="audio"
            src={audioSrc || ''}
            ref={audio}
            onEnded={() => setIsPlaying(false)}
          />
        </>
      )}
    </>
  );
}

export default Variable;
