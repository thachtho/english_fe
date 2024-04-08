import { Tabs } from 'antd';
import React from 'react';
import { useTabs } from '../context/tabs.context';


const TabsLayout: React.FC = () => {
  const { activeKey, items, onEditTab, onChangeTab } = useTabs();

  return (
    <Tabs
      hideAdd
      onChange={onChangeTab}
      activeKey={activeKey}
      type="editable-card"
      onEdit={onEditTab}
      items={items}
      className='mt-2 ml-2'
    />
  );
};

export default TabsLayout;