import type { LineLayerProps } from '@antv/larkmap';
import type { CascaderProps } from 'antd';

export interface AdministrativeSelectProps extends Omit<CascaderProps, 'value' | 'options' | 'onChange'> {
  value: string[];
  onChange?: (value: string[], selectedOptions: any) => void;
  /**
   * 是否显示边界
   */
  enableBoundary?: boolean;
  /**
   * 是否平移
   */
  autoFit?: boolean;
  /**
   * layer属性
   */
  boundaryLayer?: Omit<LineLayerProps, 'source'>;
}
