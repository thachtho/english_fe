import React, { useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '../shared/enums/localstorage';

interface AppState {
    titleGlobal: string,
    setTitleGlobal: React.Dispatch<React.SetStateAction<string>>,
    userInfo: IUserInfo,
    setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>
}

interface IUserInfo {
  nickname: string,
}

export const AppContext = React.createContext<AppState>({
    titleGlobal: '',
    setTitleGlobal: () => {},
    userInfo: { nickname: '' },
    setUserInfo: () => null,
});

const AppProvider = ({ children }: any) => {
  const navigation = useNavigate();
  const [titleGlobal, setTitleGlobal] = useState('');
  const [userInfo, setUserInfo] = useState<IUserInfo>({ nickname: '' });
  const [storedValue] = useLocalStorage(LOCAL_STORAGE_KEY.USER_INFO, null)

  const values = {
    titleGlobal,
    setTitleGlobal,
    userInfo,
    setUserInfo
  };

  useEffect(() => {
    if (storedValue) {
      setUserInfo(storedValue)
    } else {
      navigation('/auth/signin')
    }
  }, [])

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;

export const useApp = (): AppState => {
  return useContext(AppContext);
};