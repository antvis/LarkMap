export type SceneEventCallback = (e?: any) => void;

export type SceneEventProps = Partial<{
  onLoaded: SceneEventCallback;
  onResize: SceneEventCallback;
  onMapMove: SceneEventCallback;
  onMoveStart: SceneEventCallback;
  onMoveEnd: SceneEventCallback;
  onZoomChange: SceneEventCallback;
  onZoomStart: SceneEventCallback;
  onZoomEnd: SceneEventCallback;
  onClick: SceneEventCallback;
  onDblclick: SceneEventCallback;
  onMouseMove: SceneEventCallback;
  onMousewheel: SceneEventCallback;
  onMousedown: SceneEventCallback;
  onContextmenu: SceneEventCallback;
  onDblClick: SceneEventCallback;
  onMouseWheel: SceneEventCallback;
  onMouseOver: SceneEventCallback;
  onMouseOut: SceneEventCallback;
  onMouseUp: SceneEventCallback;
  onMouseDown: SceneEventCallback;
  onContextMenu: SceneEventCallback;
  onDragStart: SceneEventCallback;
  onDragging: SceneEventCallback;
  onDragEnd: SceneEventCallback;
}>;
