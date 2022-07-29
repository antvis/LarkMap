import fillColorCollapse from '../common-schema/fill-color-collapse';
import lableCollapse from '../common-schema/lable-collapse';
import strokeCollapse from '../common-schema/stroke-collapse';
import type { FieldItem } from '../types';

export default (fieldList: FieldItem[] = []) => {
  return {
    type: 'object',
    properties: {
      collapseItem_fillColor: fillColorCollapse(fieldList),
      collapseItem_stroke: strokeCollapse(),
      collapseItem_labelstyle: lableCollapse(fieldList),
    },
  };
};
