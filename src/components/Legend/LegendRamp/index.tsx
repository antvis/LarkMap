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
        {color.map((item: string) => (
          <div
            className={`${CLS_PREFIX}__equidistant__bar`}
            style={{ background: item, width: barWidth / color.length }}
            key={item}
          />
        ))}
      </div>
    );
  }

  /**
   * zoom随文字长度 -= 0.1
   * @param str
   * @returns
   */
  function setZoom(str: string | number) {
    const zoom = 1;
    return String(str).length === 1 ? zoom : zoom - String(str).length * 0.02;
  }

  const labelCell = useMemo(() => {
    const [min, max] = [labels[0], labels[labels.length - 1]];
    if (isSegment) {
      return (
        <div className={`${CLS_PREFIX}__labelSegment`}>
          {labels.map((item: string | number) => {
            return (
              <div
                key={Math.random()}
                className={`${CLS_PREFIX}__barItem`}
                style={{
                  width: barWidth / (labels.length - 1),
                  zoom: +setZoom(item),
                }}
              >
                {String(item).length > 7 ? `${String(item).substring(0, 7)}...` : item}
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
