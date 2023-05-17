import type { Scene } from '@antv/l7';
import type { CommonProps } from '../../../types/common';

/**
 * 组件类型定义
 */
export interface EagleEyeControlProps extends CommonProps {
  mainScene: Scene;
  options: EagleEyeOptions;
}
export interface EagleEyeOptions {
  padding: Padding;
}

export interface Padding {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export interface CanvasBoxRect {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface Position {
  x: number;
  y: number;
}
