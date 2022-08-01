import type { SelectProps } from 'antd';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { FIELD_COLOR_MAP } from './constants';
import './index.less';

// 选择色带的自定义组件
const AntdRibbonSelect = (props: SelectProps<any, any>) => {
  const prefixCls = usePrefixCls('formily-ribbon-select', props);
  const [valueIndex, setValueIndex] = useState(0);
  const [colorReverse, setColorReverse] = useState(false);

  useEffect(() => {
    if (props.value) {
      // 正序
      const index = FIELD_COLOR_MAP.findIndex((item) => {
        return item.toString() === props.value.toString();
      });
      if (index !== -1) {
        setColorReverse(false);
        setValueIndex(index);
        return;
      }
      //倒叙
      const colorReverseIndex = FIELD_COLOR_MAP.findIndex((item) => {
        return [...item].reverse().toString() === props.value.toString();
      });
      if (colorReverseIndex !== -1) {
        setColorReverse(true);
        setValueIndex(colorReverseIndex);
        return;
      }
      // 正向查找与反向查找均没有默认选择
      setValueIndex(0);
    }
  }, [props.value]);

  return (
    <Select
      bordered={false}
      showArrow={false}
      className={prefixCls}
      onChange={(e) => {
        const res = colorReverse ? [...FIELD_COLOR_MAP[e]].reverse() : FIELD_COLOR_MAP[e];
        // @ts-ignore
        props?.onChange(res);
      }}
      value={valueIndex}
    >
      {FIELD_COLOR_MAP.map((item, index) => {
        const colorList = colorReverse ? [...item].reverse() : item;
        return (
          <Select.Option key={index} value={index}>
            {colorList.map((color) => (
              <span
                key={color}
                style={{
                  backgroundColor: color,
                  display: 'inline-block',
                  height: '100%',
                  width: '11.11%',
                  overflow: 'hidden',
                }}
              />
            ))}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default AntdRibbonSelect;
