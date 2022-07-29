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
      fillColor: {
        type: 'void',
        'x-component': 'Collapse.CollapsePanel',
        'x-component-props': {
          header: '填充颜色',
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

          fillColorType: {
            type: 'string',
            title: '颜色划分',
            default: 'geometric',
            enum: [
              {
                label: '等比',
                value: 'geometric',
              },
              {
                label: '等分',
                value: 'uniform',
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
            'x-decorator-props': {},
            'x-reactions': [
              {
                dependencies: ['fillColorField'],
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
  };
};
