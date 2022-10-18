import type { IControlOption } from '@antv/l7';
import type { CommonProps } from '../../../types';

/**
 * 组件类型定义
 */
export interface CustomControlProps extends CommonProps, Omit<Partial<IControlOption>, 'style'> {
  /** 控件容器包含的内容 */
  children?: React.ReactNode;
}
