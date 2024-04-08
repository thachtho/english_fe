import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const defaultPanes = [
    { label: 'Home', key: '/' }
];


interface Item {
    label: string;
    key: string;
    search?: string
}
interface TabsState {
    items: Item[],
    activeKey: string,
    onChangeTab: (key: string) => void,
    addTab: (data: Item) => void,
    removeTab: (targetKey: TargetKey) => void
    onEditTab: (targetKey: TargetKey, action: 'add' | 'remove') => void,
    setTitleCurrentTab: (title: string) => void
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
    const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
    const [items, setItems] = useState(defaultPanes);

    const onChangeTab = (key: string) => {
        navigation(`${key}`)
        setActiveKey(key);
      };
    
      const addTab = ({ label, key, search }: Item) => {
        if (search && search?.length !== 0) {
            key = `${key}${search}`
        }
        const isExit = items.find((item) => item.key === key);

        if (!isExit) {
            setItems([...items, { label, key }]);
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

      const setTitleCurrentTab = (title: string) => {
        const getKeyActive = () =>  new Promise((resolve, reject) => {
            setActiveKey((prev1) => {
                resolve(prev1)
                return prev1
            })
        })
        setTimeout( async () => {
            const newKeyActive = await getKeyActive();

            setItems((items) => {
                const tab = items.find((item) => item.key === newKeyActive)

                if (tab) {
                    tab.label = `${tab?.label} ${title}`
                }

                return [...items]
            })
        }, 1000);
      }

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