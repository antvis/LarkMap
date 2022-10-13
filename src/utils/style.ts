import type { CSSProperties } from 'react';
import { kebabCase } from 'lodash-es';

/**
 * 将 React.CSSProperties 格式的样式对象 转成 字符串格式
 * @param style
 */
export const getStyleText = (style: CSSProperties = {}) => {
  return Object.entries(style ?? {})
    .map(([key, value]) => {
      const cssKey = kebabCase(key);
      let cssValue = value as string | number;
      if (typeof cssValue === 'number') {
        cssValue = `${cssValue}px`;
      } else if (typeof cssValue === 'string') {
        cssValue = cssValue.replace("'", '');
      }
      return `${cssKey} :${cssValue}`;
    })
    .join('; ');
};
