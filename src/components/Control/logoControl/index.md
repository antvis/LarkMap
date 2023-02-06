---
toc: content
order: 1
group:
  title: 控件组件
  order: 2
nav:
  title: 组件
  path: /components
---

## 徽标 - LogoControl

### 介绍

用于在地图上展示 Logo 图片的控件，并且支持超链接点击跳转。

### 代码演示

<code src="./demos/default.tsx" defaultShowCode compact></code>

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| img | Logo 展示的图片 url | `string` | --- |
| href | 点击 Logo 跳转的超链接，不传则纯展示图片，点击不跳转 | `string` | --- |
| position | 控件被添加到地图中的位置以及排列方式详情可见 [控件插槽](https://l7.antv.antgroup.com/api/component/control/control#插槽) | [Position](#position) | --- |
| className | 自定义样式名 | `string` | --- |
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
