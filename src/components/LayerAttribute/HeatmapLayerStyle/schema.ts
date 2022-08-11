import type { FieldItem } from '../types';
export default (fieldList: FieldItem[] = []) => {
  return {
    type: 'object',
    properties: {
      color: {
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
              header: '热力颜色',
            },
            properties: {
              // 色带
              colors: {
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
              },
              colorsReverseOrder: {
                type: 'boolean',
                title: '倒序',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                'x-component-props': {},
                'x-decorator-props': {},
                'x-reactions': [
                  {
                    target: 'colorsReverseOrder',
                    effects: ['onFieldInputValueChange'],
                    fulfill: {
                      run: "$form.setFieldState('colors', state => { state.value = state.value ? [...state.value].reverse() : [] })",
                    },
                  },
                ],
              },

              opacity: {
                type: 'number',
                title: '透明度',
                default: 1,
                'x-decorator-props': {},
                'x-decorator': 'FormItem',
                'x-component': 'Slider',
                'x-component-props': {
                  max: 1,
                  step: 0.1,
                },
              },
            },
          },
        },
      },

      // 半径
      radius: {
        type: 'void',
        'x-component': 'Collapse',
        'x-component-props': {
          ghost: true,
          destroyInactivePanel: true,
          defaultActiveKey: [],
        },
        properties: {
          radius: {
            type: 'void',
            'x-component': 'Collapse.CollapsePanel',
            'x-component-props': {
              header: '热力半径',
            },
            properties: {
              radius: {
                type: 'number',
                title: '半径',
                default: 20,
                'x-decorator-props': {},
                'x-decorator': 'FormItem',
                'x-component': 'Slider',
                'x-component-props': {
                  max: 30,
                  min: 0,
                  step: 1,
                },
              },
            },
          },
        },
      },

      // 权重
      collapseItem_fillSize: {
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
      },
    },
  };
};
