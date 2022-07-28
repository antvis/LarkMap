export default (fieldList: Record<string, any>[] = []) => {
  return {
    type: 'void',
    'x-component': 'Collapse',
    'x-component-props': {
      ghost: true,
      destroyInactivePanel: true,
      defaultActiveKey: [],
    },
    properties: {
      fillradius: {
        type: 'void',
        'x-component': 'Collapse.CollapsePanel',
        'x-component-props': {
          header: '填充半径',
        },

        properties: {
          radiusField: {
            type: 'string',
            title: '基于字段',
            'x-decorator': 'FormItem',
            'x-component': 'FieldSelect',
            'x-decorator-props': {
              tooltip: '选中一个数值字段作为填充半径',
            },
            'x-component-props': {
              allowClear: true,
              placeholder: '请选择字段',
            },
            enum: [...fieldList],
          },

          radius: {
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
                dependencies: ['radiusField'],
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
          radiusRange: {
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
                dependencies: ['radiusField'],
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
