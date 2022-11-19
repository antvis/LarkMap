---
toc: content
order: 4
group:
  title: 控件组件
  order: 2
nav:
  title: 组件
  path: /components
---

# 全屏 - Fullscreen

## 介绍

全屏按钮控件，用于控制地图区域的全屏和退出全屏。

## 代码演示

<code src="./demos/default.tsx" defaultShowCode compact></code>

## 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| btnIcon | 按钮图标 | `ReactNode` | - |
| btnText | 按钮内容文本 | `string` | - |
| title | 按钮的 title 属性 | `string` | `'全屏'` |
| exitBtnIcon | 退出全屏按钮的图标 | `ReactNode` | - |
| exitBtnText | 退出全屏按钮的文本 | `string` | - |
| exitTitle | 退出全屏按钮的文本的 `title` 属性 | `string` | `'退出全屏'` |
| vertical | 在 btnIcon 有值的情况下，按钮内的图标和文案是否纵向排列 | `boolean` | `false` |
| position | 控件被添加到地图中的位置以及排列方式，详情可见 [控件插槽](https://l7.antv.antgroup.com/api/component/control/control#插槽) | [Position](#position) | `'topright'` |
| className | 自定义样式名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| onFullscreenChange | 当全屏状态发生变化时触发的回调 | `(isFullscreen: boolean) => void` | - |
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
