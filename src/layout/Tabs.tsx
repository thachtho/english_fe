import { Tabs } from 'antd';
import React from 'react';
import { useTabs } from '../context/tabs.context';


const TabsLayout: React.FC = () => {
  const { activeKey, items, onEditTab, onChangeTab } = useTabs();

  return (
    <div>
      <Tabs
        hideAdd
        onChange={onChangeTab}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEditTab}
        items={items}
      />
    </div>
  );
};

export default TabsLayout;