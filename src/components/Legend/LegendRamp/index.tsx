import React from 'react';
import classnames from 'classnames';
import type { LegendRampProps } from './types';
import './index.less';
import { getGradientColors } from './../../../utils/color';

export const CLS_PREFIX = 'larkmap-legend-ramp';

export function LegendRamp(props: LegendRampProps) {
  const { isContinuous, labels, colors, lableUnit, className: cls, style, barWidth = 200 } = props;

  function Continuous({ gradient }: Record<string, string>) {
    return (
      <div className={`${CLS_PREFIX}__continuousBar`} style={{ background: `linear-gradient(to right,${gradient})` }} />
    );
  }

  function Equidistant({ color }: Record<string, any>) {
    return (
      <div className={`${CLS_PREFIX}__equidistantBar`}>
        {color.map((item: string) => (
          <div
            className={`${CLS_PREFIX}__equidistantBar__bar`}
            style={{ background: item, width: barWidth / color.length }}
            key={item}
          />
        ))}
      </div>
    );
  }

  function Conent(color: string[]) {
    const gradient = color.join(',');
    const [min, max] = [labels[0], labels[labels.length - 1]];
    return (
      <div style={{ width: barWidth, ...style }} className={classnames(`${CLS_PREFIX}`, cls)}>
        {isContinuous ? <Continuous gradient={gradient} /> : <Equidistant color={color} />}
        <div className={`${CLS_PREFIX}__labelbar`}>
          <div>{`${min}${lableUnit ?? ''} ${isContinuous ? '' : '<'}`}</div>
          <div>{`${isContinuous ? '' : '≥'} ${max}${lableUnit ?? ''}`}</div>
        </div>
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

LegendRamp.defaultProps = {
  isContinuous: false,
  barWidth: 200,
};
