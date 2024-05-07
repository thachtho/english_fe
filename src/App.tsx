import React, { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import './app.scss';
import SignIn from './pages/Authentication/SignIn/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Error from './pages/Error';
import Home from './pages/Home/index';
import routes from './routes';
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />

      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<Home />} />
          {routes.map(({ path, component: Component }, index: number) => (
            <Route
              path={path}
              key={index}
              element={
                <React.Suspense fallback={<>...</>}>
                  <Component />
                </React.Suspense>
              }
            />
          ))}
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
