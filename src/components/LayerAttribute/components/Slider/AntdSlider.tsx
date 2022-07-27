import { InputNumber, Slider } from 'antd';
import React from 'react';
import styles from './AntdSlider.less';

const defaultConfig = {
  min: 0,
  max: 100,
  step: 1,
};

const AntdSlider: React.FC<any> = (props) => {
  const config = { ...defaultConfig, ...props };

  return (
    <div className={styles['box-antd-slider']}>
      <Slider range={false} {...config} />
      <InputNumber
        {...config}
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
