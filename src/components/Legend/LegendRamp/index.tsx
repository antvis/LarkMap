import classnames from 'classnames';
import React from 'react';
import { getGradientColors } from './../../../utils/color';
import './index.less';
import type { LegendRampProps } from './types';

export const CLS_PREFIX = 'larkmap-legend-ramp';

function getMinMax(labels) {
  let max = labels?.[labels.length - 1];
  let min = labels?.[0];
  if (!Number.isFinite(min)) {
    min = parseInt(min, 10);
  }
  if (!Number.isFinite(max)) {
    max = parseInt(max, 10);
  }
  return [min, max];
}

export function LegendRamp(props: LegendRampProps) {
  const { isContinuous, labels, colors, lableUnit, className: cls, style, barWidth, isSegment } = props;

  const colorGradient = Array.isArray(colors)
    ? colors
    : getGradientColors(colors.startColor, colors.endColor, labels.length);

  const newlabel = labels.slice(0, colorGradient.length);

  const label = getMinMax(labels);
  let [minLabel, maxLabel] = label;

  if (!isContinuous) {
    minLabel = '< ' + minLabel + lableUnit;
    maxLabel = '≥ ' + maxLabel + lableUnit;
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

  function Label() {
    return (
      <div className={`${CLS_PREFIX}__labelbar`}>
        <div>{minLabel}</div>
        <div>{maxLabel}</div>
      </div>
    );
  }

  /**
   * 连续色带
   * @param param0
   * @returns
   */
  function Continuous({ color }: Record<string, string[]>) {
    return (
      <>
        <div className={`${CLS_PREFIX}__continuous`} style={{ background: `linear-gradient(to right,${color})` }} />
        <Label />
      </>
    );
  }

  function tooltip(item: string, idx: number) {
    let title;
    switch (idx) {
      case 0:
        title = String(minLabel);
        break;
      case newlabel.length - 1:
        title = String(maxLabel);
        break;
      default:
        title = `${newlabel[idx - 1]}${lableUnit ?? ''} - ${item}${lableUnit ?? ''}`;
        break;
    }

    return title;
  }

  /**
   * 分段色带
   * @param param0
   * @returns
   */
  function DisContinuous({ color }: Record<string, string[]>) {
    return (
      <>
        <div className={`${CLS_PREFIX}__disContinuous`}>
          {newlabel?.map((item: string | number, i: number) => {
            return (
              <div
                key={Math.random()}
                className={`${CLS_PREFIX}__disContinuous__cell`}
                style={{ width: barWidth / color.length }}
              >
                <div
                  title={tooltip(item as string, i)}
                  className={`${CLS_PREFIX}__disContinuous__cell__color`}
                  style={{ background: color[i] }}
                />
                {isSegment ? (
                  <div
                    className={`${CLS_PREFIX}__disContinuous__cell__label`}
                    style={{
                      zoom: +setZoom(item),
                    }}
                  >
                    {String(item).length > 7
                      ? `${String(item).substring(0, 7)}${lableUnit ?? ''}...`
                      : `${item}${lableUnit ?? ''}`}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        {!isSegment ? <Label /> : null}
      </>
    );
  }

  return (
    <div style={{ width: barWidth, ...style }} className={classnames(`${CLS_PREFIX}`, cls)}>
      {isContinuous ? <Continuous color={colorGradient} /> : <DisContinuous color={colorGradient} />}
    </div>
  );
}

LegendRamp.defaultProps = {
  isContinuous: false,
  barWidth: 200,
  lableUnit: '',
};
