import { useNavigate } from 'react-router-dom';
import Loader from '../../../common/Loader';
import WraperLayoutStudent from '../../../layout/WraperLayoutStudent';
import { useFetchDataClass } from './hooks';
import useClass from './state';

function Class() {
  const navigation = useNavigate();
  const { classList } = useClass();
  useFetchDataClass();

  if (classList.length === 0) {
    return <Loader />;
  }

  return (
    <WraperLayoutStudent>
      {classList.length > 0 &&
        classList.map((item, i) => {
          return (
            <div
              key={i}
              className="flex p-2 m-2 cursor-pointer rounded-lg bg-secondary text-black justify-center items-center"
              onClick={() => navigation(`/studentPage/class/${item.classId}`)}
            >
              <p>Lớp {item.class.name}</p>
            </div>
          );
        })}
    </WraperLayoutStudent>
  );
}

export default Class;
