export type LayerEventCallback = (e?: any) => void;

export type LayerEventProps = Partial<{
  onClick: LayerEventCallback;
  onDblClick: LayerEventCallback;
  onMouseMove: LayerEventCallback;
  onMouseOut: LayerEventCallback;
  onMouseUp: LayerEventCallback;
  onMouseDown: LayerEventCallback;
  onContextMenu: LayerEventCallback;
  onUnClick: LayerEventCallback;
  onUnMousemove: LayerEventCallback;
  onUnMouseup: LayerEventCallback;
  onUnMousedown: LayerEventCallback;
  onUnContextMenu: LayerEventCallback;
  onUnPick: LayerEventCallback;
  onMouseEnter: LayerEventCallback;
  onInit: LayerEventCallback;
  onAdd: LayerEventCallback;
  onRemove: LayerEventCallback;
}>;
