import fillColorCollapse from '../common-schema/fill-color-collapse';
import lableCollapse from '../common-schema/lable-collapse';
import pointRadius from '../common-schema/point-radius-collapse';
import strokeCollapse from '../common-schema/stroke-collapse';
import type { FieldSelectOptionType } from '../types';

export default (fieldList: FieldSelectOptionType[] = [], ribbonList: string[][] = []) => {
  return {
    type: 'object',
    properties: {
      collapseItem_fillColor: fillColorCollapse(fieldList, ribbonList),
      collapseItem_stroke: strokeCollapse(),
      collapseItem_fillradius: pointRadius(fieldList),
      collapseItem_labelstyle: lableCollapse(fieldList),
    },
  };
};
