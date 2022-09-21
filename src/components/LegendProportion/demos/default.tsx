import { LegendProportion } from '@antv/larkmap';
import React from 'react';
import './index.less';

export default () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: 20 }}>
      <LegendProportion labels={[0, 2000]} fillColor="#BF7C00" className="demo_cls" />
      <LegendProportion labels={[100, 1000]} />
    </div>
  );
};
