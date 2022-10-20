---
toc: content
order: 5
group:
  title: 控件组件
  order: 2
nav:
  title: 组件
  path: /components
---

# 定位 - GeoLocate

## 介绍

定位组件

**注意：**

1. 在使用该能力时，会需要用户对浏览器打开位置感知能力进行鉴权。
2. 当前浏览器获取到的坐标是 WGS84 地理坐标系，在高德地图上使用会有偏差，可以使用 transform 配置进行坐标系的转换。

## 代码演示

<code src="./demos/default.tsx" defaultShowCode compact></code>

## API

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| transform | 格式化通过 getlocation 获取到的经纬度的函数，可以用于地理坐标系的转换 | `(position: [number, number]) => [number, number]` |
| btnIcon | 按钮图标 | `ReactNode` |
| btnText | 按钮内容文本 | `string` |
| title | 按钮的 title 属性 | `string` |
| vertical | 在 btnIcon 有值的情况下，按钮内的图标和文案是否纵向排列 | `boolean` |
| position | 控件被添加到地图中的位置以及排列方式，详情可见[控件插槽](https://l7.antv.vision/zh/docs/api/component/control/control#插槽) | [Position](#position) |
| className | 自定义样式名 | `string` |
| style | 自定义样式 | `CSSProperties` |
| onAdd | 组件被添加时的回调 | `(this) => void` |
| onRemove | 组件被移除时的回调 | `(this) => void` |
| onShow | 组件显示时的回调 | `(this) => void` |
| onHide | 组件隐藏时的回调 | `(this) => void` |

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
