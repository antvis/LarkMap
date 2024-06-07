import React from 'react';
import classnames from 'classnames';
import { getGradientColors } from '../../../utils/color';
import './index.less';
import type { LegendCategoriesProps } from './types';

export const CLS_PREFIX = 'larkmap-legend-category';

export function LegendCategories(props: LegendCategoriesProps) {
  const { labels, colors, geometryType = 'circle', isStrokeColor, style, className: cls_name } = props;

  function getColor(item: string) {
    return isStrokeColor ? { border: `2px solid ${item}` } : { background: item };
  }

  function Conent(color: string[]) {
    return (
      <div className={classnames(CLS_PREFIX, cls_name)} style={style}>
        {labels.map((item, index) => (
          <div className={`${CLS_PREFIX}__content`} key={`${item}__${color[index]}__${index}`}>
            <div
              className={classnames(`${CLS_PREFIX}__content__shape`, {
                [`${CLS_PREFIX}__content__${geometryType}`]: geometryType,
              })}
              style={getColor(color[index])}
            />
            <div className={`${CLS_PREFIX}labels`}>{item}</div>
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

LegendCategories.defaultProps = {
  geometryType: 'circle',
  isStrokeColor: false,
};
