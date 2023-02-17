---
toc: false
order: 1
group:
  title: 属性面板
  order: 2
nav:
  title: 区块
  path: /blocks
  order: 3
---

## 气泡图层样式属性面板 - BubbleLayerStyleAttribute

### 介绍

`BubbleLayerStyleAttribute` 是 [气泡图层 - BubbleLayer](/components/layers/composite-layers/bubble-layer) 的样式属性配置组件，用于图层配置可视化场景。

### 代码演示

#### 默认示例

<code src="./demos/default.tsx" compact></code>

### API

#### BubbleLayerStyleAttributeSchemaField

| 属性名      | 描述     | 类型                      | 默认值   |
| ----------- | -------- | ------------------------- | -------- |
| fieldList   | 数据字段 | `FieldSelectOptionType[]` | `(必选)` |
| colorRanges | 色带配置 | `ColorRange[]`            | --       |

#### BubbleLayerStyleAttribute

| 属性名        | 描述               | 类型                                               | 默认值   |
| ------------- | ------------------ | -------------------------------------------------- | -------- |
| fieldList     | 数据字段           | `FieldSelectOptionType[]`                          | `(必选)` |
| colorRanges   | 色带配置           | `ColorRange[]`                                     | --       |
| initialValues | 初始值             | `BubbleLayerStyleAttributeValue`                   | `(必选)` |
| onChange      | 属性表单发生改变时 | `(values: BubbleLayerStyleAttributeValue) => void` | --       |
| className     | 类名               | `string`                                           | --       |
| style         | 容器内敛样式       | `CSSProperties`                                    | --       |
