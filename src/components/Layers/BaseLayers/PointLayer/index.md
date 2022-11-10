---
toc: content
order: 1
group:
  title: 基础图层
  order: 1
nav:
  title: 组件
  path: /components
---

# 点图层 - PointLayer

## 介绍

基于 [PointLayer](https://l7plot.antv.vision/zh/docs/api/base-layers/point-layer) 封装，用于点数据展示。

## 代码演示

### 默认示例

<code src="./demos/default.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ref | 组件 Ref | `Ref<PointLayer>` | -- |
| id | 图层 ID | `string` | -- |
| name | 图层名称 | `string` | -- |
| zIndex | 图层 | `number` | -- |
| visible | 图层是否可见 | `boolean` | `true` |
| minZoom | 图层最小可见层级 | `number` | -- |
| maxZoom | 图层最大可见层级 | `number` | -- |
| pickingBuffer | 图层拾取缓存配置，如 1px 宽度的线鼠标很难拾取到, 通过设置该参数可扩大拾取的范围 | `number` | `0` |
| autoFit | 图层加载成功后是否自动定位到图层数据可见范围，`注意`开启后图层数据发生更新时，地图也会自动缩放到图层的数据边界范围 | `boolean` | `false` |
| blend | 图层元素混合效果 | `"normal"｜"additive"｜"subtractive"｜"min"｜"max"｜"none"` | `"normal"` |
| source | 数据配置 | `SourceOptions` | `(必选)` |
| shape | 元素形状 | `ShapeAttr` | `'circle'` |
| color | 元素颜色 | `ColorAttr` | `'#5FD3A6'` |
| size | 元素大小 | `SizeAttr` | `'12'` |
| style | 元素样式 | `PointLayerStyleOptions` | -- |
| state | 元素交互反馈效果 | `StateAttribute` | -- |
| animate | 水波动画 | `boolean｜AnimateAttr` | `false` |
| onCreated | 图层初始化完成后回调，用于获取 layer 对象 | `(layer: PointLayer) => void` | -- |

### source

<embed src="../../../../../docs/common/layer/point-layer/source.md"></embed>

### shape

<embed src="../../../../../docs/common/layer/point-layer/shape.md"></embed>

### color

<embed src="../../../../../docs/common/layer/attribute/color.md"></embed>

### size

<embed src="../../../../../docs/common/layer/attribute/size.md"></embed>

### style

<embed src="../../../../../docs/common/layer/point-layer/style.md"></embed>

### state

<embed src="../../../../../docs/common/layer/attribute/state.md"></embed>

### animate

<embed src="../../../../../docs/common/layer/point-layer/animate.md"></embed>

## Event

<embed src="../../../../../docs/common/layer/base-common/event.md"></embed>

## FAQ

### 1. 如何获取图层实例？

详见 [获取图层实例](/components/layers/composite-layers/bubble-layer#1-如何获取图层实例)
