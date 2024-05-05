import KeepAliveCustom from '../../../components/KeepAliveCustom';
import useLoadClassTabName from '../../../hooks/useLoadClassTabName';
import ClassManager from './ClassManager';
import ClassManagerProvider from './ClassManager.context';

function index() {
  useLoadClassTabName();

  return (
    <KeepAliveCustom>
      <ClassManagerProvider>
        <ClassManager />
      </ClassManagerProvider>
    </KeepAliveCustom>
  );
}

export default index;
