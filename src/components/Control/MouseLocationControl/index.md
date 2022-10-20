---
toc: content
order: 7
group:
  title: 控件组件
  order: 2
nav:
  title: 组件
  path: /components
---

# 光标经纬度 - MouseLocationControl

## 介绍

光标经纬度组件，用于实时展示当前光标在地图上所对应的经纬度。

## 代码演示

<code src="./demos/default.tsx" defaultShowCode compact ></code>

## 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| transform | 转换光标所在经纬度的回调函数 | `(position: [number, number]) => [number, number]` | - |
| position | 控件被添加到地图中的位置以及排列方式，详情可见 [控件插槽](https://l7.antv.vision/zh/docs/api/component/control/control#插槽) | [Position](#position) | `'bottomleft'` |
| className | 自定义样式名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| onLocationChange | 光标所在经纬度发生变化时触发的回调 | `(position: [number, number]) => void` | - |
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
