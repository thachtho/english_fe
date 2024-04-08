import { Suspense, lazy, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';

import './app.scss';
import { useTabs } from './context/tabs.context';
import SignIn from './pages/Authentication/SignIn/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
import routes from './routes';
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const { addTab, items: itemTabs } = useTabs()
  const location = useLocation()
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    const tab = itemTabs.find((item) => item.key === pathname)

    if(tab) {
      addTab(tab)
    }
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <>
    <Toaster position='top-right' reverseOrder={false} containerClassName='overflow-auto'/>
  
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          {routes.map(({ path, component: Component }, index: number) => (
            <Route
              path={path}
              key={index}
              element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
