import KeepAliveCustom from '../../../components/KeepAliveCustom';
import useLoadClassTabName from '../../../hooks/useLoadClassTabName';
import ClassManager from './ClassManager';

function index() {
  useLoadClassTabName();

  return (
    <KeepAliveCustom>
      <ClassManager />
    </KeepAliveCustom>
  );
}

export default index;
