import type { SliderRangeProps } from 'antd/lib/slider/index';
import { InputNumber, Slider } from 'antd';
import React from 'react';
import styles from './AntdSlider.module.less';

const defaultConfig = {
  min: 0,
  max: 100,
  step: 1,
};

const SliderRange: React.FC<SliderRangeProps> = (props) => {
  const config = { ...defaultConfig, ...props };

  return (
    <div className={styles['box-antd-slider']}>
      <Slider range={true} {...config} />
      <div className={styles['box-ant-input-number']}>
        <InputNumber
          value={props.value[0]}
          onChange={(val) => {
            if (val) {
              if (val < props.value[1]) {
                props.onChange([val, props.value[1]]);
              } else {
                props.onChange([props.value[1], val]);
              }
            } else {
              props.onChange([0, props.value[1]]);
            }
          }}
          onBlur={() => {
            if (!props.value[0]) {
              props.onChange([0, props.value[1]]);
            }
          }}
        />
        <InputNumber
          value={props.value[1]}
          onChange={(val) => {
            if (val < props.value[0]) {
              props.onChange([val, props.value[0]]);
            } else {
              props.onChange([props.value[0], val]);
            }
          }}
          onBlur={() => {
            if (!props.value[0] && !props.value[1]) {
              props.onChange([0, 0]);
            }
          }}
        />
      </div>
    </div>
  );
};

export default SliderRange;
