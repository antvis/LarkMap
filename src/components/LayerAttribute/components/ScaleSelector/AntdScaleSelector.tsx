import type { SelectProps } from 'antd';
import { Select } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useMemo } from 'react';

interface OptionType extends DefaultOptionType {
  type: 'string' | 'number';
}

export type AntdScaleSelectorProps = SelectProps<string, OptionType> & { type: 'string' | 'number' };

const AntdScaleSelector = (props: AntdScaleSelectorProps) => {
  const { type, options, ...othersProps } = props;

  const selectOptions = useMemo(() => {
    return options.filter((item) => item.type === type);
  }, [type, options]);

  useEffect(() => {
    if (!othersProps.value || selectOptions.findIndex((item) => item.value === othersProps.value) === -1) {
      othersProps?.onChange(selectOptions[0]?.value, selectOptions);
    }
  }, [selectOptions]);

  return (
    <Select {...othersProps}>
      {selectOptions?.map((item, index) => {
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
