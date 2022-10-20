---
toc: content
order: 3
group:
  title: 控件组件
  order: 2
nav:
  title: 组件
  path: /components
---

# 比例尺 - ScaleControl

## 介绍

地图比例尺组件，用于显示地图上的距离与地面上相应距离的比率。

## 代码演示

<code src="./demos/default.tsx" defaultShowCode compact></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| lockWidth | 是否固定容器宽度 | `boolean` | `true` |
| maxWidth | 组件的容器最大宽度 | `number` | `100` |
| metric | 展示 `千米` 格式的比例尺 | `boolean` | `true` |
| imperial | 展示 `英里` 格式的比例尺 | `boolean` | `false` |
| updateWhenIdle | 是否只在拖拽和缩放结束后才更新比例尺 | `boolean` | `false` |
| position | 控件被添加到地图中的位置以及排列方式，详情可见 [控件插槽](https://l7.antv.vision/zh/docs/api/component/control/control#插槽) | [Position](#position) | `'bottomleft'` |
| className | 自定义样式名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| onAdd | 组件被添加时的回调 | `(this) => void` | - |
| onRemove | 组件被移除时的回调 | `(this) => void` | - |
| onShow | 组件显示时的回调 | `(this) => void` | - |
| onHide | 组件隐藏时的回调 | `(this) => void` | - |

### Position

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
