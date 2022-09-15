import React from 'react';
import { isNumber, isNaN, uniqueId } from 'lodash';
import styles from './index.less';

export interface LegendProportionProp {
  labels: number[];
  fillColor?: string;
}

export const LegendProportion = (props: LegendProportionProp) => {
  const { labels, fillColor = '#999' } = props;
  const [min, max] = labels;
  const circleSize = [77, 52, 38, 24];

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
      <div className={styles.circlebox}>
        {circleSize.map((item) => (
          <div
            key={item}
            style={{ width: item, height: item, background: fillColor }}
            className={styles.circleboxitem}
          />
        ))}
      </div>
    );
  }

  function LabelBox() {
    return (
      <div>
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
    <div className={styles.proporation}>
      <CircleBox />
      <LabelBox />
    </div>
  );
};
