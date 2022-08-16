import type { SliderSingleProps } from 'antd/lib/slider';
import { InputNumber, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
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

  const [sliderVal, setSliderVal] = useState<number>(config.value ?? 0);

  useEffect(() => {
    props.onChange(sliderVal);
  }, [sliderVal]);

  return (
    <div className={prefixCls}>
      <Slider
        range={false}
        {...config}
        value={sliderVal}
        onChange={(val) => {
          setSliderVal(val);
        }}
      />
      <InputNumber
        min={config.min}
        max={config.max}
        step={config.step}
        value={sliderVal}
        onChange={(val) => {
          setSliderVal(val);
        }}
        onBlur={() => {
          if (!props.value) {
            setSliderVal(0);
          }
        }}
      />
    </div>
  );
};

export default AntdSlider;
