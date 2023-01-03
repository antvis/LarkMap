import { Tooltip } from 'antd';
import classnames from 'classnames';
import React, { useMemo } from 'react';
import { getGradientColors } from './../../../utils/color';
import './index.less';
import type { LegendRampProps } from './types';

export const CLS_PREFIX = 'larkmap-legend-ramp';

export function LegendRamp(props: LegendRampProps) {
  const { isContinuous, labels, colors, lableUnit, className: cls, style, barWidth = 200, isSegment } = props;

  function Continuous({ gradient }: Record<string, string>) {
    return (
      <div className={`${CLS_PREFIX}__continuous`} style={{ background: `linear-gradient(to right,${gradient})` }} />
    );
  }

  function Equidistant({ color }: Record<string, any>) {
    return (
      <div className={`${CLS_PREFIX}__equidistant`}>
        {color.map((item: string, i: number) => (
          <Tooltip key={item} title={`${labels[i] || 0}~${labels[i + 1]}`}>
            <div
              className={`${CLS_PREFIX}__equidistant__bar`}
              style={{ background: item, width: barWidth / color.length }}
              key={item}
            />
          </Tooltip>
        ))}
      </div>
    );
  }

  const labelCell = useMemo(() => {
    const [min, max] = [labels[0], labels[labels.length - 1]];
    if (isSegment) {
      return (
        <div className={`${CLS_PREFIX}__labelSegment`}>
          {labels.map((item: any) => {
            return (
              <div
                key={Math.random()}
                className={`${CLS_PREFIX}__barItem`}
                style={{ width: barWidth / (labels.length - 1) }}
              >
                {item.length > 2 ? `${item.substring(0, 2)}...` : item}
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <div className={`${CLS_PREFIX}__labelbar`}>
        <div>{`${min}${lableUnit ?? ''} ${isContinuous ? '' : '<'}`}</div>
        <div>{`${isContinuous ? '' : '≥'} ${max}${lableUnit ?? ''}`}</div>
      </div>
    );
  }, [isContinuous, isSegment, lableUnit, labels, barWidth]);

  function Content(color: string[]) {
    const gradient = color.join(',');
    return (
      <div style={{ width: barWidth, ...style }} className={classnames(`${CLS_PREFIX}`, cls)}>
        {isContinuous ? <Continuous gradient={gradient} /> : <Equidistant color={color} />}
        {labelCell}
      </div>
    );
  }

  function Renders() {
    if (Array.isArray(colors)) {
      return Content(colors);
    }
    const colorGradient = getGradientColors(colors.startColor, colors.endColor, labels.length);
    return Content(colorGradient);
  }

  return <Renders />;
}

LegendRamp.defaultProps = {
  isContinuous: false,
  barWidth: 200,
  lableUnit: '',
  isSegment: false,
};
