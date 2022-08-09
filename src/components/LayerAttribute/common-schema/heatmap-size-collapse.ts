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
          header: '填充大小',
        },

        properties: {
          sizeField: {
            type: 'string',
            title: '基于字段',
            'x-decorator': 'FormItem',
            'x-component': 'FieldSelect',
            'x-decorator-props': {
              tooltip: '选中一个数值字段作为填充大小',
            },
            'x-component-props': {
              allowClear: true,
              placeholder: '请选择字段',
            },
            enum: [...fieldList],
          },
          size: {
            type: 'number',
            title: '大小',
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-component-props': {
              dots: false,
              range: false,
            },
            'x-decorator-props': {},
            'x-reactions': [
              {
                dependencies: ['sizeField'],
                when: '{{$deps[0]}}',
                fulfill: {
                  state: {
                    visible: false,
                  },
                },
                otherwise: {
                  state: {
                    visible: true,
                  },
                },
              },
            ],
          },
          sizeRange: {
            type: 'number',
            title: '大小',
            'x-decorator': 'FormItem',
            'x-component': 'SliderRange',
            'x-component-props': {
              dots: false,
              range: true,
            },
            default: [0, 20],
            'x-decorator-props': {},
            'x-reactions': [
              {
                dependencies: ['sizeField'],
                when: '{{$deps[0]}}',
                fulfill: {
                  state: {
                    visible: true,
                  },
                },
                otherwise: {
                  state: {
                    visible: false,
                  },
                },
              },
            ],
          },
          sizeType: {
            type: 'string',
            title: '大小划分',
            default: 'linear',
            enum: [
              {
                label: '线性',
                value: 'linear',
              },
              {
                label: '指数',
                value: 'power',
              },
              {
                label: '对数',
                value: 'log',
              },
              {
                label: '等分位',
                value: 'quantile',
              },
              {
                label: '等间距',
                value: 'quantize',
              },
              {
                label: '枚举',
                value: 'cat',
              },
            ],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              allowClear: true,
              placeholder: '请选择划分类型',
            },
            'x-decorator-props': {},
            'x-reactions': [
              {
                dependencies: ['sizeField'],
                when: '{{$deps[0]}}',
                fulfill: {
                  state: {
                    visible: true,
                  },
                },
                otherwise: {
                  state: {
                    visible: false,
                  },
                },
              },
            ],
          },
        },
      },
    },
  };
};
