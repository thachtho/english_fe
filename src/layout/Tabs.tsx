import { Tabs } from 'antd';
import React from 'react';
import { useTabs } from '../context/tabs.context';


const TabsLayout: React.FC = () => {
  const { activeKey, items, onEditTab, onChangeTab } = useTabs();
  let newItems = items

  if (items.length === 1) {
    newItems[0].closable = false;
  } else {
    newItems = newItems.map((item) => {
      const { closable, ...props } = item;
      return { ...props }
    })
  }

  return (
    <Tabs
      hideAdd
      onChange={onChangeTab}
      activeKey={activeKey}
      type="editable-card"
      onEdit={onEditTab}
      items={newItems}
      className='mt-2 ml-2'
    />
  );
};

export default TabsLayout;