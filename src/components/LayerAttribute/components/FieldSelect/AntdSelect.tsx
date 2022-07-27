import type { SelectProps } from 'antd';
import { Select, Tag } from 'antd';
import { isEmpty } from '@antv/util';
import React from 'react';

export type FieldTypeItem = {
  type: string;
  value: string;
  color: string;
};

const FieldType: FieldTypeItem[] = [
  { type: 'string', value: '文本', color: 'blue' },
  { type: 'number', value: '数值', color: 'orange' },
  { type: 'coordinatePoint', value: '坐标点', color: 'cyan' },
  { type: 'polygon', value: '坐标面', color: 'green' },
];

const AntdSelect: React.FC<SelectProps<any, any>> = (props) => {
  // @ts-ignore
  const { options, fieldType = FieldType, ...prop } = props;

  return (
    <Select {...prop}>
      {options?.map((item: Record<string, any>) => {
        const tagObj = fieldType.filter((items: FieldTypeItem) => items.type === item?.type);

        return (
          <Select.Option value={item.value} key={item.value}>
            {!isEmpty(tagObj) && <Tag color={tagObj[0].color}>{tagObj[0].value}</Tag>}
            {isEmpty(tagObj) && <Tag>文本</Tag>}

            {item.lable}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default AntdSelect;
