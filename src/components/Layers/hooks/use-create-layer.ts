import { useUpdateEffect } from 'ahooks';
import { useRef } from 'react';
import type { LayerCommonProps } from 'types/common';
import type { Layer } from 'utils/layer-manager';
import { useLayerManager } from '../../LarkMap/hooks';

/**
 * LayerCtor 图层类 构造函数
 */
type LayerCtor<O, L> = new (options: O) => L;
/**
 * LayerOptions 图层基础配置
 */
type LayerBaseOptions = {
  /** 数据源 */
  source?: any;
};

export const useCreateLayer = <L extends Layer, C extends LayerCommonProps<L> & LayerBaseOptions>(
  Ctor: LayerCtor<C, L>,
  config: C,
) => {
  const layerManager = useLayerManager();
  const layerRef = useRef<L>();

  const { onCreated } = config;

  // 生成图层
  // 添加到 layerManager 自动加载到 scene
  if (!layerRef.current) {
    layerRef.current = new Ctor(config);
    layerManager.addLayer(layerRef.current);

    // TODO: 复合图层暴露初始化完成事件
    // layerRef.current.once('created', () => {
    //   if (onCreated) {
    //     onCreated(layerRef.current);
    //   }
    // });

    // For Temporary
    if (onCreated) {
      setTimeout(() => onCreated(layerRef.current), 0);
    }
  }

  // config 更新时
  useUpdateEffect(() => {
    if (layerRef.current) {
      layerRef.current.update(config);
    }

    // 组件销毁时
    return () => {
      if (layerRef.current) {
        layerManager.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [config]);

  // source 更新时
  useUpdateEffect(() => {
    if (layerRef.current) {
      layerRef.current.changeData(config.source);
    }
  }, [config.source]);

  return layerRef;
};
