import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getKeyTab } from '../untils';


type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface Item {
    label: string;
    key: string;
    search?: string,
    isSetTitle?: boolean
}
interface TabsState {
    items: Item[],
    activeKey: string,
    onChangeTab: (key: string) => void,
    addTab: (data: Item) => void,
    removeTab: (targetKey: TargetKey) => void
    onEditTab: (targetKey: TargetKey, action: 'add' | 'remove') => void,
    setTitleCurrentTab: (title: string, key: string) => void
}

export const TabsContext = React.createContext<TabsState>({
    activeKey: '',
    onChangeTab: () => {},
    addTab: () => {},
    removeTab: () => {},
    onEditTab: () => {},
    items: [],
    setTitleCurrentTab: () => {}

});

const TabsProvider = ({ children }: any) => {
    const navigation = useNavigate();
    const [activeKey, setActiveKey] = useState('');
    const [items, setItems] = useState<Item[]>([]);

    const onChangeTab = (key: string) => {
        navigation(`${key}`)
        setActiveKey(key);
      };
    
      const addTab = ({ label, key }: Item) => {
        const isExit = items.find((item) => item.key === key);

        if (!isExit) {
            setItems([...items, { label, key, isSetTitle: false }]);
        }

        setActiveKey(key);
      };
    
      const removeTab = (targetKey: TargetKey) => {
        const targetIndex = items.findIndex((pane) => pane.key === targetKey);
        const newPanes = items.filter((pane) => pane.key !== targetKey);
        if (newPanes.length && targetKey === activeKey) {
          const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
          setActiveKey(key);
          navigation(`${key}`)
        }
        setItems(newPanes);
      };
    
      const onEditTab = (targetKey: TargetKey, action: 'add' | 'remove') => {
        if (action === 'add') {
          addTab({ label: 'abc', key: '1' });
        } else {
            removeTab(targetKey);
        }
      };

      const setTitleCurrentTab = (title: string, key: string) => {  
        setTimeout( async () => {
            setItems((items) => {
                const tab = items.find((item) => item.key === key)

                if (tab) {
                    if (!tab?.isSetTitle) {
                        tab.isSetTitle = true
                        tab.label = `${tab?.label} ${title}`
                    }
                }

                return [...items]
            })
        }, 500);
      }

      // useEffect(() => {
      //   const key = getKeyTab(location as any);
      //   setActiveKey(key);
      // }, [items, window.location.href])

      console.log(1111111, items)
    const values = {
        addTab,
        onChangeTab,
        removeTab,
        onEditTab,
        activeKey,
        items,
        setTitleCurrentTab
    };

    return <TabsContext.Provider value={values}>{children}</TabsContext.Provider>;
};

export default TabsProvider;

export const useTabs = (): TabsState => {
    return useContext(TabsContext);
};