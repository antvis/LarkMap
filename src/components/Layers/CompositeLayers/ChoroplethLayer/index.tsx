import { ChoroplethLayer as L7ChoroplethLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer, useLayerEvent } from '../../hooks';
import type { ChoroplethLayerProps } from './types';

export const ChoroplethLayer = memo(
  forwardRef<L7ChoroplethLayer, ChoroplethLayerProps>(function ChoroplethLayer(props, ref) {
    const layerRef = useCreateLayer<L7ChoroplethLayer, ChoroplethLayerProps>(L7ChoroplethLayer, props);

    useLayerEvent(layerRef.current, props);
    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);
