import type { IExportImageControlOption, ExportImage } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IControlCallback } from '../../../types';

/**
 * 组件类型定义
 */
// @ts-ignore
export interface ExportImageControlProps extends Partial<IExportImageControlOption>, IControlCallback<ExportImage> {
  style?: CSSProperties;
  btnIcon?: ReactNode;
}
