import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { MRT_EditActionButtons } from 'material-react-table';

function useRenderEditRowDialogContent(title: string) {
  const renderEditRowDialogContent = ({
    table,
    row,
    internalEditComponents,
  }: any) => (
    <>
      <DialogTitle variant="h3">{title}</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      >
        {internalEditComponents}
      </DialogContent>
      <DialogActions>
        <MRT_EditActionButtons variant="text" table={table} row={row} />
      </DialogActions>
    </>
  );
  return {
    renderEditRowDialogContent,
  };
}

export default useRenderEditRowDialogContent;
