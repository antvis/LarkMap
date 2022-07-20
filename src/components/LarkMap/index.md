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

## 介绍

LarkMap 是地图容器组件，相关地图组件与 Hooks 需放到容器组件内部才能使用，容器组件可通过属性配置不同的地图，支持 [Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/map/)、[Gaode](https://lbs.amap.com/api/javascript-api/reference/map) 及 [L7Map](https://l7.antv.vision/zh/docs/api/map/map) 作为底图。

## 代码演示

### 通过配置项生成

<code src="./demos/default.tsx" defaultShowCode></code>

### 通过实例生成

<code src="./demos/mapbox-instance.tsx" defaultShowCode></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ref | 组件 Ref | `Ref<RefAttributes>` | -- |
| id | 容器 id | `string` | -- |
| style | 容器行内样式 | `CSSProperties` | -- |
| className | 容器类名 | `string` | -- |
| map | 地图实例，可选，也可以通过配置项自动生成实例，详见 [L7 map](https://l7.antv.vision/zh/docs/api/map/map) | `MapInstance` | -- |
| mapType | 地图类型 | `"GaodeV1"｜"GaodeV2"｜"Mapbox"｜"Map"` | `'Mapbox'` |
| mapOptions | 地图配置项，配合地图类型配置地图 | `MapOptions` | -- |
| onSceneLoaded | 场景加载成功回调 | `(scene: Scene) => void` | -- |
| logoPosition | logo 展示位置，配置项详见 [L7 logoPosition](https://l7.antv.vision/zh/docs/api/scene#logoposition) | `PositionName` | `'bottomleft'` |
| logoVisible | 是否显示 logo | `boolean` | `true` |
| antialias | 是否开启抗锯齿 | `boolean` | `true` |
| preserveDrawingBuffe | 是否保留缓冲区数据 | `boolean` | `false` |

### MapOptions

> 地图底图类型不同时，MapOptions 配置项不完全相同，比如 maxZoom，GaodeV1 最大缩放等级 18，Mapbox 最大缩放等级 24。除此之外还有，底图的交互状态配置，zoomEnable、dragEnable 等。各配置项可详见各官网：高德地图 [配置项](https://lbs.amap.com/api/javascript-api/reference/map)；Mapbox 地图 [配置项](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-parameters)。

| 参数     | 说明                                                                               | 类型     | 默认值   |
| -------- | ---------------------------------------------------------------------------------- | -------- | -------- |
| style    | 地图样式，详见 [L7 map](https://l7.antv.vision/zh/docs/api/scene#style-地图图样式) | `string` | `light`  |
| token    | 地图服务 token，需到服务平台申请                                                   | `string` | `(必选)` |
| center   | 初始中心经纬度                                                                     | `number` | --       |
| pitch    | 初始倾角                                                                           | `number` | --       |
| rotation | 初始旋转角度                                                                       | `number` | --       |
| zoom     | 初始缩放层级                                                                       | `number` | --       |
| minZoom  | 地图最大缩放等级                                                                   | `number` | --       |

### RefAttributes

| 参数     | 说明            | 类型                | 默认值 |
| -------- | --------------- | ------------------- | ------ |
| getScene | 获取 Scene 实例 | `() => Scene`       | --     |
| getMap   | 获取 Map 实例   | `() => MapInstance` | --     |

## FAQ

### 1. 如何禁止地图的交互状态？

使用不同的底图，配置地图的交互状态不一样，API 文档有说明，各配置项可详见[高德](https://lbs.amap.com/api/javascript-api/reference/map)、[Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/map/)。比如要禁止地图的缩放与拖拽操作：

- 高德地图

```json
{ "zoomEnable": false, "dragEnable": false }
```

- Mapbox

```json
{ "dragPan": false, "scrollZoom": false }
```

### 2. 如果获取 Scene 实例？

1. 通过 onSceneLoaded 回调

```tsx | pure
import { LarkMap } from '@antv/larkmap';
import React from 'react';

export default () => {
  const onSceneLoaded = (scene: Scene) => {
    console.log(scene);
  };

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }} onSceneLoaded={onSceneLoaded}>
      <h2 style={{ position: 'absolute', left: '10px' }}>LarkMap</h2>
    </LarkMap>
  );
};
```

2. 挂载到 ref 上

```tsx | pure
import { LarkMap } from '@antv/larkmap';
import React, { useEffect, useRef } from 'react';

export default () => {
  const ref = useRef();
  useEffect(() => {
    console.log(ref.current.getScene());
  }, []);

  return (
    <LarkMap ref={ref} mapType="GaodeV1" style={{ height: '300px' }}>
      <h2 style={{ position: 'absolute', left: '10px' }}>LarkMap</h2>
    </LarkMap>
  );
};
```

3. 通过 Hooks ，详见 [useScene](/components/lark-map/hooks/use-scene/use-scene)
