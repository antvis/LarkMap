import type { SliderRangeProps } from 'antd/lib/slider';
import { InputNumber, Slider } from 'antd';
import React from 'react';
import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import './AntdSliderRange.less';

const defaultConfig = {
  min: 0,
  max: 100,
  step: 1,
};

const AntdSliderRange: React.FC<SliderRangeProps> = (props) => {
  const prefixCls = usePrefixCls('formily-slider-range', props);
  const config = { ...defaultConfig, ...props };

  return (
    <div className={prefixCls}>
      <Slider range={true} {...config} />
      <div className={`${prefixCls}__input-number`}>
        <InputNumber
          size="small"
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
          size="small"
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

export default AntdSliderRange;
