import { ReactNode } from 'react';
import Breadcrumb, { IBreadCrumb } from '../components/Breadcrumb';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface IProps {
  breadCrumb?: IBreadCrumb[];
  children?: ReactNode;
  iconHome?: boolean;
  RightComponent?: React.ReactNode;
}

function WraperLayoutStudent({
  children,
  breadCrumb = [],
  iconHome = false,
  RightComponent,
}: IProps) {
  const navigation = useNavigate();

  return (
    <div className="student-container flex justify-center">
      <div
        className="student-wraper"
        style={{
          height: 'auto',

          borderRadius: '0.75rem',
        }}
      >
        {breadCrumb.length > 0 && <Breadcrumb breadCrumb={breadCrumb} />}
        <div className="flex justify-between cursor-pointer items-center mb-2">
          {iconHome ? (
            <div onClick={() => navigation('/')}>
              <HomeOutlined className="text-2xl" />
              <span className="ml-2">Trang chủ</span>
            </div>
          ) : (
            <div></div>
          )}

          {RightComponent && RightComponent}
        </div>

        <div
          className="list-class"
          style={{
            height: 'auto',
            padding: '5px 10px',
            border: '2px solid rgba(140, 140, 140, 0.35)',
            borderRadius: '0.75rem',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default WraperLayoutStudent;
