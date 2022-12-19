import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { InputNumber } from 'antd';
import { isEmpty, isFinite } from 'lodash-es';
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
  const [sliderVal, setSliderVal] = useState<[number, number]>(
    isEmpty(props.value) ? [0, 0] : (props.value.map((item) => (isFinite(item) ? item : 0)) as [number, number]),
  );

  useEffect(() => {
    props.onChange(sliderVal);
  }, [sliderVal]);

  return (
    <div className={prefixCls}>
      <InputNumber
        size="small"
        value={sliderVal[0]}
        onChange={(val: number) => {
          const value: [number, number] = [val, sliderVal[1]];
          setSliderVal(value);
        }}
      />
      <InputNumber
        size="small"
        value={sliderVal[1]}
        onChange={(val: number) => {
          const value: [number, number] = [sliderVal[0], val];
          setSliderVal(value);
        }}
      />
    </div>
  );
};

export default AntdOffset;
