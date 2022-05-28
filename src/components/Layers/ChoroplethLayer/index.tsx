import { ChoroplethLayer as L7ChoroplethLayer } from '@antv/l7-composite-layers';
import { forwardRef, useImperativeHandle } from 'react';
import { useCreateLayer } from '../hooks/use-create-layer';
import type { ChoroplethLayerProps } from './types';

export type { ChoroplethLayerProps };

export const ChoroplethLayer = forwardRef<L7ChoroplethLayer, ChoroplethLayerProps>((props, ref) => {
  const layerRef = useCreateLayer<L7ChoroplethLayer, ChoroplethLayerProps>(L7ChoroplethLayer, props);

  useImperativeHandle(ref, () => layerRef.current);

  return null;
});
