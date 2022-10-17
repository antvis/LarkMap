---
toc: content
order: 9
group:
  title: 控件组件
  order: 2
nav:
  title: 组件
  path: /components
---

# 地图主题 - MapThemeControl

## 介绍

地图主题组件

## 使用场景

该控件用于切换地图底图的主题样式。

## 代码演示

### 默认示例

<code src="./demos/default.tsx" defaultShowCode compact></code>

## 配置

| 参数    | 说明                     | 类型                        |
| ------- | ------------------------ | --------------------------- |
| options | 用户自定义的地图主题选项 | `Array<IControlOptionItem>` |

## IControlOptionItem

```js
export type IControlOptionItem = {
  // 主题选项对应的文本
  text: string,
  // 主题选项对应地图主题 style 的 key 值
  value: string,
  // 主题选项对应展示的图片
  img?: string,
};
```

| 参数            | 说明                 | 类型              |
| --------------- | -------------------- | ----------------- |
| popperPlacement | 气泡相对于按钮的位置 | `PopperPlacement` |
| popperTrigger   | 气泡弹出的触发方式   | `click｜hover`    |
| popperClassName | 气泡容器自定义样式名 | `string`          |

### PopperPlacement

```js
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

| 参数      | 说明                                                      | 类型                      |
| --------- | --------------------------------------------------------- | ------------------------- |
| btnIcon   | 按钮图标                                                  | `HTMLElement｜SVGElement` |
| btnText   | 按钮内容文本                                              | `string`                  |
| title     | 按钮的 title 属性                                         | `string`                  |
| position  | 控件被添加到地图中的位置以及排列方式，详情可见 `控件插槽` | `Position`                |
| className | 自定义样式名                                              | `string`                  |
| style     | 自定义样式                                                | `string`                  |

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

| 参数         | 说明             | 类型             |
| ------------ | ---------------- | ---------------- |
| onPopperShow | 气泡显示时的回调 | `(this) => void` |
| onPopperHide | 气泡隐藏时的回调 | `(this) => void` |

| 参数         | 说明                   | 类型               |
| ------------ | ---------------------- | ------------------ |
| selectChange | 当所选值发生改变时触发 | `string｜string[]` |
