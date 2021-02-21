import React, { useState } from 'react';
import { Drawer, Button } from 'antd';

export default function Sidebar({ children }) {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>Settings</Button>
      <Drawer
        title="Settings"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        {children}
      </Drawer>
    </>
  );
}
