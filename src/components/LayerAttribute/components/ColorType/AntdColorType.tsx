import type { IFieldState } from '@formily/core';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import React, { useEffect, useMemo } from 'react';

const numbeOptions = [
  {
    label: '等分位',
    value: 'quantile',
  },
  {
    label: '等间距',
    value: 'quantize',
  },
];

const booleanOptions = [
  {
    label: '枚举',
    value: 'cat',
  },
];

const AntdColorType: React.FC<SelectProps & { fillColorFieldState: IFieldState }> = (props) => {
  const { fillColorFieldState, ...prop } = props;

  console.log(props, 'cewjkghfjs');

  const Options = useMemo(() => {
    const { value, dataSource } = fillColorFieldState || {};
    const type = dataSource.find((item) => item.value === value)?.type;
    if (type === 'number') {
      return numbeOptions;
    }
    return booleanOptions;
  }, [fillColorFieldState, prop]);

  useEffect(() => {
    prop?.onChange(Options[0].value, Options);
  }, [Options]);

  return (
    <Select {...prop}>
      {Options?.map((item, index) => {
        return (
          <Select.Option value={item.value} key={index}>
            {item.label}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default AntdColorType;
