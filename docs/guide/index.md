---
title: 快速开始
order: 1
nav:
  title: 指南
  path: /guide
  order: 1
---

## 介绍

新一代 React 地图可视分析组件库，提供丰富/高效/专业/易用的可视化组件，一站式满足地理可视化需求。

## 特性

- 简单高效，开箱即用
- 组件基于原子能力，自由灵活定制
- 使用 TypeScript 构建，提供完整的类型定义文件

## 安装

```bash
$ npm install -S @antv/l7 @antv/larkmap
# or
$ yarn add @antv/l7 @antv/larkmap
```

## 使用

```jsx | pure
import React from 'react';
import { LarkMap } from '@antv/larkmap';

const config = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    zoom: 10,
  },
};

export default () => {
  return <LarkMap {...config} style={{ height: '300px' }}></LarkMap>;
};
```

<br>

<details> 
<summary>CDN 使用方式</summary>

```html
<script src="https://gw.alipayobjects.com/os/lib/react/18.2.0/umd/react.production.min.js"></script>
<script src="https://gw.alipayobjects.com/os/lib/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@antv/l7@^2/dist/l7.js"></script>
<script src="https://unpkg.com/@antv/l7-draw@^3/dist/l7-draw.min.js"></script>
<script src="https://unpkg.com/@antv/larkmap@^1/dist/larkmap.min.js"></script>
<script>
  const { LarkMap } = window.LarkMap;
  const config = {
    mapType: 'Gaode',
    mapOptions: {
      style: 'light',
      center: [120.210792, 30.246026],
      zoom: 9,
      // token: 'xxxx - token',
    },
  };
  const APP = React.createElement(LarkMap, {
    ...config,
    style: { height: '300px' },
  });

  ReactDOM.render(APP, document.getElementById('root'));
</script>
```

</details>

## 体验

```jsx | compact
import React from 'react';
import { LarkMap } from '@antv/larkmap';

const config = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    zoom: 8,
  },
};

export default () => {
  return <LarkMap {...config} style={{ height: '300px' }}></LarkMap>;
};
```
