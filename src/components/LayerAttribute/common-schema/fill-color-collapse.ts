import type { FieldSelectOptionType } from '../types';

export default (fieldList: FieldSelectOptionType[] = [], ribbonList: string[][] = [], collapseTitle?: string) => {
  return {
    type: 'void',
    'x-component': 'FormCollapse',
    'x-component-props': {
      ghost: true,
      destroyInactivePanel: true,
      defaultActiveKey: [],
    },
    properties: {
      fillColor: {
        type: 'void',
        'x-component': 'FormCollapse.CollapsePanel',
        'x-component-props': {
          header: collapseTitle ? collapseTitle : '填充颜色',
        },
        properties: {
          fillColorField: {
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

          fillColorScale: {
            type: 'string',
            title: '颜色划分',
            default: 'quantize',
            enum: [
              {
                label: '等间距',
                value: 'quantize',
              },
              {
                label: '等分位',
                value: 'quantile',
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
                dependencies: ['fillColorField'],
                fulfill: {
                  state: {
                    visible: '{{ $deps[0] !== undefined }}',
                  },
                },
              },
            ],
          },
          // 颜色选择器
          fillColor: {
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
                dependencies: ['fillColorField'],
                fulfill: {
                  state: {
                    visible: '{{ $deps[0] === undefined }}',
                  },
                },
              },
            ],
          },
          // 色带
          fillColorRibbon: {
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
            'x-component-props': {},
            'x-decorator-props': {},
            enum: [...ribbonList],
            'x-reactions': [
              {
                dependencies: ['fillColorField'],
                fulfill: {
                  state: {
                    visible: '{{ $deps[0] !== undefined }}',
                  },
                },
              },
            ],
          },

          fillColorReverseOrder: {
            type: 'boolean',
            title: '倒序',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            'x-component-props': {},
            'x-decorator-props': {},
            'x-reactions': [
              {
                dependencies: ['fillColorField'],
                fulfill: {
                  state: {
                    visible: '{{ $deps[0] !== undefined }}',
                  },
                },
              },
              {
                target: 'fillColorReverseOrder',
                effects: ['onFieldInputValueChange'],
                fulfill: {
                  run: "$form.setFieldState('fillColorRibbon', state => { state.value = state.value ? [...state.value].reverse() : [] })",
                },
              },
            ],
          },

          fillColorOpacity: {
            type: 'number',
            title: '透明度',
            default: 1,
            'x-decorator-props': {},
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-component-props': {
              min: 0,
              max: 1,
              step: 0.1,
            },
          },
        },
      },
    },
  };
};
