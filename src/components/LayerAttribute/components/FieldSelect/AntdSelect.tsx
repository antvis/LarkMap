import type { SelectProps } from 'antd';
import { Select, Tag } from 'antd';
import { isUndefined } from '@antv/util';
import React from 'react';

export type FieldTypeItem = {
  type: string;
  value: string;
  color: string;
};

const FieldTypes: FieldTypeItem[] = [
  { type: 'string', value: '文本', color: 'blue' },
  { type: 'number', value: '数值', color: 'orange' },
  { type: 'coordinatePoint', value: '坐标点', color: 'cyan' },
  { type: 'coordinatePolygon', value: '坐标面', color: 'green' },
];

const AntdSelect: React.FC<SelectProps<any, any>> = (props) => {
  // @ts-ignore
  const { options, fieldTypes = FieldTypes, ...prop } = props;

  return (
    <Select {...prop}>
      {options?.map((item: Record<string, any>, index) => {
        const tagType = fieldTypes.find((fieldType: FieldTypeItem) => fieldType.type === item?.type);

        return (
          // eslint-disable-next-line react/no-array-index-key
          <Select.Option value={item.value} key={index}>
            {isUndefined(tagType) ? <Tag>文本</Tag> : <Tag color={tagType.color}>{tagType.value}</Tag>}

            {item.lable}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default AntdSelect;
