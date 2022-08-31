import type { SelectProps } from 'antd';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import { DEFAULT_RIBBON_LIST } from './constants';
import './index.less';

export type AntdRibbonSelectProps = SelectProps<string[], string[]>;

// 选择色带的自定义组件
const AntdRibbonSelect = (props: AntdRibbonSelectProps) => {
  const prefixCls = usePrefixCls('formily-ribbon-select', props);
  const [valueIndex, setValueIndex] = useState(0);
  const [colorReverse, setColorReverse] = useState(false);
  const ribbonList = props.options && props.options.length ? props.options : DEFAULT_RIBBON_LIST;

  useEffect(() => {
    if (props.value) {
      // 正序
      const index = ribbonList.findIndex((item) => {
        return item.toString() === props.value.toString();
      });
      if (index !== -1) {
        setColorReverse(false);
        setValueIndex(index);
        return;
      }
      //倒叙
      const colorReverseIndex = ribbonList.findIndex((item) => {
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
      showArrow={false}
      className={prefixCls}
      onChange={(index) => {
        const value = colorReverse ? [...ribbonList[index]].reverse() : ribbonList[index];
        props?.onChange(value, value);
      }}
      value={valueIndex}
    >
      {ribbonList.map((item, index) => {
        const colorList = colorReverse ? [...item].reverse() : item;
        return (
          <Select.Option key={index} value={index}>
            <div className={`${prefixCls}__selection-item`}>
              {colorList.map((color) => (
                <span
                  key={color}
                  style={{
                    backgroundColor: color,
                    height: '22px',
                    width: `${100 / colorList.length}%`,
                  }}
                />
              ))}
            </div>
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default AntdRibbonSelect;
