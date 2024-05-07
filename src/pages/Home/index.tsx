import Loader from '../../common/Loader';
import KeepAliveCustom from '../../components/KeepAliveCustom';
import { useApp } from '../../context/app.context';
import { ROLE } from '../../shared/enums/role';
import Class from '../StudentPage/Class/Class';
import Home from './Home';

function index() {
  const { role } = useApp();

  if (!role) {
    return <Loader />;
  }

  if (role === ROLE.STUDENT) {
    return <Class />;
  }

  return (
    <KeepAliveCustom>
      <Home />
    </KeepAliveCustom>
  );
}

export default index;
