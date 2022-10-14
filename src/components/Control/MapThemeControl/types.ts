import type { Control, MapTheme, PositionName } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IControlCallback } from '../../../types';

/**
 * 组件类型定义
 */
export type IControlOptionItem = {
  // 主题选项对应的文本
  text: string;
  // 主题选项对应地图主题 style 的 key 值
  value: string;
  // 主题选项对应展示的图片
  img?: string;
};

export type PopperPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'right-start'
  | 'right'
  | 'right-end';

export interface IMapThemeControlCallback<C extends Control = Control> {
  onPopperShow?: (control: C) => void;
  onPopperHide?: (control: C) => void;
}

export interface IMapThemeControlProps {
  options?: IControlOptionItem[];
  popperPlacement?: PopperPlacement;
  popperTrigger?: 'click' | 'hover';
  popperClassName?: string;
  btnText?: string;
  title?: string;
  vertical?: boolean;
  position?: PositionName;
  className?: string;
}

// @ts-ignore
export interface MapThemeControlProps
  extends IMapThemeControlProps,
    IControlCallback<MapTheme>,
    IMapThemeControlCallback<MapTheme> {
  style?: CSSProperties;
  btnIcon?: ReactNode;
  onSelectChange?: (value: string | string[]) => void;
}
