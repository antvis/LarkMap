import type { SelectProps } from 'antd';
import { Select } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useMemo } from 'react';
import { DEHAULTOPTIONS } from './constants';

interface OptionType extends DefaultOptionType {
  type: 'string' | 'number';
}

export type AntdScaleSelectorProps = SelectProps<string, OptionType> & { type: 'string' | 'number' };

const AntdScaleSelector = (props: AntdScaleSelectorProps) => {
  const selectOptions = useMemo(() => {
    const options = props.options ?? DEHAULTOPTIONS;
    const type = ['string', 'number'].includes(props.type) ? props.type : 'string';
    return options.filter((item) => item.type === type);
  }, [props.type, props.options]);

  useEffect(() => {
    if (!props.value || selectOptions.findIndex((item) => item.value === props.value) === -1) {
      props?.onChange(selectOptions[0]?.value, selectOptions);
    }
  }, [selectOptions]);

  return (
    <Select {...props}>
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
