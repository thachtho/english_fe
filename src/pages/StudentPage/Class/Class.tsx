import { useEffect, useState } from 'react';
import { getAllClassWithStudentId } from '../../../api/class.api';
import toast from 'react-hot-toast';
import WraperLayoutStudent from '../../../layout/WraperLayoutStudent';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../common/Loader';

function Class() {
  const navigation = useNavigate();
  const [classList, setClassList] = useState<IClassStudent[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllClassWithStudentId();
        setClassList(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    })();
  }, []);

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
