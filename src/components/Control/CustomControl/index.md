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

## 自定义控件 - CustomControl

### 介绍

地图自定义容器控件，用户可以通过 `CustomControl` 组件将自定义内容悬停在地图上。

### 代码演示

<code src="./demos/default.tsx" defaultShowCode compact></code>

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 控件被添加到地图中的位置以及排列方式，详情可见 [控件插槽](https://l7.antv.antgroup.com/api/component/control/control#插槽) | [Position](#position) | `'topleft'` |
| className | 自定义样式名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| children | 控件内容 | `ReactNode` | - |

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
