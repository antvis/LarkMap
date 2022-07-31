import type { SliderSingleProps } from 'antd/lib/slider';
import { InputNumber, Slider } from 'antd';
import React from 'react';
import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import './AntdSlider.less';

const defaultConfig = {
  min: 0,
  max: 100,
  step: 1,
};

const AntdSlider: React.FC<SliderSingleProps> = (props) => {
  const prefixCls = usePrefixCls('formily-slider', props);
  const config = { ...defaultConfig, ...props };

  return (
    <div className={prefixCls}>
      <Slider range={false} {...config} value={config.value ?? 0} />
      <InputNumber
        min={config.min}
        max={config.max}
        step={config.step}
        value={config.value ?? 0}
        onChange={config.onChange}
        onBlur={() => {
          if (!props.value) {
            props.onChange(0);
          }
        }}
      />
    </div>
  );
};

export default AntdSlider;
