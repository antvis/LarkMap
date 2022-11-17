import { CustomControl, LarkMap } from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <LarkMap mapType="GaodeV1" style={{ height: '400px' }}>
      <CustomControl
        position="topleft"
        className="custom-control-class"
        style={{ background: '#fff', borderRadius: 4, overflow: 'hidden', padding: 16 }}
      >
        <h1 style={{ marginBottom: 0 }}>自定义内容</h1>
      </CustomControl>
    </LarkMap>
  );
};
