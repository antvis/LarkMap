import type { SelectProps } from 'antd';
import { Select } from 'antd';
import React, { useEffect, useMemo } from 'react';

const AntdScaleSelector: React.FC<SelectProps & { type: string }> = (props) => {
  const { type, options, ...prop } = props;

  const Options = useMemo(() => {
    return options[type] ?? options.default;
  }, [type, options, prop]);

  useEffect(() => {
    if (!prop.value || Options.findIndex((item) => item.value === prop.value) === -1) {
      prop?.onChange(Options[0]?.value, Options);
    }
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

export default AntdScaleSelector;
