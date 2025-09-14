import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../../shared/enums/localstorage';
import { getRole } from '../../api/user/user.api';
import { Box } from '@mui/material';
import { Button } from 'antd';


interface AppState {
  titleGlobal: string;
  setTitleGlobal: React.Dispatch<React.SetStateAction<string>>;
  userInfo: IUserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>;
  height: number;
  setCourseIdSelected: React.Dispatch<React.SetStateAction<number | null>>;
  courseIdSelected: number | null;
  optionsReactTableDefault: any;
  studyProgramIdSelected: null | number;
  setStudyProgramIdSelected: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  role: number | null;
}

interface IUserInfo {
  username: string;
}

export const AppContext = React.createContext<AppState>({
  titleGlobal: '',
  setTitleGlobal: () => {},
  userInfo: { username: '' },
  setUserInfo: () => null,
  height: 0,
  setCourseIdSelected: () => {},
  courseIdSelected: null,
  optionsReactTableDefault: {},
  studyProgramIdSelected: null,
  setStudyProgramIdSelected: () => {},
  role: null,
});

const AppProvider = ({ children }: any) => {
  const navigation = useNavigate();
  const [height, setHeight] = useState(window.innerHeight);
  const [titleGlobal, setTitleGlobal] = useState('');
  const [userInfo, setUserInfo] = useState<IUserInfo>({ username: '' });
  const [storedValue] = useLocalStorage(LOCAL_STORAGE_KEY.USER_INFO, null);
  const [courseIdSelected, setCourseIdSelected] = useState<number | null>(null);
  const [studyProgramIdSelected, setStudyProgramIdSelected] = useState<
    number | null
  >(null);
  const [role, setRole] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await getRole();
      setRole(data.level);
    })();
  }, []);

  const optionsReactTableDefault = {
    enableToolbarInternalActions: false,
    // enableGrouping: true,
    enableBottomToolbar: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enablePagination: false,
    enableEditing: true,
    initialState: {
      columnPinning: { right: ['mrt-row-actions'] },
      showGlobalFilter: true,
    },
    muiTableContainerProps: { sx: { maxHeight: `${height - 250}px` } },
  };

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }

    // Thêm sự kiện resize để cập nhật chiều cao màn hình khi kích thước màn hình thay đổi
    window.addEventListener('resize', handleResize);

    // Dọn dẹp sự kiện khi thành phần bị gỡ bỏ
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const values = {
    titleGlobal,
    setTitleGlobal,
    userInfo,
    setUserInfo,
    height,
    courseIdSelected,
    setCourseIdSelected,
    optionsReactTableDefault,
    studyProgramIdSelected,
    setStudyProgramIdSelected,
    role,
  };

  useEffect(() => {
    if (storedValue) {
      setUserInfo(storedValue);
    } else {
      navigation('/auth/signin');
    }
  }, []);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;

export const useApp = (): AppState => {
  return useContext(AppContext);
};
