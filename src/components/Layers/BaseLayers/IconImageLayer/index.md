---
toc: content
order: 9
group:
  title: 复合图层
  order: 1
nav:
  title: 组件
  path: /components
---

# 图片标注图层 - IconImageLayer

## 介绍

基于 [IconImageLayer ](https://l7plot.antv.vision/zh/docs/api/composite-layers/icon-image-layer) 封装，用于图标标注，支持自定义高粱，标注、框选。

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
| iconAtlas | icon 图标资源 | `{[key: string]: string;}` | `(必选)` |
| radius | 标注半径大小 | `number｜SizeStyleAttribute｜Function` | -- |
| icon | 图标映射 | `icon` | `(必选)` |
| iconStyle | 标注样式与文字标注一致 | `iconStyle` | -- |
| label | 标签标注 | `TextLayerOptions` | -- |
| state | 元素交互反馈效果 | `StateAttribute` | -- |
| onCreated | 图层初始化完成后回调，用于获取 layer 对象 | `(layer: PointLayer) => void` | -- |

### source

<embed src="../../../../../docs/common/layer/point-layer/source.md"></embed>

### radius

<embed src="../../../../../docs/common/layer/icon-font-layer/radius.md"></embed>

### icon

<embed src="../../../../../docs/common/layer/icon-font-layer/icon.md"></embed>

### iconStyle

#### `iconStyle.`opacity

`number` optional default: `1`

图标透明度。

### label

<embed src="../../../../../docs/common/layer/icon-font-layer/label.md"></embed>

### state

<embed src="../../../../../docs/common/layer/attribute/state.md"></embed>

## Event

<embed src="../../../../../docs/common/layer/core-common/event.md"></embed>

## FAQ

### 1. 如何获取图层实例？

详见 [获取图层实例](/components/layers/composite-layers/bubble-layer#1-如何获取图层实例)
