---
toc: false
order: 2
group:
  title: 属性面板
  order: 3
nav:
  title: 区块
  path: /blocks
  order: 3
---

## 热力图层样式属性 - HeatmapLayerStyleAttribute

### 介绍

`HeatmapLayerStyleAttribute` 是 [热力图层 - HeatmapLayer](/components/layers/base-layers/heatmap-layer) 的样式属性配置组件，用于图层配置可视化场景。

### 代码演示

#### 默认示例

<code src="./demos/default.tsx" compact></code>

### API

#### HeatmapLayerStyleAttributeSchemaField

| 属性名      | 描述     | 类型                      | 默认值   |
| ----------- | -------- | ------------------------- | -------- |
| fieldList   | 数据字段 | `FieldSelectOptionType[]` | `(必选)` |
| colorRanges | 色带配置 | `ColorRange[]`            | --       |

#### HeatmapLayerStyleAttribute

| 属性名        | 描述               | 类型                                                | 默认值   |
| ------------- | ------------------ | --------------------------------------------------- | -------- |
| fieldList     | 数据字段           | `FieldSelectOptionType[]`                           | `(必选)` |
| colorRanges   | 色带配置           | `ColorRange[]`                                      | --       |
| initialValues | 初始值             | `HeatmapLayerStyleAttributeValue`                   | `(必选)` |
| onChange      | 属性表单发生改变时 | `(values: HeatmapLayerStyleAttributeValue) => void` | --       |
| className     | 类名               | `string`                                            | --       |
| style         | 容器内敛样式       | `CSSProperties`                                     | --       |
