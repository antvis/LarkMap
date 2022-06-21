---
toc: content
order: 3
group:
  title: 绘制组件
  order: 7
nav:
  title: 组件
  path: /components
---

# 绘制弹框 - DrawModal

## 介绍

使用该组件能快速在弹框内绘制出 GeoJson 数据的需求。

## 代码演示

### 默认示例

<code src="./demos/default.tsx"></code>

### 绘制单一多边形示例

<code src="./demos/polygon.tsx"></code>

## API

DrawModal 除下方表格内的属性，其余组件属性继承于 Ant Design 的 [Modal 组件](https://ant.design/components/modal-cn/#API)。

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| larkMap | 地图组件的配置，详情可见 [LarkMap API](/components/lark-map#api) | [LarkMapProps](/components/lark-map#api) | `{ mapType: 'GaodeV1', style: {height: 400} }` |
| drawControl | 绘制 Control 的配置，详情可见 [DrawControl API](/components/draw/draw-control#api) | [DrawControlProps](/components/draw/draw-control#api) | `{}` |
| drawKeyboardHelper | 绘制快捷键提示框配置 [DrawKeyboardHelper API](/components/draw/draw-keyboard-helper#api) | [DrawKeyboardHelperProps](/components/draw/draw-keyboard-helper#api) or `boolean` | `{}` |
| onSubmit | 点击确认按钮的回调函数，会将当前绘制数据作为参数 | `(data: DrawData) => void` | - |
