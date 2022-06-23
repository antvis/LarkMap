---
toc: content
order: 1
group:
  title: 绘制组件
  order: 7
nav:
  title: 组件
  path: /components
---

# 绘制控制条 - DrawControl

## 介绍

基于 [L7 Draw](https://antv.vision/l7-draw-2.0-site/) 的绘制控制条，当前支持点、线、面、矩形、圆形绘制的开关，以及清除操作。 当前每种类型的绘制物，只能在当前绘制激活的时候才能进行编辑。

## 代码演示

### 默认示例

<code src="./demos/default.tsx" compact></code>

### 初始化绘制数据

<code src="./demos/initData.tsx" compact></code>

## API

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| config | 配置当前展示哪几个 Control 项，以及各个 Control 项的配置 | [DrawConfig](#DrawConfig) | {<br />"point":true,<br />"line":true,<br />"polygon":true,<br />"rect":true,<br />"circle":true,<br />"clear":true<br />} |
| data | 当前展示的绘制数据 | Partial&lt;[DrawData](#DrawData)&gt; &#124; `undefined` | -- |
| onChange | 当数据发生变更的时候的回调函数 | (Partial&lt;[DrawData](#DrawData)&gt;) => void &#124; `undefined` | -- |
| vertical | Control 项 是否垂直排列 | `boolean` | `false` |
| position | Control 位置 | [见 CustomControl 配置的 position 配置](/components/custom-control#api) | `topleft` |
| className | Control 自定义样式 | `string` &#124; `undefined` | -- |
| drawStyle | L7 Draw 中的样式配置 | [见 L7 Draw Style 配置](https://antv.vision/l7-draw-2.0-site/docs/super/style) | -- |
| editable | 绘制后是否支持编辑，会自动赋给每个类型的 Draw 实例 | `boolean` | `true` |
| autoFocus | 绘制后是否自动激活，会自动赋给每个类型的 Draw 实例 | `boolean` | `true` |
| addMultiple | 在单次 enable 激活绘制中，是否支持绘制多个绘制物，会自动赋给每个类型的 Draw 实例 | `boolean` | `true` |
| multiple | 是否始终支持绘制多个绘制物，会自动赋给每个类型的 Draw 实例 | `boolean` | `true` |
| disableEditable | Draw 在禁用状态下是否支持编辑绘制物，建议在只有单个 Draw 项开启该配置，会自动赋给每个类型的 Draw 实例 | `boolean` | `false` |

### DrawConfig

| 属性名 | 描述 | 类型 |
| --- | --- | --- |
| point | 是否展示**绘制点**的 Control 项，传 false 表示不展示该 Control 项，options 配置 [详情可见](https://antv.vision/l7-draw-2.0-site/docs/draw/point) | [DrawItemConfig](#DrawItemConfig) &#124; boolean |
| line | 是否展示**绘制线**的 Control 项，传 false 表示不展示该 Control 项，options 配置 [详情可见](https://antv.vision/l7-draw-2.0-site/docs/draw/line) | [DrawItemConfig](#DrawItemConfig) &#124; boolean |
| polygon | 是否展示**绘制面**的 Control 项，传 false 表示不展示该 Control 项，options 配置 [详情可见](https://antv.vision/l7-draw-2.0-site/docs/draw/polygon) | [DrawItemConfig](#DrawItemConfig) &#124; boolean |
| rect | 是否展示**绘制矩形**的 Control 项，传 false 表示不展示该 Control 项，options 配置 [详情可见](https://antv.vision/l7-draw-2.0-site/docs/draw/rect) | [DrawItemConfig](#DrawItemConfig) &#124; boolean |
| circle | 是否展示**绘制圆形**的 Control 项，传 false 表示不展示该 Control 项，options 配置 [详情可见](https://antv.vision/l7-draw-2.0-site/docs/draw/circle) | [DrawItemConfig](#DrawItemConfig) &#124; boolean |
| clear | 是否展示**清除**的 Control 项，传 false 表示不展示该 Control 项，无 options 配置 | [DrawItemConfig](#DrawItemConfig) &#124; boolean |

### DrawItemConfig

| 属性名 | 描述 | 类型 |
| --- | --- | --- |
| title | 在 Control 项悬停时展示的文本 | `string` |
| icon | 在 Control 项中展示 React 组件，可以根据参数 isActive 切换展示效果 | `({ isActive: boolean }) => JSX.Element` |
| options | 对应各个 Draw 绘制类的配置参数，详情可见 [L7 Draw](https://antv.vision/l7-draw-2.0-site/docs/draw/) ，非绘制类 Control 无需配置（如 clear） | {} |

### DrawData

以下各个类型的数据均为 GeoJSON 规范中，不同类型的[Geometry Object](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1)数组，当前各个类型均不支持 Multiple 类型的数据。

| 属性名 | 描述 | 类型 |
| --- | --- | --- |
| point | [Point 类型](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.2)的数组 | `Feature&lt;Point&gt;[]` |
| line | [LineString 类型](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.4)的数组 | F`eature&lt;LineString&gt;[]` |
| polygon | [Polygon 类型](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6)的数组 | `Feature&lt;Polygon&gt;[]` |
| rect | [Polygon 类型](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6)的数组 | `Feature&lt;Polygon&gt;[]` |
| circle | [Polygon 类型](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6)的数组 | `Feature&lt;Polygon&gt;[]` |
