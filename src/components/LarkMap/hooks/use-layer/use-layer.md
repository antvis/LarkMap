---
title: useLayer
order: 2
toc: content
group:
  title: 容器组件
---

### 代码演示

```tsx | pure
import React, { useEffect } from 'react';
import { useLayer } from '@antv/lark-map';

const MyComponent = () => {
  const myBubbleLayer = useLayer('myBubbleLayer');

  useEffect(() => {
    myBubbleLayer?.fitBounds();
  }, []);

  return null;
};
```

### 默认示例

<code src="./demo/default.tsx"></code>
