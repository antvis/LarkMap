import React from 'react';
import { isNumber, isNaN, uniqueId } from 'lodash';
import classnames from 'classnames';
import type { LegendProportionProp } from './types';
import './index.less';

export const CLS_PREFIX = 'larkmap-legend-proportion';

export const LegendProportion = (props: LegendProportionProp) => {
  const { labels, fillColor = '#f9f9f9', className: cls, style } = props;
  const [min, max] = labels;
  const circleSizes = [86, 62, 38, 24];
  /**
   * 计算跨度
   * @param min 最小值
   * @param max 最大值
   * @returns
   */
  function calculateSteps(newMin: number, newMax: number) {
    const gap = (newMax - newMin) / 4;
    const step1 = Math.floor(newMin + gap);
    const step2 = Math.floor(newMax - gap);
    return [step1, step2];
  }

  /**
   * 生成label范围
   * @returns
   */
  function generateRange() {
    let newMin = min,
      newMax = max;
    if (!isNumber(newMin) || !isNumber(newMin)) {
      newMin = newMax = 0;
    }
    if (isNaN(newMin)) {
      newMin = 0;
    }

    if (isNaN(newMax)) {
      newMax = 0;
    }

    const steps = calculateSteps(newMin, newMax);
    const range = [{ prefix: 'MIN:', val: newMin }, ...steps, { prefix: 'MAX:', val: newMax }];
    return range;
  }

  function CircleBox() {
    return (
      <div className={`${CLS_PREFIX}_circlebox`} style={{ width: circleSizes[0] }}>
        {circleSizes.map((item) => (
          <div
            key={item}
            style={{ width: item, height: item, background: fillColor }}
            className={`${CLS_PREFIX}_circlebox_item`}
          />
        ))}
      </div>
    );
  }

  function LabelBox() {
    return (
      <div style={{ height: circleSizes[0] }}>
        {generateRange()
          .reverse()
          .map((item: any) => (
            <div key={uniqueId()}>
              {item?.prefix}
              {typeof item === 'number' ? item : item.val}
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className={classnames(`${CLS_PREFIX}`, cls)} style={style}>
      <CircleBox />
      <LabelBox />
    </div>
  );
};
