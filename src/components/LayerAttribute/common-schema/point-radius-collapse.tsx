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
            title: '基于字段填充',
            'x-decorator': 'FormItem',
            'x-component': 'FieldSelect',
            'x-decorator-props': {
              colon: false,
              labelStyle: {
                width: 80,
                textOverflower: 'ellipsis',
                whiteSpace: 'nowrap',
                overflower: 'hidden',
                align: 'left',
              },
              style: {
                display: 'flex',
                alignItems: 'center',
              },
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
            'x-decorator-props': {
              colon: false,
              labelStyle: {
                width: 80,
                overflower: 'hidden',
                align: 'left',
              },
              style: {
                display: 'flex',
                alignItems: 'center',
              },
            },
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
            'x-decorator-props': {
              colon: false,
              style: {
                display: 'flex',
              },
              labelStyle: {
                marginTop: 3,
                width: 80,
                overflower: 'hidden',
                align: 'left',
              },
            },
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
