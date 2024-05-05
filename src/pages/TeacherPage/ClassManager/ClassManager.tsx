import { Box } from '@mui/material';
import UnitLesson from './UnitLesson/UnitLesson';
import Variable from './Variable/Variable';

function ClassManager() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr 1fr', lg: '1fr 1fr' },
        gap: '1rem',
        overflow: 'auto',
        p: '4px',
      }}
    >
      <UnitLesson />
      <Variable />
    </Box>
  );
}

export default ClassManager;
