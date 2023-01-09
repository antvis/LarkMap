import type { Scene } from '@antv/l7';
import { CustomControl, FullscreenControl, LarkMap } from '@antv/larkmap';
import { Button, ConfigProvider, message, Tooltip } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

export default () => {
  const [scene, setScene] = useState<Scene | null>(null);

  const getContainer = useCallback(() => {
    return scene?.getContainer() ?? document.body;
  }, [scene]);

  useEffect(() => {
    // 修正 message 框的挂载 DOM
    message.config({
      getContainer,
    });
  }, [getContainer]);

  return (
    // 修正 Dropdown、Tooltip、Popover 弹出框的挂载 DOM
    <ConfigProvider getPopupContainer={getContainer}>
      <LarkMap mapType="Gaode" style={{ height: '400px' }} onSceneLoaded={setScene}>
        <FullscreenControl />

        <CustomControl position="topright">
          <Tooltip overlay="我是自定义 Tooltip" placement="left">
            <Button>tooltip</Button>
          </Tooltip>
        </CustomControl>

        <CustomControl position="topright">
          <Button
            onClick={() => {
              message.info('我是自定义 message');
            }}
          >
            message
          </Button>
        </CustomControl>
      </LarkMap>
    </ConfigProvider>
  );
};
