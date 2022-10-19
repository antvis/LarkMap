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

# 缩放器 - ZoomControl

## 介绍

地图缩放组件，可以操控当前地图的缩放层级。

## 代码演示

<code src="./demos/default.tsx" defaultShowCode compact></code>

## 配置

| 参数         | 说明                                                      | 类型              |
| ------------ | --------------------------------------------------------- | ----------------- |
| zoomInText   | 放大按钮的展示内容                                        | `Element｜string` |
| zoomInTitle  | 放大按钮的 title 属性                                     | `string`          |
| zoomOutText  | 缩小按钮的展示内容                                        | `Element｜string` |
| zoomOutTitle | 缩小按钮的 title 属性                                     | `string`          |
| position     | 控件被添加到地图中的位置以及排列方式，详情可见 `控件插槽` | `Position`        |
| className    | 自定义样式名                                              | `string`          |
| style        | 自定义样式                                                | `string`          |

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

## 方法

| 参数         | 说明                                   | 类型                                   |
| ------------ | -------------------------------------- | -------------------------------------- |
| zoomIn       | 放大地图                               | `() => void`                           |
| zoomOut      | 缩小底图                               | `() => void`                           |
| setOptions   | 更新配置，参数需要参考对应组件的`配置` | `(newOption: Partial<Option>) => void` |
| getOptions   | 获取当前`配置`                         | `() => Option`                         |
| show         | 显示组件                               | `() => void`                           |
| hide         | 隐藏组件                               | `() => void`                           |
| getContainer | 获取当前控件对应的 DOM 容器            | `() => HTMLElement`                    |

## 事件

| 参数     | 说明               | 类型             |
| -------- | ------------------ | ---------------- |
| onAdd    | 组件被添加时的事件 | `(this) => void` |
| onRemove | 组件被移除时的事件 | `(this) => void` |
| onShow   | 组件显示时的事件   | `(this) => void` |
| onHide   | 组件隐藏时的事件   | `(this) => void` |
