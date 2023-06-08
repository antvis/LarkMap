import classNames from 'classnames';
import React from 'react';
import { useScene } from '../../../components/LarkMap/hooks';
import { DefaultEagleEyeOptions } from './constant';
import { useDraggable, useEagleBox, useSyncScenes } from './hooks';
import './index.less';
import type { EagleEyeControlProps } from './types';
/**
 * + 添加地图同步监听
 * + 获取主地图画布的边界点，得到对应边界坐标 mainBox。
 * + 在鹰眼地图上，mainBox 映射得到 画布坐标 eagleCoord，再反通过 padding 计算得到新画布坐标
 * + 拿新画布坐标在鹰眼地图上重新计算边界坐标，得到 eagleBox，然后fitBounds
 * + 根据 eagleCoord 绘制框选元素 div。并定位。
 * + 地图事件同步
 * @param param0
 * @returns
 */
export const EagleEyeControl: React.FC<EagleEyeControlProps> = (props: EagleEyeControlProps) => {
  const scene = useScene();
  const controlRef = React.useRef<HTMLDivElement>();
  const { mainScene, className, style, options = DefaultEagleEyeOptions } = props;

  // 盒子的位置，固定
  const boxRect = useEagleBox(scene, mainScene, options);

  // 监听鹰眼盒子，获取拖拽移动的偏移量
  useDraggable(scene, controlRef);
  // 同步主地图和副地图，获取主地图边界
  useSyncScenes(mainScene, scene, boxRect);

  return (
    <div
      className={classNames(className, 'l7-control-eagle_box')}
      style={{
        ...style,
        left: boxRect.x + 'px',
        top: boxRect.y + 'px',
        width: boxRect.width + 'px',
        height: boxRect.height + 'px',
      }}
      ref={controlRef}
      draggable={true}
    />
  );
};
