import type { SelectProps } from 'antd';
import { Select, Tag } from 'antd';
import { isUndefined } from 'lodash-es';
import React from 'react';
import type { FieldSelectOptionType } from '../../types';

const AntdSelect: React.FC<SelectProps<string, FieldSelectOptionType>> = (props) => {
  const { options, ...prop } = props;

  return (
    <Select {...prop}>
      {options?.map((item, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Select.Option value={item.value} key={index}>
            {isUndefined(item.type) ? (
              <Tag>未知</Tag>
            ) : (
              <Tag color={item.typeColor}>{isUndefined(item.typeName) ? item.type : item.typeName}</Tag>
            )}

            {item.lable}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default AntdSelect;
