import React from 'react';
import classnames from 'classnames';
import type { LegendIconProps } from './types';
import './index.less';

export const CLS_PREFIX = 'larkmap-legend-icon';

export const LegendIcon = (props: LegendIconProps) => {
  const { labels, icons, className: cls, style } = props;
  return (
    <div className={classnames(`${CLS_PREFIX}`, cls)} style={style}>
      {labels.map((item, index) => (
        <div key={item} className={`${CLS_PREFIX}_content`}>
          <img src={icons[index]} className={`${CLS_PREFIX}_content_icon`} />
          <div>{item}</div>
        </div>
      ))}
    </div>
  );
};
