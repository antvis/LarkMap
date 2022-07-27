import fillColorCollapse from '../common-schema/fill-color-collapse';
import lableCollapse from '../common-schema/lable-collapse';
import pointRadius from '../common-schema/point-radius-collapse';
import strokeCollapse from '../common-schema/stroke-collapse';

export default (fieldList: Record<string, any>[] = []) => {
  return {
    type: 'object',
    properties: {
      groupLabel: {
        type: 'string',
        title: '标签',
        enum: [...fieldList],
        'x-decorator': 'FormItem',
        'x-component': 'FieldSelect',
        'x-component-props': {
          placeholder: '请选择标签',
          allowClear: true,
        },
        'x-decorator-props': {
          tooltip: '(选中一个字段（文本、数值或单选）作为标签',
        },
      },
      collapseItem_fillColor: fillColorCollapse(fieldList),
      collapseItem_stroke: strokeCollapse(),
      collapseItem_fillradius: pointRadius(fieldList),
      collapseItem_labelstyle: lableCollapse(),
    },
  };
};
