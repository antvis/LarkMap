<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.en-US.md) | 简体中文

<h1 align="center">LarkMap</h1>

<div align="center">

🌍 基于 <a href="https://github.com/antvis/L7">L7</a> 的空间数据可视分析 React 组件库.

<!-- [![NPM downloads](https://img.shields.io/npm/dm/@antv/larkmap.svg)](https://npmjs.com/@antv/larkmap) -->
<!-- ![Latest commit](https://badgen.net/github/last-commit/antvis/LarkMap) -->

[![npm Version](https://img.shields.io/npm/v/@antv/larkmap.svg)](https://www.npmjs.com/package/@antv/larkmap) [![npm License](https://img.shields.io/npm/l/@antv/larkmap.svg)](https://www.npmjs.com/package/@antv/larkmap) ![Status](https://badgen.net/github/status/antvis/LarkMap) [![Release Status](https://github.com/antvis/LarkMap/workflows/release/badge.svg?branch=master)](https://github.com/antvis/LarkMap/actions?query=workflow:release)

<!-- [![Coverage Status](https://coveralls.io/repos/github/antvis/LarkMap/badge.svg)](https://coveralls.io/github/antvis/LarkMap) -->

[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/LarkMap.svg)](http://isitmaintained.com/project/antvis/LarkMap 'Percentage of issues still open') [![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/antvis/LarkMap.svg)](http://isitmaintained.com/project/antvis/LarkMap 'Average time to resolve an issue')

<p align="center">
  <a href="https://larkmap.antv.antgroup.com">网站</a> •
  <a href="https://larkmap.antv.antgroup.com/guide">快速开始</a> •
  <a href="https://larkmap.antv.antgroup.com/components/lark-map">组件</a>
</p>

</div>

## 📦 安装

```bash
$ npm install @antv/l7 @antv/larkmap
```

## 🔨 使用

```jsx
import React from 'react';
import { LarkMap } from '@antv/larkmap';

const config = {
  mapType: 'Gaode',
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

## 本地开发

```bash
# Install project dependencies
$ npm install

# Run website
$ npm run start

# Run lint & unit tests
$ npm run ci

# Compile package
$ npm run build
```

## 🤝 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/LarkMap/issues) 看看有没有类似的 bug 或者建议。

如需提交代码，请遵从我们的[贡献指南](https://www.yuque.com/docs/share/fc554034-9331-4cc3-be03-10a2d32b6459)。

## 许可证

MIT@[AntV](https://github.com/antvis).
