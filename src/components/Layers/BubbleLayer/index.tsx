import { BubbleLayer as L7BubbleLayer } from '@antv/l7-composite-layers';
import { useUpdateEffect } from 'ahooks';
import { useRef } from 'react';
import { useLayerManager } from '../../LarkMap/hooks';
import type { BubbleLayerProps } from './types';

export type { BubbleLayerProps };

export const BubbleLayer: React.FC<BubbleLayerProps> = (props) => {
  const layerManager = useLayerManager();
  const layerRef = useRef<L7BubbleLayer>();

  if (!layerRef.current) {
    layerRef.current = new L7BubbleLayer(props);
    layerManager.addLayer(layerRef.current);
  }

  useUpdateEffect(() => {
    if (layerRef.current) {
      layerRef.current.update(props);
    }

    return () => {
      layerManager.removeLayer(layerRef.current);
    };
  }, [props]);

  useUpdateEffect(() => {
    if (layerRef.current) {
      layerRef.current.changeData(props.source);
    }
  }, [props.source]);

  return null;
};
