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
import React, { useEffect } from 'react';
import { LarkMap, useScene } from '@antv/lark-map';

const MyComponent = () => {
  const scene = useScene();

  useEffect(() => {
    scene.setMapStyle('dark');
  }, []);

  return null;
};
```

### 默认示例

<code src="./demo/default.tsx"></code>
