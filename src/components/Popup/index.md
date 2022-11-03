---
toc: content
order: 2
group:
  title: 分析组件
  order: 3
nav:
  title: 组件
  path: /components
---

# 信息框 - Popup

## 介绍

信息框组件，一般用于展示地图要素的属性信息。

## 代码演示

<code src="./demos/default.tsx" compact defaultShowCode></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| lngLat | Popup 所在的经纬度 | `{ lng: number; lat: number }` | `-` |
| text | Popup 内容展示的文本内容 | `string` | `-` |
| html | Popup 内容展示的自定义 HTML | `ReactNode` | `-` |
| title | Popup 标题展示的自定义 HTML | `ReactNode` | `-` |
| children | Popup 子组件 | `ReactNode` | `-` |
| style | Popup 样式 | `CSSProperties` | `-` |
| closeOnClick | 点击地图区域时，是否关闭当前 Popup | `boolean` | `true` |
| closeOnEsc | 点击 Esc 键时，是否关闭当前 Popup | `boolean` | `false` |
| maxWidth | Popup 的最大宽度 | `string` | `240px` |
| anchor | Popup 箭头位置，可以控制 Popup 相对于经纬度点的展示位置 | [AnchorType](#anchortype) | `bottom` |
| offsets | Popup 相对于锚点的偏移 | `[number, number]` | `[0, 0]` |
| autoPan | 当 Popup 展示或者位置发生变化时，地图是否要自动平移至 Popup 所在位置 | `boolean` | `false` |
| autoClose | 当有其他 Popup 展示时，是否自动关闭当前气泡 | `boolean` | `true` |
| followCursor | Popup 是否跟随光标移动，若设为 true，则 lngLat 配置无效 | `boolean` | `false` |
| closeButton | 是否展示关闭 Popup 图标 | `boolean` | `true` |
| closeButtonOffsets | 关闭 Popup 图标的相对偏移 | `[number, number]` | `-` |
| stopPropagation | Popup 上的鼠标事件是否要阻止其冒泡 | `boolean` | `true` |
| onOpen | Popup 被添加时回调 | `()=>void` | `-` |
| onClose | Popup 被移除时回调 | `()=>void` | `-` |
| onShow | Popup 显示时回调 | `()=>void` | `-` |
| onHide | Popup 隐藏时回调 | `()=>void` | `-` |

### AnchorType

```ts
export type AnchorType =
  | 'center'
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right';
```
