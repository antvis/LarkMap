import { useUpdateEffect } from 'ahooks';
import { cloneDeep, isEqual } from 'lodash-es';
import { useEffect, useRef } from 'react';
import type { LayerCommonProps, Layer } from '../../../../types';
import { useLayerManager } from '../../../LarkMap/hooks';

/**
 * LayerCtor 图层类 构造函数
 */
type LayerCtor<O, L> = new (options: O) => L;

/**
 * LayerOptions 图层基础配置
 */
type LayerBaseOptions = {
  /** 数据源 */
  source: { data: any };
};

export const useCreateLayer = <L extends Layer, C extends LayerCommonProps<L> & LayerBaseOptions>(
  Ctor: LayerCtor<C, L>,
  config: C,
) => {
  const { onCreated, source, ...options } = config;
  const layerManager = useLayerManager();
  const layerRef = useRef<L>();
  const layerOptionsRef = useRef<Omit<C, 'onCreated' | 'source'>>(options);
  const layerSourceRef = useRef(source);

  // 创建图层
  // 添加到 layerManager 自动加载到 scene
  if (!layerRef.current) {
    layerRef.current = new Ctor(config);

    // 复合图层初始化完成事件
    // layerRef.current.once('inited', () => {})
    if (onCreated) {
      setTimeout(() => onCreated(layerRef.current), 0);
    }

    layerManager.addLayer(layerRef.current);
  }

  // options 更新时
  useUpdateEffect(() => {
    if (layerRef.current) {
      const changeOption = !isEqual(layerOptionsRef.current, options);
      if (changeOption) {
        layerRef.current.update(options);
        layerOptionsRef.current = cloneDeep(options);
      }
    }
  }, [options]);

  // source 更新时
  useUpdateEffect(() => {
    if (layerRef.current) {
      const { data, ...restOptions } = source;
      const { data: currentData, ...restCurrentOptions } = layerSourceRef.current;
      const changeSource = data !== currentData || !isEqual(restOptions, restCurrentOptions);
      if (changeSource) {
        layerRef.current.changeData(source);
        layerSourceRef.current = { ...source };
      }
    }
  }, [source]);

  // 组件销毁时
  useEffect(() => {
    return () => {
      if (layerRef.current) {
        layerManager.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return layerRef;
};
