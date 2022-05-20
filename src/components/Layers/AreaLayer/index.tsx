import { useEffect, useRef } from 'react';
import { AreaLayer as AreaCompositeLayer } from '@antv/l7-composite-layers';
import { useLayerManager } from '../../LarkMap/hooks';
import type { AreaLayerProps } from './types';

export type { AreaLayerProps };

export const AreaLayer: React.FC<AreaLayerProps> = (props) => {
  const layerManager = useLayerManager();
  const layerRef = useRef<AreaCompositeLayer>();

  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.update(props);
    } else {
      layerRef.current = new AreaCompositeLayer(props);
      layerManager.addLayer(layerRef.current);
    }

    return () => {
      layerRef.current.remove();
    };
  }, [props]);

  return null;
};

export default AreaLayer;
