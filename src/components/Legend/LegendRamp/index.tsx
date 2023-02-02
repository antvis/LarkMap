import { useSize } from 'ahooks';
import classnames from 'classnames';
import React, { useRef } from 'react';
import './index.less';
import type { LegendRampProps } from './types';

export const CLS_PREFIX = 'larkmap-legend-ramp';

const getMinMax = (labels: (string | number)[]) => {
  let max = labels[labels.length - 1];
  let min = labels[0];

  if (!Number.isFinite(min)) {
    min = parseInt(min as string, 10);
  }
  if (!Number.isFinite(max)) {
    max = parseInt(max as string, 10);
  }
  return [min, max];
};

function Continuous({
  labels,
  labelUnit = '',
  colors,
}: {
  labels: (string | number)[];
  labelUnit: string;
  colors: string[];
}) {
  const minLabel = labels[0] + labelUnit;
  const maxLabel = labels[labels.length - 1] + labelUnit;

  return (
    <>
      <div className={`${CLS_PREFIX}__continuous`} style={{ background: `linear-gradient(to right,${colors})` }} />
      <div className={`${CLS_PREFIX}__continuous-labelbar`}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </>
  );
}

function DisContinuous({
  labels,
  labelUnit = '',
  colors,
}: {
  labels: (string | number)[];
  labelUnit: string;
  colors: string[];
}) {
  const containerRef = useRef(null);
  const containerSize = useSize(containerRef);
  const stepWidth = containerSize?.width / (colors.length + 1);

  // right labels is labels.length = colors.length + 1
  const rightLabels = labels;

  // 当两端处于无穷最大最小时，比如 < 10、10 - 20、≥ 20
  if (labels.length + 1 === colors.length) {
    const minLabel = '< ' + labels[0];
    const maxLabel = '≥ ' + labels[labels.length - 1];
    rightLabels.unshift(minLabel);
    rightLabels.push(maxLabel);
  }

  const tooltip = (idx: number) => {
    const title = `${labels[idx]}${labelUnit} - ${labels[idx + 1]}${labelUnit}`;
    return title;
  };

  return (
    <div className={`${CLS_PREFIX}__dis-continuous`} ref={containerRef}>
      {Number.isNaN(stepWidth) ? null : (
        <>
          <div className={`${CLS_PREFIX}__dis-continuous__colors`} style={{ paddingLeft: stepWidth / 2 }}>
            {colors?.map((item, i) => {
              return (
                <div
                  key={item}
                  title={tooltip(i)}
                  className={`${CLS_PREFIX}__dis-continuous__color`}
                  style={{ background: item, width: stepWidth }}
                />
              );
            })}
          </div>
          <div className={`${CLS_PREFIX}__dis-continuous__labels`}>
            {labels?.map((item) => {
              const label = item + labelUnit;
              return (
                <span key={item} className={`${CLS_PREFIX}__dis-continuous__label`}>
                  {label}
                </span>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export function LegendRamp(props: LegendRampProps) {
  const { isContinuous, labels, colors, labelUnit, className: cls, style } = props;

  // const [min, max] = getMinMax(labels);
  // const isError = Number.isNaN(min) || Number.isNaN(max);
  // 传入错误数据情况处理 TODO

  return (
    <div className={classnames(`${CLS_PREFIX}`, cls)} style={style}>
      {isContinuous ? (
        <Continuous labels={labels} labelUnit={labelUnit} colors={colors} />
      ) : (
        <DisContinuous labels={labels} labelUnit={labelUnit} colors={colors} />
      )}
    </div>
  );
}

LegendRamp.defaultProps = {
  isContinuous: false,
  labelUnit: '',
};
