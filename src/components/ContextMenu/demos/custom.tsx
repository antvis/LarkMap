import { ContextMenu, LarkMap } from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <LarkMap mapType="Gaode" style={{ height: '300px' }}>
      <ContextMenu style={{ padding: 10 }}>
        <div>面板内容</div>
      </ContextMenu>
    </LarkMap>
  );
};
