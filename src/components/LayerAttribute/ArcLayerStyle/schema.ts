import type { FieldSelectOptionType } from '../types';

export default (fieldList: FieldSelectOptionType[] = [], ribbonList: string[][] = []) => {
  return {
    type: 'object',
    properties: {
      collapseItem_fillColor: {
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
                    fulfill: {
                      state: {
                        visible: '{{ $deps[0] !== undefined }}',
                      },
                    },
                  },
                ],
              },
              // 颜色选择器
              sourceColor: {
                title: '起点颜色',
                type: 'string',
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
              targetColor: {
                type: 'string',
                title: '终点颜色',
                default: '#5B8FF9',
                'x-decorator': 'FormItem',
                'x-component': 'ColorPicker',
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
      },

      collapseItem_fillSize: {
        type: 'void',
        'x-component': 'Collapse',
        'x-component-props': {
          ghost: true,
          destroyInactivePanel: true,
          defaultActiveKey: [],
        },
        properties: {
          fillSize: {
            type: 'void',
            'x-component': 'Collapse.CollapsePanel',
            'x-component-props': {
              header: '线宽',
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
                title: '半径',
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
                title: '半径',
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
            },
          },
        },
      },
    },
  };
};
