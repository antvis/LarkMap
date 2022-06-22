import type { BaseMode } from '@antv/l7-draw';
import type { CustomControlProps } from '../../CustomControl/types';

export interface DrawKeyboardHelperProps extends Pick<CustomControlProps, 'position' | 'className' | 'style'> {
  /**
   * 当前激活的draw实例
   */
  draw?: BaseMode;
}

export interface KeyboardItem {
  keyboards: string[];
  title: string;
}
