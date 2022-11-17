---
toc: content
order: 5
group:
  title: 分析组件
  order: 3
nav:
  title: 组件
  path: /components
  order: 2
---

# 右键菜单 - ContextMenu

## 介绍

地图右键菜单组件

## 使用场景

## 代码演示

### 默认示例

<code src="./demos/default.tsx" compact defaultShowCode></code>

### 自定义菜单示例

<code src="./demos/custom.tsx"></code>

## API

| 属性名    | 描述     | 类型            | 默认值 |
| --------- | -------- | --------------- | ------ |
| childern  | 子组件   | `ReactNode`     | --     |
| className | 类名     | `string`        | --     |
| style     | 行内样式 | `CSSProperties` | --     |

### ContextMenu.Item

| 属性名    | 描述         | 类型            | 默认值   |
| --------- | ------------ | --------------- | -------- |
| text      | 菜单文本     | `string`        | `(必选)` |
| onClick   | 点击菜单事件 | `() => void`    | `(必选)` |
| className | 类名         | `string`        | --       |
| style     | 行内样式     | `CSSProperties` | --       |
