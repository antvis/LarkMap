---
toc: false
order: 4
group:
  title: 属性面板
  order: 2
nav:
  title: 区块
  path: /blocks
  order: 3
---

## 线图层样式属性面板 - LineLayerStyleAttribute

### 介绍

`LineLayerStyleAttribute` 是 [线图层 - LineLayer](/components/layers/base-layers/line-layer) 的样式属性配置组件，用于图层配置可视化场景。

### 代码演示

#### 默认示例

<code src="./demos/default.tsx" compact></code>

### API

#### LineLayerStyleAttributeSchemaField

| 属性名      | 描述     | 类型                      | 默认值   |
| ----------- | -------- | ------------------------- | -------- |
| fieldList   | 数据字段 | `FieldSelectOptionType[]` | `(必选)` |
| colorRanges | 色带配置 | `ColorRange[]`            | --       |

#### LineLayerStyleAttribute

| 属性名        | 描述               | 类型                                             | 默认值   |
| ------------- | ------------------ | ------------------------------------------------ | -------- |
| fieldList     | 数据字段           | `FieldSelectOptionType[]`                        | `(必选)` |
| colorRanges   | 色带配置           | `ColorRange[]`                                   | --       |
| initialValues | 初始值             | `LineLayerStyleAttributeValue`                   | `(必选)` |
| onChange      | 属性表单发生改变时 | `(values: LineLayerStyleAttributeValue) => void` | --       |
| className     | 类名               | `string`                                         | --       |
| style         | 容器内敛样式       | `CSSProperties`                                  | --       |