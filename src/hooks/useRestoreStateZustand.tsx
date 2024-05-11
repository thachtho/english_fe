import { useEffect } from 'react';

function useRestoreStateZustand(restore: () => void) {
  useEffect(() => {
    return () => {
      restore();
    };
  }, []);
}

export default useRestoreStateZustand;
