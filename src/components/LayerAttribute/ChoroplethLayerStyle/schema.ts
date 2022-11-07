import fillColorCollapse from '../common-schema/fill-color-collapse';
import lableCollapse from '../common-schema/lable-collapse';
import otherAttributesCollapse from '../common-schema/other-attributes-collapse';
import strokeCollapse from '../common-schema/stroke-collapse';
import type { FieldSelectOptionType } from '../types';

export default (fieldList: FieldSelectOptionType[] = [], ribbonList: string[][] = []) => {
  return {
    type: 'object',
    properties: {
      collapseItem_fillColor: fillColorCollapse(fieldList, ribbonList),
      collapseItem_stroke: strokeCollapse(),
      collapseItem_labelstyle: lableCollapse(fieldList),
      collapseItem_other: otherAttributesCollapse(),
    },
  };
};
