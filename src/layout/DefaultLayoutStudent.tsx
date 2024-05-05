import { Outlet } from 'react-router-dom';
import HeaderStudent from './HeaderStudent';

function DefaultLayoutStudent() {
  return (
    <main className="p-2 flex justify-center">
      <div className="lg:w-230 w-full">
        <HeaderStudent />
        <div
          className="overflow-y-auto overflow-x-hidden scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 h-32 "
          style={{ height: '85vh' }}
        >
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default DefaultLayoutStudent;
