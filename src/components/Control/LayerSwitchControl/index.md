---
toc: content
order: 8
group:
  title: 控件组件
  order: 2
nav:
  title: 组件
  path: /components
---

# 图层显隐 - LayerSwitch

## 介绍

图层显隐组件，用于控制目标图层组的**显示**和**隐藏**操作。

## 代码演示

<code src="./demos/default.tsx" defaultShowCode compact></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layers | 需要被控制的 `layer` 数组，支持传入图层实例或者图层 id，不传则默认读取当前 L7 中所有的图层 | `Array<ILayer &#124; string>` | [] |
| popperPlacement | 气泡相对于按钮的位置 | [PopperPlacement](#popperplacement) | `'left-start'` |
| popperTrigger | 气泡弹出的触发方式 | `click｜hover` | `'click'` |
| popperClassName | 气泡容器自定义样式名 | `string` | - |
| btnIcon | 按钮图标 | `ReactNode` | - |
| btnText | 按钮内容文本 | `string` | - |
| title | 按钮的 title 属性 | `string` | `'图层控制'` |
| vertical | 在 btnIcon 有值的情况下，按钮内的图标和文案是否纵向排列 | `boolean` | `false` |
| position | 控件被添加到地图中的位置以及排列方式，详情可见 [控件插槽](https://l7.antv.vision/zh/docs/api/component/control/control#插槽) | [Position](#position) | `'topright'` |
| className | 自定义样式名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| onAdd | 组件被添加时的回调 | `(this) => void` | - |
| onRemove | 组件被移除时的回调 | `(this) => void` | - |
| onShow | 组件显示时的回调 | `(this) => void` | - |
| onHide | 组件隐藏时的回调 | `(this) => void` | - |
| onPopperShow | 气泡显示时的回调 | `(this) => void` | - |
| onPopperHide | 气泡隐藏时的回调 | `(this) => void` | - |
| onSelectChange | 图层显隐发生改变时的回调 | `(value: string[]) => void` | - |

### PopperPlacement

```ts
export type PopperPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'right-start'
  | 'right'
  | 'right-end';
```

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
