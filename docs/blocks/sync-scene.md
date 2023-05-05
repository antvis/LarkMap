---
toc: false
order: 2
nav:
  title: 区块
  path: /blocks
  order: 3
---

# 同步地图

## 介绍

用于同步地图状态「缩放层级、地图中心点、旋转角、倾斜角」。

支持 Gaode 和 Mapbox 两种地图引擎类型

### 使用场景

适用于同步多个场景的地图状态，适用于两幅或多幅地图的联动。

## 代码演示

### 示例一：基础使用

```tsx
/**
 * compact: true
 */
import type { Scene } from '@antv/l7';
import { LarkMap, syncScene } from '@antv/larkmap';
import React from 'react';

export default () => {
  const [sceneArray, setSceneArray] = React.useState([]);
  const clearRef = React.useRef<() => void>();
  const onSceneLoaded = (scene: Scene) => {
    setSceneArray((oldValue) => [...oldValue, scene]);
  };

  const clearSync = () => {
    if (clearRef.current) clearRef.current();
  };
  const addSync = () => {
    clearRef.current = syncScene(sceneArray);
  };

  return (
    <div>
      <button onClick={addSync}>添加场景同步</button>
      <button onClick={clearSync}>清除同步</button>
      <div style={{ display: 'flex', flexDirection: 'row', height: '300px' }}>
        <LarkMap
          id="baseScene"
          mapType="Gaode"
          mapOptions={{ style: 'light', center: [120.210792, 30.246026], zoom: 9 }}
          onSceneLoaded={onSceneLoaded}
          style={{ flex: 1 }}
        >
          <h2 style={{ position: 'absolute', left: '10px' }}>地图1</h2>
        </LarkMap>
        <LarkMap
          id="baseScene2"
          mapOptions={{ style: 'dark', center: [120.210792, 30.246026], zoom: 9 }}
          onSceneLoaded={onSceneLoaded}
          onSceneLoaded={onSceneLoaded}
          style={{ flex: 1 }}
        >
          <h2 style={{ position: 'absolute', left: '10px' }}>地图2</h2>
        </LarkMap>
      </div>
    </div>
  );
};
```

### 示例二： 设置 zoomGap

```tsx
/**
 * compact: true
 */
import type { Scene } from '@antv/l7';
import { LarkMap, syncScene } from '@antv/larkmap';
import React from 'react';

export default () => {
  const [sceneArray, setSceneArray] = React.useState([]);
  const [zoomGap, setZoomGap] = React.useState<Number>();
  const onSceneLoaded = (scene: Scene) => {
    setSceneArray((oldValue) => [...oldValue, scene]);
  };
  const changeHandler = (e) => {
    // 转为 Number 类型
    const gap = Number(e.target.value);
    setZoomGap(gap);
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
        <LarkMap
          id="gapScene"
          mapType="Gaode"
          mapOptions={{ style: 'light', center: [120.210792, 30.246026], zoom: 9 }}
          onSceneLoaded={onSceneLoaded}
          style={{ flex: 1 }}
        >
          <h2 style={{ position: 'absolute', left: '10px' }}>主地图</h2>
        </LarkMap>
        <LarkMap
          id="gapScene2"
          mapOptions={{ style: 'dark', center: [120.210792, 30.246026], zoom: 9 }}
          onSceneLoaded={onSceneLoaded}
          style={{ flex: 1 }}
        >
          <h2 style={{ position: 'absolute', left: '10px' }}>地图2</h2>
        </LarkMap>
      </div>
    </div>
  );
};
```

### 示例三：多地图场景同步

```tsx
/**
 * compact: true
 */
import type { Scene } from '@antv/l7';
import type { LarkMapProps } from '@antv/larkmap';
import { LarkMap, syncScene } from '@antv/larkmap';
import React from 'react';
const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    zoom: 9,
  },
};
export default () => {
  const [sceneArray, setSceneArray] = React.useState([]);
  const clearRef = React.useRef<() => void>();
  const onSceneLoaded = (scene: Scene) => {
    setSceneArray((oldValue) => [...oldValue, scene]);
  };

  const clearSync = () => {
    if (clearRef.current) clearRef.current();
  };
  const addSync = () => {
    clearRef.current = syncScene(sceneArray, {
      zoomGap: 2,
      mainIndex: 0,
    });
  };

  return (
    <div>
      <button onClick={addSync}>添加场景同步</button>
      <button onClick={clearSync}>清除同步</button>
      <span>主地图与其余地图缩放层级差为 2</span>
      <div style={{ display: 'flex', flexDirection: 'row', height: '400px' }}>
        <LarkMap onSceneLoaded={onSceneLoaded} {...config} id="multiScene" style={{ flex: 1 }}>
          <h3 style={{ position: 'absolute', left: '10px' }}>主地图</h3>
        </LarkMap>
        <LarkMap onSceneLoaded={onSceneLoaded} {...config} id="multiScene2" style={{ flex: 1 }}>
          <h3 style={{ position: 'absolute', left: '10px' }}>地图2</h3>
        </LarkMap>
        <LarkMap onSceneLoaded={onSceneLoaded} {...config} id="multiScene3" style={{ flex: 1 }}>
          <h3 style={{ position: 'absolute', left: '10px' }}>地图3</h3>
        </LarkMap>
      </div>
    </div>
  );
};
```

## API

`syncScene(scenes: Scene[], options: { zoomGap: number, mainIndex: number })`

### scenes

LarkMap 加载完成的 Scene 实例数组

### options

| 参数        | 说明                                                                       | 类型     | 默认值 |
| ----------- | -------------------------------------------------------------------------- | -------- | ------ |
| `zoomGap`   | 用于设置同步场景的地图层级差                                               | `number` | 0      |
| `mainIndex` | 搭配 `zoomGap` 使用，用于设置主场景，其余场景为主场景的 `zoom` + `zoomGap` | `number` | 0      |
