import { LegendRamp } from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: 20 }}>
      <LegendRamp
        labels={[10, 20, 30, 40, 50, 60]}
        colors={[
          'rgb(239, 243, 255)',
          'rgb(198, 219, 239)',
          'rgb(158, 202, 225)',
          'rgb(107, 174, 214)',
          'rgb(49, 130, 189)',
          'rgb(8, 81, 156)',
        ]}
        barWidth={500}
        lableUnit="m"
      />
      <LegendRamp
        isContinuous
        labels={[100, 200, 300, 400, 500, 600]}
        colors={[
          'rgb(254, 235, 226)',
          'rgb(252, 197, 192)',
          'rgb(250, 159, 181)',
          'rgb(247, 104, 161)',
          'rgb(197, 27, 138)',
          'rgb(122, 1, 119)',
        ]}
      />
    </div>
  );
};
