import KeepAliveCustom from '../../../components/KeepAliveCustom';
import Course from './Course';

function index() {
  return (
    <KeepAliveCustom>
      <Course />
    </KeepAliveCustom>
  );
}

export default index;
