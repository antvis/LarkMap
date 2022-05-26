import { ChoroplethLayer as L7ChoroplethLayer } from '@antv/l7-composite-layers';
import { useUpdateEffect } from 'ahooks';
import { useRef } from 'react';
import { useLayerManager } from '../../LarkMap/hooks';
import type { ChoroplethLayerProps } from './types';

export type { ChoroplethLayerProps };

export const ChoroplethLayer: React.FC<ChoroplethLayerProps> = (props) => {
  const layerManager = useLayerManager();
  const layerRef = useRef<L7ChoroplethLayer>();

  if (!layerRef.current) {
    layerRef.current = new L7ChoroplethLayer(props);
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
