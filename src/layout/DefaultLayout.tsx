import { useEffect, useState } from 'react';
import { AliveScope } from 'react-activation';
import { Outlet } from 'react-router-dom';
import Loader from '../common/Loader';
import AppProvider, { useApp } from '../context/app.context';
import TabsProvider from '../context/tabs.context';
import { ROLE } from '../shared/enums/role';
import DefaultLayoutStudent from './DefaultLayoutStudent';
import Header from './Header';
import Sidebar from './Sidebar';

const DefaultLayout = () => {
  return (
    <TabsProvider>
      <AppProvider>
        <AliveScope>
          <MainScreen />
        </AliveScope>
      </AppProvider>
    </TabsProvider>
  );
};

export default DefaultLayout;

const MainScreen = () => {
  const { role } = useApp();
  const isStudent = role === ROLE.STUDENT;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {role !== null && (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
            {!isStudent && (
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            )}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {!isStudent ? (
                <>
                  <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                  <main
                    className="p-2 md:p-2 2xl:p-2"
                    style={{ height: '90vh' }}
                  >
                    <div
                      className=" max-w-full overflow-x-auto"
                      style={{ background: 'white', height: '100%' }}
                    >
                      <div className="p-2 md:p-2 2xl:p-2">
                        <Outlet />
                      </div>
                    </div>
                  </main>
                </>
              ) : (
                <DefaultLayoutStudent />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
