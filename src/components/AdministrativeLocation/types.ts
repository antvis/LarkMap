import type { Bounds } from '@antv/l7';

export type GaodeAdministrativeLocationParams = {
  /**
   * 高德 Web API 服务的 key 值 (必传)
   */
  key: string;

  [key: string]: any;
};

export type AdministrativeLocationProps = {
  /**
   * 调用高德查询接口时传递的参数
   */
  searchParams: GaodeAdministrativeLocationParams;
  /**
   * class 名称
   */
  className?: string;
  /**
   * 内敛样式
   */
  style?: React.CSSProperties;
  /**
   * 自定义识别区域
   * @param bounds
   * @returns
   */
  transformBounds?: (bounds: Bounds) => Bounds;
  /**
   * 展示区域发生变更的回调函数
   * @param result 展示的行政区域文本
   * @param bounds 当前地图展示区域
   * @returns
   */
  onChange?: (result: string, bounds: Bounds) => void;
};
