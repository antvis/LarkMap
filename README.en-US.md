<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.md)

<h1 align="center">LarkMap</h1>

<div align="center">

🌍 A React toolkit for geospatial visualization based on <a href="https://github.com/antvis/L7">L7</a>.

<!-- [![NPM downloads](https://img.shields.io/npm/dm/@antv/larkmap.svg)](https://npmjs.com/@antv/larkmap) -->
<!-- ![Latest commit](https://badgen.net/github/last-commit/antvis/LarkMap) -->

[![npm Version](https://img.shields.io/npm/v/@antv/larkmap.svg)](https://www.npmjs.com/package/@antv/larkmap) [![npm License](https://img.shields.io/npm/l/@antv/larkmap.svg)](https://www.npmjs.com/package/@antv/larkmap) ![Status](https://badgen.net/github/status/antvis/LarkMap) [![Release Status](https://github.com/antvis/LarkMap/workflows/release/badge.svg?branch=master)](https://github.com/antvis/LarkMap/actions?query=workflow:release)

<!-- [![Coverage Status](https://coveralls.io/repos/github/antvis/LarkMap/badge.svg)](https://coveralls.io/github/antvis/LarkMap) -->

[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/LarkMap.svg)](http://isitmaintained.com/project/antvis/LarkMap 'Percentage of issues still open') [![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/antvis/LarkMap.svg)](http://isitmaintained.com/project/antvis/LarkMap 'Average time to resolve an issue')

<p align="center">
  <a href="https://larkmap.antv.antgroup.com">Website</a> •
  <a href="https://larkmap.antv.antgroup.com/guide">Quick Start</a> •
  <a href="https://larkmap.antv.antgroup.com/components/lark-map">Components</a>
</p>

</div>

## 📦 Installation

```bash
$ npm install @antv/l7 @antv/larkmap
```

## 🔨 Usage

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

## Local Development

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

## 🤝 How to Contribute

Your contributions are always welcome! Please Do have a look at the [issues](https://github.com/antvis/LarkMap/issues) first.

To become a contributor, please follow our [contributing guide](https://www.yuque.com/docs/share/fc554034-9331-4cc3-be03-10a2d32b6459).

## License

MIT@[AntV](https://github.com/antvis).
