import { ReactNode } from 'react';
import Breadcrumb, { IBreadCrumb } from '../components/Breadcrumb';

interface IProps {
  breadCrumb?: IBreadCrumb[];
  children?: ReactNode;
}

function WraperLayoutStudent({ children, breadCrumb = [] }: IProps) {
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
