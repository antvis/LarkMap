---
title: 快速开始
order: 1
nav:
  title: 指南
  path: /guide
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

```tsx | pure
import { LarkMap } from '@antv/larkmap';
import React from 'react';

const config = {
  mapType: 'GaodeV1',
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

## 体验

```tsx | compact
import { LarkMap } from '@antv/larkmap';
import React from 'react';

const config = {
  mapType: 'GaodeV1',
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
