import { CustomControl, LegendCategories } from '@antv/larkmap';
import React from 'react';
import { legendItems } from './constants';

const Legend = () => {
  return (
    <CustomControl position="bottomright" style={{ background: '#fff', width: '160px' }}>
      <LegendCategories
        style={{ background: '#fff', padding: 8 }}
        colors={legendItems.map((item) => item.color)}
        labels={legendItems.map((item) => item.label)}
      />
    </CustomControl>
  );
};

export default Legend;
