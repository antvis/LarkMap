import heatmapColorCollapse from '../common-schema/heatmap-color-collapse';
import heatmapSize from '../common-schema/heatmap-size-collapse';
import type { FieldItem, ShapeItem } from '../types';
import { HEATMAP_SHAPE_LIST } from './helper';

export default (fieldList: FieldItem[] = [], shapeList: ShapeItem[] = []) => {
  return {
    type: 'object',
    properties: {
      basic_style: {
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
              header: '基础样式',
            },
            properties: {
              heatmap: {
                type: 'string',
                title: '视角',
                default: 'heatmap',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-decorator-props': {},
                'x-component-props': {},
                enum: HEATMAP_SHAPE_LIST,
              },
              shape: {
                type: 'string',
                title: '形状',
                'x-decorator-props': {},
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  allowClear: true,
                  placeholder: '请选择形状',
                },
                enum: [...shapeList],
                'x-reactions': [
                  {
                    dependencies: ['heatmap'],
                    when: '{{$deps[0]==="hexagon" || $deps[0]==="hexagonColumn"}}',
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
                'x-reactions': [
                  {
                    dependencies: ['heatmap'],
                    when: '{{$deps[0]==="hexagon" || $deps[0]==="hexagonColumn"}}',
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

              colorsReverseOrder: {
                type: 'boolean',
                title: '倒序',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                'x-component-props': {},
                'x-decorator-props': {},
                'x-reactions': [
                  {
                    dependencies: ['heatmap'],
                    when: '{{$deps[0]==="hexagon" || $deps[0]==="hexagonColumn"}}',
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
                  {
                    target: 'colorsReverseOrder',
                    effects: ['onFieldInputValueChange'],
                    fulfill: {
                      run: "$form.setFieldState('colors', state => { state.value = state.value ? [...state.value].reverse() : [] })",
                    },
                  },
                ],
              },

              // 覆盖范围
              coverage: {
                type: 'number',
                title: '覆盖度',
                default: 1,
                'x-decorator-props': {},
                'x-decorator': 'FormItem',
                'x-component': 'Slider',
                'x-component-props': {
                  max: 1,
                  step: 0.1,
                },
                'x-reactions': [
                  {
                    dependencies: ['heatmap'],
                    when: '{{$deps[0]==="hexagon" || $deps[0]==="hexagonColumn"}}',
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

              angle: {
                type: 'number',
                title: '旋转角度',
                default: 0,
                'x-decorator-props': {},
                'x-decorator': 'FormItem',
                'x-component': 'Slider',
                'x-component-props': {
                  max: 360,
                  step: 1,
                },
                'x-reactions': [
                  {
                    dependencies: ['heatmap'],
                    when: '{{$deps[0]==="hexagon" || $deps[0]==="hexagonColumn"}}',
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

              radius: {
                type: 'number',
                title: '半径',
                default: 20,
                'x-decorator-props': {},
                'x-decorator': 'FormItem',
                'x-component': 'Slider',
                'x-component-props': {
                  max: 100,
                  step: 1,
                },
              },
              intensity: {
                type: 'number',
                title: '强度',
                default: 3,
                'x-decorator-props': {},
                'x-decorator': 'FormItem',
                'x-component': 'Slider',
                'x-component-props': {
                  max: 100,
                  step: 1,
                },
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

      collapseItem_fillColor: heatmapColorCollapse(fieldList),
      collapseItem_fillradius: heatmapSize(fieldList),
    },
  };
};
