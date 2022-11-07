---
title: 介绍
order: 1
nav:
  title: 指南
  path: /guide
  order: 1
---

## 介绍

LarkMap 是基于 L7 封装的 React 组件库，专注在位置可视分析领域，简单高效，开箱即用。

## 特性

- 简单高效，开箱即用
- 组件基于原子能力，自由灵活定制
- 使用 TypeScript 构建，提供完整的类型定义文件

## 安装

```bash
$ npm install --save @antv/l7 @antv/larkmap
# or
$ yarn add @antv/l7 @antv/larkmap
```

## 使用

```tsx | pure
import { LarkMap } from '@antv/larkmap';
import React from 'react';

const config = {
  mapType: 'Mapbox',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    pitch: 0,
    zoom: 10,
    rotation: 0,
    token: 'xxxx - token',
  },
};

export default () => {
  return <LarkMap {...config} style={{ height: '300px' }}></LarkMap>;
};
```

## 体验 💻

```tsx
import { LarkMap } from '@antv/larkmap';
import React from 'react';

const config = {
  mapType: 'GaodeV1',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    pitch: 0,
    zoom: 8,
    rotation: 0,
  },
};

export default () => {
  return <LarkMap {...config} style={{ height: '300px' }}></LarkMap>;
};
```
