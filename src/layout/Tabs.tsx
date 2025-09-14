import { Tabs } from 'antd';
import React from 'react';
import { useTabs } from '../common/context/tabs.context';


const TabsLayout: React.FC = () => {
  const { activeKey, items, onEditTab, onChangeTab } = useTabs();
  let newItems: any = items

  if (items.length === 1) {
    newItems[0].closable = false;
  } else {
    newItems = newItems.map((item: any) => {
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