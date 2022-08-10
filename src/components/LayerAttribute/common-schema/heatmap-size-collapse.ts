import type { FieldItem } from '../types';

export default (fieldList: FieldItem[] = []) => {
  return {
    type: 'void',
    'x-component': 'Collapse',
    'x-component-props': {
      ghost: true,
      destroyInactivePanel: true,
      defaultActiveKey: [],
    },
    properties: {
      fillsize: {
        type: 'void',
        'x-component': 'Collapse.CollapsePanel',
        'x-component-props': {
          header: '权重',
        },

        properties: {
          sizeField: {
            type: 'string',
            title: '权重字段',
            'x-decorator': 'FormItem',
            'x-component': 'FieldSelect',
            'x-decorator-props': {
              tooltip: '选中一个数值字段作为热力计算',
            },
            'x-component-props': {
              allowClear: true,
              placeholder: '请选择字段',
            },
            enum: [...fieldList],
          },
          intensity: {
            type: 'number',
            title: '热力强度',
            default: 1,
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-component-props': {
              dots: false,
              range: false,
              min: 1,
              max: 5,
            },
            'x-decorator-props': {},
          },
        },
      },
    },
  };
};
