import React, { useContext, useState } from 'react';

interface AppState {
    titleGlobal: string,
    setTitleGlobal: React.Dispatch<React.SetStateAction<string>>
}

export const AppContext = React.createContext<AppState>({
    titleGlobal: '',
    setTitleGlobal: () => {},
});

const AppProvider = ({ children }: any) => {
  const [titleGlobal, setTitleGlobal] = useState('');

  const values = {
    titleGlobal,
    setTitleGlobal,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;

export const useApp = (): AppState => {
  return useContext(AppContext);
};