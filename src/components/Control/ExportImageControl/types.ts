import type { IExportImageControlOption, ExportImage } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IControlCallback } from '../../../types';

/**
 * 组件类型定义
 */
export interface ExportImageControlProps
  extends Omit<Partial<IExportImageControlOption>, 'style' | 'btnIcon'>,
    IControlCallback<ExportImage> {
  style?: CSSProperties;
  btnIcon?: ReactNode;
}
