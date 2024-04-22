import KeepAliveCustom from '../../../components/KeepAliveCustom';
import ClassList from './ClassList';
import ClassListProvider from './ClassList.context';

function index() {
  return (
    <KeepAliveCustom>
      <ClassListProvider>
        <ClassList />
      </ClassListProvider>
    </KeepAliveCustom>
  );
}

export default index;
