---
toc: false
order: 2
group:
  title: 属性面板
  order: 2
nav:
  title: 区块
  path: /blocks
  order: 3
---

## 区域图层样式属性 - ChoroplethLayerStyleAttribute

### 介绍

`ChoroplethLayerStyleAttribute` 是 [区域图层 - ChoroplethLayer](/components/layers/composite-layers/choropleth-layer) 的样式属性配置组件，用于图层配置可视化场景。

### 代码演示

#### 默认示例

<code src="./demos/default.tsx" compact></code>

### API

#### ChoroplethLayerStyleAttributeSchemaField

| 属性名      | 描述     | 类型                      | 默认值   |
| ----------- | -------- | ------------------------- | -------- |
| fieldList   | 数据字段 | `FieldSelectOptionType[]` | `(必选)` |
| colorRanges | 色带配置 | `ColorRange[]`            | --       |

#### ChoroplethLayerStyleAttribute

| 属性名        | 描述               | 类型                                                   | 默认值   |
| ------------- | ------------------ | ------------------------------------------------------ | -------- |
| fieldList     | 数据字段           | `FieldSelectOptionType[]`                              | `(必选)` |
| colorRanges   | 色带配置           | `ColorRange[]`                                         | --       |
| initialValues | 初始值             | `ChoroplethLayerStyleAttributeValue`                   | `(必选)` |
| onChange      | 属性表单发生改变时 | `(values: ChoroplethLayerStyleAttributeValue) => void` | --       |
| className     | 类名               | `string`                                               | --       |
| style         | 容器内敛样式       | `CSSProperties`                                        | --       |
