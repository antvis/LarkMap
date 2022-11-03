---
toc: content
order: 3
group:
  title: 分析组件
  order: 3
nav:
  title: 组件
  path: /components
---

# 图层信息框 - LayerPopup

## 介绍

图层信息框组件，一般用于展示地图图层要素的属性信息。

## 代码演示

<code src="./demos/default.tsx" compact defaultShowCode></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| config | 需要展示 Popup 的图层配置数组，每个选项类型可见 [LayerPopupConfigItem](#LayerPopupConfigItem) | `Array<LayerPopupConfigItem>` | `[]` |
| trigger | 鼠标触发 Popup 展示的方式 | 'hover'｜'click' | `hover` |
| onOpen | Popup 被添加时回调 | `()=>void` | `-` |
| onClose | Popup 被移除时回调 | `()=>void` | `-` |
| onShow | Popup 显示时回调 | `()=>void` | `-` |
| onHide | Popup 隐藏时回调 | `()=>void` | `-` |

### LayerPopupConfigItem

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| layer | 需要展示 Popup 的目标图层实例，或其的 id 或 name | `BaseLayer｜string` |
| fields | 需要展示的字段数组，支持传入字段 key 值字符串，或者针对该字段的详细配置 [LayerField](#LayerField) | `string｜LayerField` |

### LayerField

| 参数        | 说明                        | 类型                        |
| ----------- | --------------------------- | --------------------------- |
| field       | 字段的 key 值字符串         | `string`                    |
| formatField | 对展示的 key 字段进行格式化 | `(field: string) => string` |
| formatValue | 对展示的 value 值进行格式化 | `(value: any) => any`       |
| getValue    | 自定义获取值的方式          | `(feature: any) => any`     |
