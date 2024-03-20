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

## 卷帘 - SwipeControl

### 介绍

该控件用于分屏对比两个地图上叠加图层，图层可以添加到地图的左侧（顶部）或右侧（底部）。未添加到卷帘上的图层将显示在两侧。

### 代码演示

<code src="./demos/default.tsx" defaultShowCode compact></code>

### API

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| orientation | 卷帘方向设置，默认 'vertical' | `vertical｜horizontal` |
| ratio | 卷帘的位置，值域为 0 到 1, 默认正中间为 0.5 | `number` | 
| layers | 卷帘左侧的图层 | `Array<ILayer｜string>` |
| rightLayers | 卷帘左侧的图层 | `Array<ILayer｜string>` | 
| className | 自定义样式名 | `string` | 
| style | 自定义样式 | `CSSProperties` | 
| onAdd | 组件被添加时的回调 | `(this) => void` | 
| onRemove | 组件被移除时的回调 | `(this) => void` | 
| onShow | 组件显示时的回调 | `(this) => void` |
| onHide | 组件隐藏时的回调 | `(this) => void` |
| onMoving | 卷帘移动事件 | `(data: {size: number[], ratio: number[]}) => void` |

