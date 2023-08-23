---
toc: content
order: 2
group:
  title: 控件组件
  order: 2
nav:
  title: 组件
  path: /components
---

## 缩放器 - ZoomControl

### 介绍

地图缩放组件，用于控制地图放大和缩小的控件，并且当地图达到最大或最小缩放比时，会禁用对应缩放按钮。

### 代码演示

<code src="./demos/default.tsx" defaultShowCode compact></code>

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| zoomInText | 放大按钮的展示内容 | `ReactNode` | - |
| zoomInTitle | 放大按钮的 `title` 属性 | `string` | `'Zoom in'` |
| zoomOutText | 缩小按钮的展示内容 | `ReactNode` | - |
| zoomOutTitle | 缩小按钮的 `title` 属性 | `string` | `'Zoom out'` |
| position | 控件被添加到地图中的位置以及排列方式，详情可见 [控件插槽](https://l7.antv.antgroup.com/api/component/control/control#插槽) | [Position](#position) | `'bottomright'` |
| showZoom | 是否展示地图当前实时 zoom 数值，默认向下取整 | `boolean` |
| className | 自定义样式名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| onAdd | 组件被添加时的回调 | `(this) => void` | - |
| onRemove | 组件被移除时的回调 | `(this) => void` | - |
| onShow | 组件显示时的回调 | `(this) => void` | - |
| onHide | 组件隐藏时的回调 | `(this) => void` | - |

#### Position

```ts
export type Position =
  | 'topleft' // ↖ 左上角，纵向排列
  | 'lefttop' // ↖ 左上角，横向排列
  | 'topright' // ↗ 右上角，纵向排列
  | 'righttop' // ↗ 右上角，横向排列
  | 'bottomleft' // ↙ 左下角，纵向排列
  | 'leftbottom' // ↙ 左下角，横向排列
  | 'bottomright' // ↘ 右下角，纵向排列
  | 'rightbottom' // ↘ 右下角，横向排列
  | 'topcenter' // ↑ 上方中央，横向排列
  | 'bottomcenter' // ↓ 下方中间，横向排列
  | 'leftcenter' // ← 左边中间，纵向排列
  | 'rightcenter'; // → 右边中间，纵向排列
```
