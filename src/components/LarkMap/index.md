---
title: LarkMap
order: 0
toc: content
group:
  title: 容器组件
  order: 0
nav:
  title: 组件
  path: /components
---

## LarkMap

### 介绍

LarkMap 是地图容器组件，相关地图组件与 Hooks 需放到容器组件内部才能使用，容器组件可通过属性配置不同的地图，支持 [Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/map/)、[Gaode](https://lbs.amap.com/api/jsapi-v2/documentation#map) 及 [L7Map](https://l7.antv.antgroup.com/api/map) 作为底图。

### 代码演示

#### 通过配置生成地图

<code src="./demos/default.tsx" compact defaultShowCode></code>

#### 通过实例生成地图

<code src="./demos/map-instance.tsx" compact defaultShowCode></code>

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 容器 id | `string` | -- |
| style | 容器行内样式 | `CSSProperties` | -- |
| className | 容器类名 | `string` | -- |
| map | 地图实例，可选，也可以通过配置项自动生成实例，详见 [L7 map](https://l7.antv.antgroup.com/api/map) | `MapInstance` | -- |
| mapType | 地图底图类型 | `'Gaode'｜`<br />`'GaodeV2'｜`<br />`'Mapbox'｜`<br />`'Map'` | `'Gaode'` |
| mapOptions | 地图配置项，配合地图类型配置地图，详情可见 [MapOptions](#mapoptions) | `MapOptions` | -- |
| logoPosition | logo 展示位置，配置项详见 [L7 logoPosition](https://l7.antv.antgroup.com/api/scene#logoposition) | `PositionName` | `'bottomleft'` |
| logoVisible | 是否显示 logo | `boolean` | `true` |
| antialias | 是否开启抗锯齿 | `boolean` | `true` |
| preserveDrawingBuffer | 是否保留缓冲区数据 | `boolean` | `false` |
| ref | 组件 Ref，详情可见 [LarkMapRefAttributes](#larkmaprefattributes) | `Ref<LarkMapRefAttributes>` | -- |
| onSceneLoaded | 场景加载成功回调 | `(scene: Scene) => void` | -- |
| onLoaded | 加载完成事件 | `(e?: any) => void` | -- |
| onDestroy | 销毁事件 | `(e?: any) => void` | -- |
| onResize | 地图容器大小改变事件 | `(e?: any) => void` | -- |
| onMapMove | 地图平移时触发事件 | `(e?: any) => void` | -- |
| onMoveStart | 地图平移开始时触发事件 | `(e?: any) => void` | -- |
| onMoveEnd | 地图移动结束后触发，包括平移，以及中心点变化的缩放。如地图有拖拽缓动效果，则在缓动结束后触发 | `(e?: any) => void` | -- |
| onZoomStart | 缩放开始时触发 | `(e?: any) => void` | -- |
| onZoomEnd | 缩放停止时触发 | `(e?: any) => void` | -- |
| onZoomChange | 地图缩放级别更改后触发 | `(e?: any) => void` | -- |
| onClick | 点击事件 | `(e?: any) => void` | -- |
| onDblclick | 双击事件 | `(e?: any) => void` | -- |
| onContextMenu | 右键点击事件 | `(e?: any) => void` | -- |
| onMouseMove | 鼠标在地图上移动时触发 | `(e?: any) => void` | -- |
| onMouseWheel | 鼠标滚轮开始缩放地图时触发 | `(e?: any) => void` | -- |
| onMouseDown | 鼠标在地图上单击按下时触发 | `(e?: any) => void` | -- |
| onMouseUp | 鼠标在地图上单击抬起时触发 | `(e?: any) => void` | -- |
| onMouseOver | 鼠标移入地图容器内时触发 | `(e?: any) => void` | -- |
| onMouseOut | 鼠标移出地图容器时触发 | `(e?: any) => void` | -- |
| onDragStart | 开始拖拽地图时触发 | `(e?: any) => void` | -- |
| onDragging | 拖拽地图过程中触发 | `(e?: any) => void` | -- |
| onDragEnd | 停止拖拽地图时触发，如地图有拖拽缓动效果，则在拽停止，缓动开始前触发 | `(e?: any) => void` | -- |

#### MapOptions

> 地图底图类型不同时，MapOptions 配置项不完全相同，比如 maxZoom，Gaode 最大缩放等级 30，Mapbox 最大缩放等级 22。除此之外还有，底图的交互状态配置，zoomEnable、dragEnable 等。各配置项可详见各官网：高德地图 [配置项](https://lbs.amap.com/api/jsapi-v2/documentation#map)；Mapbox 地图 [配置项](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-parameters)。

| 参数     | 说明                                                                           | 类型     | 默认值   |
| -------- | ------------------------------------------------------------------------------ | -------- | -------- |
| style    | 地图样式，详见 [L7 map](https://l7.antv.antgroup.com/api/map#style-地图图样式) | `string` | `light`  |
| token    | 地图服务 token，需到服务平台申请                                               | `string` | `(必选)` |
| center   | 初始中心经纬度                                                                 | `number` | --       |
| pitch    | 初始倾角                                                                       | `number` | --       |
| rotation | 初始旋转角度                                                                   | `number` | --       |
| zoom     | 初始缩放层级                                                                   | `number` | --       |
| minZoom  | 地图最大缩放等级                                                               | `number` | --       |

#### LarkMapRefAttributes

| 参数     | 说明            | 类型                | 默认值 |
| -------- | --------------- | ------------------- | ------ |
| getScene | 获取 Scene 实例 | `() => Scene`       | --     |
| getMap   | 获取 Map 实例   | `() => MapInstance` | --     |

### Event

#### 事件监听

- 通过组件属性：在 [API](#api) 中已列举了所有事件对应的组件属性。

```jsx | pure
<LarkMap onEventName={() => {}} />
```

- 通过实例绑定：可以通过组件属性 `onSceneLoaded` 获取到 `Scene` 实例后，监听实例对应事件。

```tsx | pure
<LarkMap
  onSceneLoaded={(scene) => {
    // 绑定事件
    scene.on('click', () => {});
    // 绑定一次事件
    scene.once('click', () => {});
    // 解绑事件
    scene.off('click', () => {});
  }}
/>
```

#### 事件类别

##### 生命周期事件

| 事件名  | 类型         | 描述         |
| ------- | ------------ | ------------ |
| loaded  | 生命周期事件 | 加载完成事件 |
| destroy | 生命周期事件 | 销毁事件     |

##### 地图容器事件

| 事件名     | 类型     | 描述                                                                                         |
| ---------- | -------- | -------------------------------------------------------------------------------------------- |
| resize     | 容器事件 | 地图容器大小改变事件                                                                         |
| mapmove    | 地图事件 | 地图平移时触发事件                                                                           |
| movestart  | 地图事件 | 地图平移开始时触发事件                                                                       |
| moveend    | 地图事件 | 地图移动结束后触发，包括平移，以及中心点变化的缩放。如地图有拖拽缓动效果，则在缓动结束后触发 |
| zoomchange | 地图事件 | 地图缩放级别更改后触发                                                                       |
| zoomstart  | 地图事件 | 缩放开始时触发                                                                               |
| zoomend    | 地图事件 | 缩放停止时触发                                                                               |

##### 点击事件

| 事件名      | 类型     | 描述         |
| ----------- | -------- | ------------ |
| click       | 左键事件 | 点击事件     |
| dblclick    | 双击事件 | 双击事件     |
| contextmenu | 右键事件 | 右键点击事件 |

##### 鼠标事件

| 事件名     | 类型     | 描述                                                                 |
| ---------- | -------- | -------------------------------------------------------------------- |
| mousemove  | 鼠标事件 | 鼠标在地图上移动时触发                                               |
| mousewheel | 鼠标事件 | 鼠标滚轮开始缩放地图时触发                                           |
| mouseover  | 鼠标事件 | 鼠标移入地图容器内时触发                                             |
| mouseout   | 鼠标事件 | 鼠标移出地图容器时触发                                               |
| mouseup    | 鼠标事件 | 鼠标在地图上单击抬起时触发                                           |
| mousedown  | 鼠标事件 | 鼠标在地图上单击按下时触发                                           |
| dragstart  | 滑动事件 | 开始拖拽地图时触发                                                   |
| dragging   | 滑动事件 | 拖拽地图过程中触发                                                   |
| dragend    | 滑动事件 | 停止拖拽地图时触发，如地图有拖拽缓动效果，则在拽停止，缓动开始前触发 |

### FAQ

#### 1. 如何禁止地图的交互状态？

使用不同的底图，配置地图的交互状态不一样，API 文档有说明，各配置项可详见[高德](https://lbs.amap.com/api/jsapi-v2/documentation#map)、[Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/map/)。比如要禁止地图的缩放与拖拽操作：

- 高德地图

```json
{ "zoomEnable": false, "dragEnable": false }
```

- Mapbox

```json
{ "dragPan": false, "scrollZoom": false }
```

#### 2. 如果获取 Scene 实例？

1. 通过 onSceneLoaded 回调

```tsx | pure
import { LarkMap } from '@antv/larkmap';

export default () => {
  const onSceneLoaded = (scene: Scene) => {
    console.log(scene);
  };

  return (
    <LarkMap mapType="Gaode" style={{ height: '300px' }} onSceneLoaded={onSceneLoaded}>
      <h2 style={{ position: 'absolute', left: '10px' }}>LarkMap</h2>
    </LarkMap>
  );
};
```

2. 挂载到 ref 上

```tsx | pure
import { LarkMap, LarkMapRefAttributes } from '@antv/larkmap';
import { useEffect, useRef } from 'react';

export default () => {
  const ref = useRef<LarkMapRefAttributes>();
  useEffect(() => {
    console.log(ref.current.getScene());
  }, []);

  return (
    <LarkMap ref={ref} mapType="Gaode" style={{ height: '300px' }}>
      <h2 style={{ position: 'absolute', left: '10px' }}>LarkMap</h2>
    </LarkMap>
  );
};
```

3. 通过 Hooks ，详见 [useScene](/components/lark-map/hooks/use-scene/use-scene)
