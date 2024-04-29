import KeepAliveCustom from '../../../../components/KeepAliveCustom';
import useLoadClassTabName from '../../../../hooks/useLoadClassTabName';
import DetailClass from './DetailClass';

function index() {
  useLoadClassTabName();

  return (
    <KeepAliveCustom>
      <DetailClass />
    </KeepAliveCustom>
  );
}

export default index;
