import classnames from 'classnames';
import React from 'react';
import './index.less';
import type { LegendIconProps, LegendIcons } from './types';

export const CLS_PREFIX = 'larkmap-legend-icon';

export const LegendIcon = (props: LegendIconProps) => {
  const { labels, icons, className: cls, style } = props;

  const renderIcon = (icon: LegendIcons) => {
    if (React.isValidElement(icon)) {
      return icon;
    } else if (typeof icon === 'string') {
      return <img src={icon} />;
    }
  };

  return (
    <div className={classnames(`${CLS_PREFIX}`, cls)} style={style}>
      {labels.map((item, index) => (
        <div key={item} className={`${CLS_PREFIX}__content`}>
          {renderIcon(icons[index])}
          <div>{item}</div>
        </div>
      ))}
    </div>
  );
};
