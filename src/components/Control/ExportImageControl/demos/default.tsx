import { LarkMap, ExportImageControl } from '@antv/larkmap';
import React from 'react';

export default () => {
  const onExport = (value: string) => {
    console.log(value);
  };
  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <ExportImageControl onExport={onExport} />
    </LarkMap>
  );
};
