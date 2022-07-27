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
      labelstyle: {
        type: 'void',
        'x-component': 'Collapse.CollapsePanel',
        'x-component-props': {
          header: '标签样式',
        },

        properties: {
          labelColor: {
            type: 'string',
            title: '字体颜色',
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

          labelFontSize: {
            type: 'number',
            title: '字号',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '字号',
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
          labelTextAnchor: {
            type: 'string',
            title: '位置',
            enum: [
              {
                label: '居中',
                value: 'center',
              },
              {
                label: '居左',
                value: 'left',
              },
              {
                label: '居右',
                value: 'right',
              },
            ],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              placeholder: '请选择位置',
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
        },
      },
    },
  };
};
