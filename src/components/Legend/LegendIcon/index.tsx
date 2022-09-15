import React from 'react';
import styles from './index.less';

export interface LegendIconProps {
  labels: string[];
  icons: string[];
}

export const LegendIcon = (props: LegendIconProps) => {
  const { labels, icons } = props;
  return (
    <div>
      {labels.map((item, index) => (
        <div key={item} className={styles.content}>
          <img src={icons[index]} className={styles.img} />
          <div>{item}</div>
        </div>
      ))}
    </div>
  );
};
