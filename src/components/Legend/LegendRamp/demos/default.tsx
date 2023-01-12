import { LegendRamp } from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: 20 }}>
      <LegendRamp
        colors={[
          'rgb(254, 235, 226)',
          'rgb(252, 197, 192)',
          'rgb(250, 159, 181)',
          'rgb(247, 104, 161)',
          'rgb(197, 27, 138)',
          'rgb(122, 1, 119)',
        ]}
        labels={[10, 20, 30, 40, 50, 60, 70]}
        barWidth={250}
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
      <LegendRamp
        barWidth={400}
        colors={['#ffd8bf', '#ffbb96', '#ff9c6e', '#ff7a45', '#fa541c']}
        labels={['-85.34', '-23.34', '1.23', '12.33', '54.68', '78.8']}
        lableUnit="%"
        isSegment
      />
    </div>
  );
};
