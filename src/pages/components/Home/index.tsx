
import { useApp } from '../../../common/context/app.context';
import Loader from '../../../common/Loader';
import KeepAliveCustom from '../../../components/KeepAliveCustom';

import Home from './Home';

function index() {
  const { role } = useApp();

  // if (!role) {
  //   return <Loader />;
  // }

  return (
    <KeepAliveCustom>
      <Home />
    </KeepAliveCustom>
  );
}

export default index;
