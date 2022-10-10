import { LegendCategories } from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', gap: 20 }}>
      <LegendCategories
        isStrokeColor
        labels={['Category a', 'Category B', 'Category C']}
        colors={{ startColor: 'rgb(176, 242, 188)', endColor: 'rgb(37, 125, 152)' }}
      />
      <LegendCategories
        geometryType="circle"
        labels={['Category a', 'Category B', 'Category C']}
        colors={['#f0f723', '#f8a53c', '#d8586a']}
      />
      <LegendCategories
        geometryType="square"
        isStrokeColor
        labels={['Category a', 'Category B', 'Category C']}
        colors={['#f0f723', '#f8a53c', '#d8586a']}
      />

      <LegendCategories
        geometryType="square"
        labels={['Category a', 'Category B', 'Category C']}
        colors={['#f0f723', '#f8a53c', '#d8586a']}
      />
    </div>
  );
};
