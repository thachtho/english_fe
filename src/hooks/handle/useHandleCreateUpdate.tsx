import { LiteralUnion, MRT_TableOptions } from 'material-react-table';

interface IUseHandleCUProps {
  isCreate?: boolean;
  isEdit?: boolean;
  validate: (values: any) => any;
  setValidationErrors: (values: any) => void;
  createOption?: (values: Record<LiteralUnion<string, string>, any>) => any;
  handle: ({ values, id }: { values: any; id?: number }) => Promise<void>;
}

function useHandleCreateUpdate({
  validate,
  setValidationErrors,
  createOption,
  handle,
  isCreate,
  isEdit,
}: IUseHandleCUProps) {
  const handleCreateUpdate: MRT_TableOptions<any>['onCreatingRowSave'] =
    async ({ values, table, row }) => {
      const newValidationErrors = validate(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      let options;

      if (createOption) {
        options = createOption(values);
      } else {
        options = values;
      }

      if (isCreate) {
        await handle({ values: options });
        table.setCreatingRow(null); //exit creating mode
      }

      if (isEdit) {
        await handle({
          id: row.original.id,
          values: options,
        });
        table.setEditingRow(null); //exit editing mode
      }
    };

  return {
    handleCreateUpdate,
  };
}

export default useHandleCreateUpdate;
