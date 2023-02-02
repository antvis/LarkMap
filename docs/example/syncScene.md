---
toc: false
order: 10
nav:
  title: 示例
  path: /example
  order: 3
---

# 同步地图 - syncScene

## 介绍

地图同步状态工具函数

地图类型 支持 Gaode 和 Mapbox

### 使用场景

可用于同步两个场景的地图状态，适用于 两幅地图的联动。

## 代码演示

### 示例一：基础使用

```tsx
import type { LarkMapProps } from '@antv/larkmap';
import { LarkMap, syncScene } from '@antv/larkmap';
import React from 'react';
const config: LarkMapProps = {
  // mapType: 'Gaode',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    zoom: 9,
  },
};
export default () => {
  const [sceneArray, setSceneArray] = React.useState([]);
  const clearRef = React.useRef();
  const onSceneLoaded = (scene: Scene) => {
    setSceneArray((oldValue) => [...oldValue, scene]);
  };

  const clearSync = () => {
    clearRef.current();
  };
  const addSync = () => {
    clearRef.current = syncScene(sceneArray);
  };

  return (
    <div>
      <button onClick={addSync}>添加场景同步</button>

      <button onClick={clearSync}>清除同步</button>

      <div style={{ display: 'flex', flexDirection: 'row', height: '300px' }}>
        <LarkMap onSceneLoaded={onSceneLoaded} {...config} id="scene" style={{ flex: 1 }}>
          <h2 style={{ position: 'absolute', left: '10px' }}>地图1</h2>
        </LarkMap>
        <LarkMap onSceneLoaded={onSceneLoaded} {...config} id="scene2" style={{ flex: 1 }}>
          <h2 style={{ position: 'absolute', left: '10px' }}>地图2</h2>
        </LarkMap>
      </div>
    </div>
  );
};
```

### 示例二： 设置 zoomGap

```tsx
import type { LarkMapProps } from '@antv/larkmap';
import { LarkMap, syncScene } from '@antv/larkmap';
import React from 'react';
const config: LarkMapProps = {
  // mapType: 'Gaode',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    zoom: 9,
  },
};
export default () => {
  const [sceneArray, setSceneArray] = React.useState([]);
  const [zoomGap, setZoomGap] = React.useState(0);
  const onSceneLoaded = (scene: Scene) => {
    setSceneArray((oldValue) => [...oldValue, scene]);
  };
  const changeHandler = (e) => {
    setZoomGap(e.target.value);
  };
  React.useEffect(() => {
    const callback = syncScene(sceneArray, {
      zoomGap,
      mainSceneIndex: 0,
    });
    return () => {
      callback();
    };
  }, [zoomGap]);

  return (
    <div>
      设置zoomGap： <input onChange={changeHandler}></input>
      <div style={{ display: 'flex', flexDirection: 'row', height: '300px' }}>
        <LarkMap onSceneLoaded={onSceneLoaded} {...config} id="scene" style={{ flex: 1 }}>
          <h2 style={{ position: 'absolute', left: '10px' }}>地图1</h2>
        </LarkMap>
        <LarkMap onSceneLoaded={onSceneLoaded} {...config} id="scene2" style={{ flex: 1 }}>
          <h2 style={{ position: 'absolute', left: '10px' }}>地图2</h2>
        </LarkMap>
      </div>
    </div>
  );
};
```

## API

方法：syncScene(sceneArray,option)

### sceneArray

L7.Scene 的数组

### options

| 参数           | 说明                                                                 | 类型   | 默认值 |
| -------------- | -------------------------------------------------------------------- | ------ | ------ |
| zoomGap        | 用于设置同步场景的地图层级差                                         | number | 0      |
| mainSceneIndex | 搭配 zoomGap 使用，用于设置主场景，其余场景为主场景的 zoom + zoomGap | number | 0      |

## FAQ
