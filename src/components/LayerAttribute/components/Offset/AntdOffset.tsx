import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import './AntdOffset.less';

export interface AntdOffsetProps {
  /**
   * 偏移量
   */
  value?: [number, number];
  /**
   * 选择发生改变时
   */
  onChange?: (value: [number, number]) => void;
}

const AntdOffset: React.FC<AntdOffsetProps> = (props) => {
  const prefixCls = usePrefixCls('formily-offset');
  const [sliderVal, setSliderVal] = useState<[number, number]>(props.value ?? [0, 0]);

  useEffect(() => {
    props.onChange(sliderVal);
  }, [sliderVal]);

  return (
    <div className={prefixCls}>
      <InputNumber
        {...props}
        size="small"
        value={sliderVal[0]}
        onChange={(val) => {
          const value: [number, number] = [val, Number(sliderVal[1])];
          setSliderVal(value);
        }}
      />
      <InputNumber
        {...props}
        size="small"
        value={sliderVal[1]}
        onChange={(val) => {
          const value: [number, number] = [sliderVal[0], Number(val)];
          setSliderVal(value);
        }}
      />
    </div>
  );
};

export default AntdOffset;
