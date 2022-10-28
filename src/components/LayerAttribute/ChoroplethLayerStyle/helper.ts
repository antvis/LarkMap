import type { ChoroplethLayerStyleAttributeValue } from './types';

/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const choroplethLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const styleConfig: ChoroplethLayerStyleAttributeValue = {
    fillColor: style.fillColorField
      ? {
          field: style.fillColorField,
          value: style.fillColorRibbon,
          scale: { type: style.fillColorScale },
        }
      : style.fillColor,
    opacity: style.fillColorOpacity,
    strokeColor: style.strokeColor,
    lineWidth: style.lineWidth,
    lineOpacity: style.lineOpacity,
    label: {
      field: style.labelField,
      visible: Boolean(style.labelField),
      style: {
        fill: style.labelColor,
        fontSize: style.labelFontSize,
        textAnchor: style.labelTextAnchor,
      },
    },
  };

  return styleConfig;
};

/**
 * 图层样式数据转平铺数据
 * 将图层样式的数据结构转为表单的平铺数据
 * */
export const choroplethLayerStyleConfigToFlat = (styleConfig: ChoroplethLayerStyleAttributeValue) => {
  const { fillColor, opacity, strokeColor, lineWidth, lineOpacity, label } = styleConfig;
  const config = {
    fillColorField: typeof fillColor === 'object' ? fillColor?.field : undefined,
    fillColorRibbon: typeof fillColor === 'object' ? fillColor?.value : undefined,
    fillColorScale: typeof fillColor === 'object' ? fillColor?.scale?.type : undefined,
    fillColor: typeof fillColor !== 'object' ? fillColor : undefined,
    fillColorOpacity: opacity,
    strokeColor: strokeColor,
    lineWidth,
    lineOpacity,
    labelField: label?.field,
    labelColor: label?.style?.fill,
    labelFontSize: label?.style?.fontSize,
    labelTextAnchor: label?.style?.textAnchor,
  };

  return config;
};
