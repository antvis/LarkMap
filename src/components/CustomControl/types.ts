import type { IControlOption } from '@antv/l7';
import type { CommonProps } from '../../types';

/**
 * 组件类型定义
 */
export interface CustomControlProps extends CommonProps, Omit<Partial<IControlOption>, 'style'> {
  /** 子组件 */
  children?: React.ReactNode;
}
