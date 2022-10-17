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

## 使用场景

使用浏览器环境的 nagigator 的 getlocation 方法，使用浏览器打开位置感应能力获取当前用户所在经纬度。

## 代码演示

### 默认示例

<code src="./demos/default.tsx" defaultShowCode compact></code>

## 配置

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| transform | 格式化通过 getlocation 获取到的经纬度的函数，可以用于地理坐标系的转换 | `(position: [number, number]) => [number, number]` |

| 参数     | 说明                                                    | 类型                      |
| -------- | ------------------------------------------------------- | ------------------------- |
| btnIcon  | 按钮图标                                                | `HTMLElement｜SVGElement` |
| btnText  | 按钮内容文本                                            | `string`                  |
| title    | 按钮的 title 属性                                       | `string`                  |
| vertical | 在 btnIcon 有值的情况下，按钮内的图标和文案是否纵向排列 | `boolean`                 |

| 参数      | 说明                                                      | 类型       |
| --------- | --------------------------------------------------------- | ---------- |
| position  | 控件被添加到地图中的位置以及排列方式，详情可见 `控件插槽` | `Position` |
| className | 自定义样式名                                              | `string`   |
| style     | 自定义样式                                                | `string`   |

### Position

```js
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

| 参数           | 说明                   | 类型                               |
| -------------- | ---------------------- | ---------------------------------- |
| getGeoLocation | 获取当前用户所在经纬度 | ` () => Promise<[number, number]>` |

| 参数         | 说明                                   | 类型                                   |
| ------------ | -------------------------------------- | -------------------------------------- |
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
