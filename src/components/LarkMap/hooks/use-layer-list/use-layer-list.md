---
title: useLayerList
debug: true
order: 3
toc: content
group:
  title: 容器组件
---

## useLayerList

### 介绍

获取当前 LarkMap 下所有的图层实例，并且会根据图层组件增删情况动态更新返回的图层数组。

### 默认示例

<code src="./demos/default.tsx" compact defaultShowCode></code>

### API

```ts
const layerList: Layer[] = useLayerList();
```

#### Result

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| layerList | 图层实例数组，详情可见 [L7Plot](https://l7plot.antv.antgroup.com/zh/docs/api/base-layers/point-layer) | `Array<Layer>` |
