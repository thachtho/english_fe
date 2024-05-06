import { useEffect, useState } from 'react';
import { getAllClassWithStudentId } from '../../../api/class.api';
import toast from 'react-hot-toast';

function Class() {
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

  return (
    <div className="student-container flex justify-center">
      <div
        className="student-wraper"
        style={{
          marginTop: '10px',
          height: 'auto',
          padding: '5px 10px',
          borderRadius: '0.75rem',
        }}
      >
        <div
          className="list-class"
          style={{
            height: 'auto',
            padding: '5px 10px',
            border: '2px solid rgba(140, 140, 140, 0.35)',
            borderRadius: '0.75rem',
          }}
        >
          {classList.length > 0 &&
            classList.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex p-2 m-2 cursor-pointer rounded-lg bg-secondary text-black justify-center items-center"
                >
                  <p>Lớp {item.class.name}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Class;
