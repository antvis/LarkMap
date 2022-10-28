import fillColorCollapse from '../common-schema/fill-color-collapse';
import type { FieldSelectOptionType } from '../types';

export default (fieldList: FieldSelectOptionType[] = [], ribbonList: string[][] = []) => {
  return {
    type: 'object',
    properties: {
      collapseItem_fillColor: fillColorCollapse('颜色', fieldList, ribbonList),
      collapseItem_fillSize: {
        type: 'void',
        'x-component': 'FormCollapse',
        'x-component-props': {
          ghost: true,
          destroyInactivePanel: true,
          defaultActiveKey: [],
        },
        properties: {
          fillSize: {
            type: 'void',
            'x-component': 'FormCollapse.CollapsePanel',
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
                title: '宽度',
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
                    fulfill: {
                      state: {
                        visible: '{{ $deps[0] === undefined }}',
                      },
                    },
                  },
                ],
              },
              sizeRange: {
                type: 'number',
                title: '宽度',
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
                    fulfill: {
                      state: {
                        visible: '{{ $deps[0] !== undefined }}',
                      },
                    },
                  },
                ],
              },

              // lineType: {
              //   type: 'string',
              //   title: '线类型',
              //   default: 'solid',
              //   enum: [
              //     {
              //       label: '实线',
              //       value: 'solid',
              //     },
              //     {
              //       label: '虚线',
              //       value: 'dash',
              //     },
              //   ],
              //   'x-decorator': 'FormItem',
              //   'x-component': 'Select',
              //   'x-component-props': {
              //     placeholder: '请选择',
              //   },
              //   'x-decorator-props': {},
              // },
            },
          },
        },
      },
    },
  };
};
