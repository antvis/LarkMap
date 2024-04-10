import { LegendIcon } from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <div>
      <LegendIcon
        labels={['枫叶图标', '火车图标', '小汽车图标']}
        icons={[
          <img src="https://gw.alipayobjects.com/mdn/rms_5e897d/afts/img/A*6ONoRKNECC0AAAAAAAAAAAAAARQnAQ" />,
          <img src="https://gw.alipayobjects.com/zos/bmw-prod/e21321e0-8f4a-474f-a0ee-2176492bb824.svg" />,
          <img src="https://gw.alipayobjects.com/zos/bmw-prod/7fb22e05-4488-4597-8e33-fc03716d2b0a.svg" />,
        ]}
      />
    </div>
  );
};
