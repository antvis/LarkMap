---
toc: content
order: 5
group:
  title: 基础图层
  order: 1
nav:
  title: 组件
  path: /components
---

# 文本图层 - TextLayer

## 介绍

基于 [TextLayer](https://l7plot.antv.vision/zh/docs/api/base-layers/text-layer) 封装，用于文本展示。

## 代码演示

### 默认示例

<code src="./demos/default.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ref | 组件 Ref | `Ref<TextLayer>` | -- |
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
| field | 映射的标签数据字段 | `string` | `(必选)` |
| style | 元素样式 | `TextLayerStyleOptions` | -- |
| state | 元素交互反馈效果 | `StateAttribute` | -- |
| onCreated | 图层初始化完成后回调，用于获取 layer 对象 | `(layer: TextLayer) => void` | -- |

### source

<embed src="../../../../../docs/common/layer/point-layer/source.md"></embed>

### field

`string` required

映射的标签数据字段。

### style

<embed src="../../../../../docs/common/layer/text-layer/style.md"></embed>

### state

<embed src="../../../../../docs/common/layer/attribute/state.md"></embed>

## Event

<embed src="../../../../../docs/common/layer/base-common/event.md"></embed>

## FAQ

### 1. 如何获取图层实例？

详见 [获取图层实例](/components/layers/composite-layers/bubble-layer#1-如何获取图层实例)
