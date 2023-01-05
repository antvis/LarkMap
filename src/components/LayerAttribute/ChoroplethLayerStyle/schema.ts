import type { ColorRange } from '@antv/insight-component/es/components/formily/ColorRangeSelector/AntdColorRangeSelector/constants/color-ranges';
import fillColorCollapse from '../common-schema/fill-color-collapse';
import labelCollapse from '../common-schema/label-collapse';
import otherAttributesCollapse from '../common-schema/other-attributes-collapse';
import strokeCollapse from '../common-schema/stroke-collapse';
import type { FieldSelectOptionType } from '../types';

export default (fieldList: FieldSelectOptionType[] = [], colorRanges: ColorRange[] = []) => {
  return {
    type: 'object',
    properties: {
      collapseItem_fillColor: fillColorCollapse({ fieldList, colorRanges }),
      collapseItem_stroke: strokeCollapse(),
      collapseItem_labelstyle: labelCollapse({ fieldList }),
      collapseItem_other: otherAttributesCollapse(),
    },
  };
};
