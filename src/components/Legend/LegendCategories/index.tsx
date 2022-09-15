import React from 'react';
import classnames from 'classnames';
import { getGradientColors } from '../utils/color';
import styles from './index.less';

export interface LegendCategoriesProps {
  geometryType?: 'circle' | 'square';
  labels: string[];
  colors: string[] | { startColor: string; endColor: string };
  isStrokeColor?: boolean;
}

export function LegendCategories(props: LegendCategoriesProps) {
  const { labels, colors, geometryType = 'circle', isStrokeColor } = props;

  function getColor(item: string) {
    return isStrokeColor ? { border: `2px solid ${item}` } : { background: item };
  }
  function Conent(color: string[]) {
    return (
      <div>
        {labels.map((item, index) => (
          <div className={styles.cotent} key={item}>
            <div
              className={classnames(styles.shape, {
                [styles[geometryType]]: geometryType,
              })}
              style={getColor(color[index])}
            />
            <div className={styles.labels}>{item}</div>
          </div>
        ))}
      </div>
    );
  }
  function Renders() {
    if (Array.isArray(colors)) {
      return Conent(colors);
    }
    const colorGradient = getGradientColors(colors.startColor, colors.endColor, labels.length);
    return Conent(colorGradient);
  }
  return <Renders />;
}
