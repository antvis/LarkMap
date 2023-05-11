import type { ModalProps } from 'antd';
import type { LarkMapProps } from '../../../../src/components/LarkMap/types';
import type { LocationSearchProps } from '../../../../src/components/LocationSearch/types';
import type { DrawGroupData, UseDrawGroupConfig } from '../../../../src/components/Draw/use-draw-group/types';

export interface DrawModalProps extends Omit<ModalProps, 'onOk'> {
  /**
   * 地图部分配置
   */
  larkmapProps?: LarkMapProps;
  /**
   * 支持的绘制类型及其配置
   */
  drawConfig?: UseDrawGroupConfig;
  /**
   * 是否开启地点搜索框，以及搜索框的配置
   */
  locationSearchProps?: LocationSearchProps | false;
  /**
   * 点击弹框提交按钮时的回调函数
   * @param drawData
   */
  onOk: (drawData: DrawGroupData) => void;
}
