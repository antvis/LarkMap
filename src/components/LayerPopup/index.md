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

## 图层信息框 - LayerPopup

### 介绍

图层信息框组件，一般用于展示地图图层要素的属性信息。

### 代码演示

<code src="./demos/default.tsx" compact defaultShowCode></code>

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 需要展示 Popup 的图层配置数组，每个选项类型可见 [LayerPopupConfigItem](#LayerPopupConfigItem) | `Array<LayerPopupConfigItem>` | `[]` |
| trigger | 鼠标触发 Popup 展示的方式 | `'hover'｜'click'` | `'hover'` |
| title | Popup 标题 | `ReactNode` | - |
| className | Popup 自定义 `className` | `string` | - |
| style | Popup 样式 | `CSSProperties` | - |
| closeOnClick | 点击地图区域时，是否关闭当前 Popup | `boolean` | `true` |
| closeOnEsc | 点击 Esc 键时，是否关闭当前 Popup | `boolean` | `false` |
| maxWidth | Popup 的最大宽度 | `string` | `'240px'` |
| anchor | Popup 箭头位置，可以控制 Popup 相对于经纬度点的展示位置 | [AnchorType](#anchortype) | `'bottom'` |
| offsets | Popup 相对于锚点的偏移 | `[number, number]` | `[0, 0]` |
| autoPan | 当 Popup 展示或者位置发生变化时，地图是否要自动平移至 Popup 所在位置 | `boolean` | `false` |
| autoClose | 当有其他 Popup 展示时，是否自动关闭当前气泡 | `boolean` | `true` |
| closeButton | 是否展示关闭 Popup 图标 | `boolean` | `true` |
| closeButtonOffsets | 关闭 Popup 图标的相对偏移 | `[number, number]` | - |
| stopPropagation | Popup 上的鼠标事件是否要阻止其冒泡 | `boolean` | `true` |
| onOpen | Popup 被添加时回调 | `() => void` | - |
| onClose | Popup 被移除时回调 | `() => void` | - |
| onShow | Popup 显示时回调 | `() => void` | - |
| onHide | Popup 隐藏时回调 | `() => void` | - |

#### LayerPopupConfigItem

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| layer | 需要展示 Popup 的目标图层实例，或其的 id 或 name | `BaseLayer｜string` |
| fields | 需要展示的字段数组，支持传入字段 key 值字符串，或者针对该字段的详细配置 [LayerField](#LayerField) | `string｜LayerField` |

#### LayerField

| 参数        | 说明                        | 类型                                |
| ----------- | --------------------------- | ----------------------------------- |
| field       | 字段的 key 值字符串         | `string`                            |
| formatField | 对展示的 key 字段进行格式化 | `(field: string) => string｜string` |
| formatValue | 对展示的 value 值进行格式化 | `(value: any) => any｜string`       |
