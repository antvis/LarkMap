import type { LineLayerStyleAttributeValue } from './types';

/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const LineLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const styleConfig: LineLayerStyleAttributeValue = {
    size: style.sizeField
      ? {
          field: style.sizeField,
          value: style.sizeRange,
        }
      : style.size,

    color: style.fillColorField
      ? {
          field: style.fillColorField,
          value: style.fillColorRibbon,
        }
      : undefined,
    style: {
      opacity: style.fillColorOpacity,
      lineType: 'solid' as const,
      sourceColor: style.sourceColor,
      targetColor: style.targetColor,
    },
  };

  if (!styleConfig.color) {
    delete styleConfig.color;
  }
  if (!styleConfig.style.sourceColor) {
    delete styleConfig.style.sourceColor;
    delete styleConfig.style.targetColor;
  }

  return styleConfig;
};

/**
 * 图层样式数据转平铺数据
 * 将图层样式的数据结构转为表单的平铺数据
 * */
export const LineLayerStyleConfigToFlat = (styleConfig: LineLayerStyleAttributeValue) => {
  const { size, color, style } = styleConfig;
  const config = {
    size: typeof size === 'object' ? undefined : size,
    // @ts-ignore
    sizeField: typeof size === 'object' ? size?.field : undefined,
    // @ts-ignore
    sizeRange: typeof size === 'object' ? size?.value : undefined,

    fillColorField: typeof color === 'object' ? color?.field : undefined,
    fillColorRibbon: typeof color === 'object' ? color?.value : undefined,
    fillColorOpacity: style?.opacity,

    lineType: style?.lineType,
    sourceColor: style?.sourceColor,
    targetColor: style?.targetColor,
  };
  return config;
};
