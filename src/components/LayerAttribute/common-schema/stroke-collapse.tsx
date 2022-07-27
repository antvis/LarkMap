export default () => {
  return {
    type: 'void',
    'x-component': 'Collapse',
    'x-component-props': {
      ghost: true,
      destroyInactivePanel: true,
      defaultActiveKey: [],
    },
    properties: {
      stroke: {
        type: 'void',
        'x-component': 'Collapse.CollapsePanel',
        'x-component-props': {
          header: '描边',
        },
        properties: {
          strokeColor: {
            type: 'string',
            title: '颜色',
            'x-decorator': 'FormItem',
            'x-component': 'ColorPicker',
            'x-decorator-props': {
              colon: false,
              labelAlign: 'left',
              labelWidth: 82,
              style: {
                display: 'flex',
                alignItems: 'center',
              },
            },
          },

          lineWidth: {
            type: 'number',
            title: '描边宽度',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '描边宽度',
            },
            'x-decorator-props': {
              colon: false,
              labelAlign: 'left',
              labelWidth: 82,
              style: {
                display: 'flex',
                alignItems: 'center',
              },
            },
          },
          lineOpacity: {
            type: 'string',
            title: '透明度',
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-decorator-props': {
              colon: false,
              labelAlign: 'left',
              labelWidth: 82,
              style: {
                display: 'flex',
                alignItems: 'center',
              },
            },
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
