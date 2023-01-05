import type { ColorRange } from '@antv/insight-component/es/components/formily/ColorRangeSelector/AntdColorRangeSelector/constants/color-ranges';
import fillColorCollapse from '../common-schema/fill-color-collapse';
import labelCollapse from '../common-schema/label-collapse';
import otherAttributesCollapse from '../common-schema/other-attributes-collapse';
import pointRadius from '../common-schema/point-radius-collapse';
import strokeCollapse from '../common-schema/stroke-collapse';
import type { FieldSelectOptionType } from '../types';

export default (fieldList: FieldSelectOptionType[] = [], colorRanges: ColorRange[] = []) => {
  return {
    type: 'object',
    properties: {
      collapseItem_fillColor: fillColorCollapse(fieldList, colorRanges),
      collapseItem_stroke: strokeCollapse(),
      collapseItem_fillradius: pointRadius(fieldList),
      collapseItem_labelstyle: labelCollapse(fieldList),
      // collapseItem_animate: animateCollapse(),
      collapseItem_other: otherAttributesCollapse(),
    },
  };
};
