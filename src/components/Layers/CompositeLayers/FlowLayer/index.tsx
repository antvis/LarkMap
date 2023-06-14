import { FlowLayer as L7FlowLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer, useLayerEvent } from '../../hooks';
import type { FlowLayerProps } from './types';

//TODD 图层没有鼠标事件
const FlowLayerEventMap = Object.assign(
  {
    onRemove: 'remove',
    onShow: 'show',
    onHide: 'hide',
    onDataUpdate: 'dataUpdate',
    onLegend: 'legend',
    onLegendColor: 'legend:color',
    onLegendSize: 'legend:size',

    // 点击事件
    onClick: 'click',
    onUnClick: 'unclick',
    onDblClick: 'dblclick',
    onUndblclick: 'undblclick',
    onContextMenu: 'contextmenu',
    onUnContextMenu: 'uncontextmenu',
  },
  {},
);

export const FlowLayer = memo(
  forwardRef<L7FlowLayer, FlowLayerProps>(function TrafficFlowLayer(props, ref) {
    const layerRef = useCreateLayer<L7FlowLayer, FlowLayerProps>(L7FlowLayer, props);
    //@ts-ignore
    useLayerEvent(layerRef.current, props, FlowLayerEventMap);
    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);
