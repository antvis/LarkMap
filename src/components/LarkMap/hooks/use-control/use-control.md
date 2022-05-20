---
title: useControl
order: 3
toc: content
group:
  title: 容器组件
---

## useControl

### 代码演示

```tsx | pure
import React from 'react';
import { LarkMap, useControl } from '@antv/lark-map';

const MyControl = () => {
  const onCreate = (context: Scene) => {
    const el = document.createElement('div');
    el.innerHTML = 'My Control';

    return el;
  };

  const onRemove = (context: Scene) => {};

  useControl(onCreate, onRemove, { position: 'topleft' });
};
```

### 默认示例

<code src="./demo/default.tsx"></code>
