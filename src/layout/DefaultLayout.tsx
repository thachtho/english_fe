import { useState } from 'react';
import { AliveScope } from 'react-activation';
import { Outlet } from 'react-router-dom';

import { ROLE } from '../shared/enums/role';
import Header from './Header';
import Sidebar from './Sidebar';
import TabsProvider from '../common/context/tabs.context';
import AppProvider, { useApp } from '../common/context/app.context';

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

  return (
    <>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
            {!isStudent && (
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            )}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
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
            </div>
          </div>
        </div>
    </>
  );
};
