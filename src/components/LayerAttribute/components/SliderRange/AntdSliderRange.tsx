import type { SliderRangeProps } from 'antd/lib/slider';
import { InputNumber, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
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
  const [sliderVal, setSliderVal] = useState<[number, number]>(config.value ?? [0, 0]);

  useEffect(() => {
    props.onChange(sliderVal);
  }, [sliderVal]);

  return (
    <div className={prefixCls}>
      <Slider
        range={true}
        {...config}
        onChange={(val) => {
          setSliderVal(val);
        }}
      />
      <div className={`${prefixCls}__input-number`}>
        <InputNumber
          size="small"
          value={sliderVal[0]}
          onChange={(val) => {
            if (val) {
              if (val < sliderVal[1]) {
                setSliderVal([val, sliderVal[1]]);
              } else {
                setSliderVal([sliderVal[1], val]);
              }
            } else {
              setSliderVal([0, sliderVal[1]]);
            }
          }}
          onBlur={() => {
            if (!sliderVal[0]) {
              setSliderVal([0, sliderVal[1]]);
            }
          }}
        />
        <InputNumber
          size="small"
          value={sliderVal[1]}
          onChange={(val) => {
            if (val < sliderVal[0]) {
              setSliderVal([val, sliderVal[0]]);
            } else {
              setSliderVal([sliderVal[0], val]);
            }
          }}
          onBlur={() => {
            if (!sliderVal[0] && !sliderVal[1]) {
              setSliderVal([0, 0]);
            }
          }}
        />
      </div>
    </div>
  );
};

export default AntdSliderRange;
