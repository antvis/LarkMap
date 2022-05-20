---
title: useScene
order: 1
toc: content
group:
  title: 容器组件
---

## useScene

### 代码演示

```tsx | pure
import React from 'react';
import { LarkMap, useScene } from '@antv/lark-map';

const MyComponent = () => {
  const scene = useScene();

  return <h1 style={{ position: 'absolute', left: '10px' }}>loaded: {scene.loaded}</h1>;
};
```

### 默认示例

<code src="./demo/default.tsx"></code>
