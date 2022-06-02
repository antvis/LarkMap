---
toc: content
order: 1
group:
  title: 图层组件
  order: 1
nav:
  title: 组件
  path: /components
---

# 气泡图层 - BubbleLayer

## 介绍

BubbleLayer 用于点数据展示，支持文本标注。

## 代码演示

### 默认示例

<code src="./demos/default.tsx"></code>

## API

<API hideTitle></API>

### SourceOptions

<!-- <API hideTitle src="./types.ts" exports='["SizeAttr1"]'></API> -->

### ColorAttr

### SizeAttr

### TextLayerOptions

## FAQ

### 1. 如何获取图层实例？

1. 通过 onCreated 回调

```tsx | pure
import { BubbleLayer, LarkMap } from '@antv/larkmap';
import React from 'react';

const source = {
  data: [
    { lng: 120.210792, lat: 30.246026, c: 'red', t: 20, n: '杭州' },
    { lng: 121.473667, lat: 31.230525, c: 'blue', t: 24, n: '上海' },
  ],
  parser: { type: 'json', x: 'lng', y: 'lat' },
};

export default () => {
  const onLayerCreated = (layer) => {
    console.log(layer);
  };

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <BubbleLayer
        ref={bubbleLayerRef}
        source={source}
        autoFit={true}
        radius={40}
        fillColor="#0f9960"
        opacity={0.4}
        strokeColor="blue"
        lineWidth={2}
        onCreated={onLayerCreated}
      />
    </LarkMap>
  );
};
```

2. 挂载到 ref 上

```tsx | pure
import { BubbleLayer, LarkMap } from '@antv/larkmap';
import React, { useRef } from 'react';

const source = {
  data: [
    { lng: 120.210792, lat: 30.246026, c: 'red', t: 20, n: '杭州' },
    { lng: 121.473667, lat: 31.230525, c: 'blue', t: 24, n: '上海' },
  ],
  parser: { type: 'json', x: 'lng', y: 'lat' },
};

export default () => {
  const bubbleLayerRef = useRef();
  const onLayerCreated = (layer) => {
    console.log(layer);
    console.log(bubbleLayerRef.current);
  };

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <BubbleLayer
        ref={bubbleLayerRef}
        source={source}
        autoFit={true}
        radius={40}
        fillColor="#0f9960"
        opacity={0.4}
        strokeColor="blue"
        lineWidth={2}
        onCreated={onLayerCreated}
      />
    </LarkMap>
  );
};
```

3. 通过 Hooks ，详见 [useLayer](/components/lark-map/hooks/use-layer/use-layer)
