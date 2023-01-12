import classnames from 'classnames';
import React from 'react';
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

  console.log('color', colors, labels);
  const newlabel = labels;

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
    const styles = labels.length !== colors.length;
    return (
      <div
        className={`${CLS_PREFIX}__labelbar`}
        style={{
          width: styles ? barWidth - barWidth / labels.length : 'auto',
        }}
      >
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
  function Continuous() {
    return (
      <>
        <div className={`${CLS_PREFIX}__continuous`} style={{ background: `linear-gradient(to right,${colors})` }} />
        <Label />
      </>
    );
  }

  function tooltip(idx: number) {
    const title = `${newlabel[idx]}${lableUnit ?? ''} - ${newlabel[idx + 1]}${lableUnit ?? ''}`;
    return title;
  }

  /**
   * 分段色带
   * @param param0
   * @returns
   */
  function DisContinuous() {
    return (
      <>
        <div className={`${CLS_PREFIX}__disContinuous`}>
          <div className={`${CLS_PREFIX}__disContinuous__cell`}>
            {colors?.map((item: string | number, i: number) => {
              return (
                <div
                  key={Math.random()}
                  title={tooltip(i)}
                  className={`${CLS_PREFIX}__disContinuous__cell__color`}
                  style={{ background: item, width: barWidth / labels.length }}
                />
              );
            })}
          </div>
          {isSegment ? (
            <div className={`${CLS_PREFIX}__disContinuous__cell`}>
              {labels?.map((item: string | number) => {
                return (
                  <div
                    key={item}
                    className={`${CLS_PREFIX}__disContinuous__cell__label`}
                    style={{ zoom: +setZoom(item), width: barWidth / labels.length }}
                  >
                    {String(item).length > 7
                      ? `${String(item).substring(0, 7)}${lableUnit ?? ''}...`
                      : `${item}${lableUnit ?? ''}`}
                  </div>
                );
              })}
            </div>
          ) : (
            <Label />
          )}
        </div>
      </>
    );
  }

  return (
    <div style={{ width: barWidth, ...style }} className={classnames(`${CLS_PREFIX}`, cls)}>
      {isContinuous ? <Continuous /> : <DisContinuous />}
    </div>
  );
}

LegendRamp.defaultProps = {
  isContinuous: false,
  barWidth: 200,
  lableUnit: '',
};
