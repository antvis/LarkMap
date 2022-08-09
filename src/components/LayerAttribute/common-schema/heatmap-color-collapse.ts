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
      color: {
        type: 'void',
        'x-component': 'Collapse.CollapsePanel',
        'x-component-props': {
          header: '填充颜色',
        },
        properties: {
          colorField: {
            type: 'string',
            title: '填充字段',
            'x-decorator': 'FormItem',
            'x-component': 'FieldSelect',
            'x-decorator-props': {
              tooltip: '选中一个数值字段作为颜色填充字段',
            },
            'x-component-props': {
              allowClear: true,
              placeholder: '请选择字段',
            },
            enum: [...fieldList],
          },

          colorType: {
            type: 'string',
            title: '颜色划分',
            default: 'quantile',
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
              placeholder: '请选择',
            },
            'x-decorator-props': {},
            'x-reactions': [
              {
                dependencies: ['colorField'],
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
          // 颜色选择器
          color: {
            type: 'string',
            title: '颜色',
            default: '#F7664E',
            'x-decorator': 'FormItem',
            'x-component': 'ColorPicker',
            'x-component-props': {
              placeholder: '颜色',
            },
            'x-decorator-props': {},
            'x-reactions': [
              {
                dependencies: ['colorField'],
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
          // 色带
          colorRibbon: {
            type: 'string',
            title: '颜色',
            default: [
              'rgb(247, 251, 255)',
              'rgb(222, 235, 247)',
              'rgb(198, 219, 239)',
              'rgb(158, 202, 225)',
              'rgb(107, 174, 214)',
              'rgb(66, 146, 198)',
              'rgb(33, 113, 181)',
              'rgb(8, 81, 156)',
              'rgb(8, 48, 107)',
            ],
            'x-decorator': 'FormItem',
            'x-component': 'RibbonSelect',
            'x-decorator-props': {},
            'x-reactions': [
              {
                dependencies: ['colorField'],
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

          colorReverseOrder: {
            type: 'boolean',
            title: '倒序',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            'x-component-props': {},
            'x-decorator-props': {},
            'x-reactions': [
              {
                dependencies: ['colorField'],
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
              {
                target: 'colorReverseOrder',
                effects: ['onFieldInputValueChange'],
                fulfill: {
                  run: "$form.setFieldState('colorRibbon', state => { state.value = state.value ? [...state.value].reverse() : [] })",
                },
              },
            ],
          },
        },
      },
    },
  };
};
