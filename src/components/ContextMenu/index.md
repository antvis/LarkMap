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

## 右键菜单 - ContextMenu

### 介绍

地图右键菜单组件，由于当用户右键单击地图时，弹出展示对应菜单项。

### 代码演示

#### 默认示例

<code src="./demos/default.tsx" compact></code>

#### 自定义菜单示例

<code src="./demos/custom.tsx" compact></code>

### API

| 属性名    | 描述     | 类型            | 默认值 |
| --------- | -------- | --------------- | ------ |
| childern  | 子组件   | `ReactNode`     | --     |
| className | 类名     | `string`        | --     |
| style     | 行内样式 | `CSSProperties` | --     |

#### ContextMenu.Item

| 属性名    | 描述         | 类型            | 默认值   |
| --------- | ------------ | --------------- | -------- |
| text      | 菜单文本     | `string`        | `(必选)` |
| onClick   | 点击菜单事件 | `() => void`    | `(必选)` |
| className | 类名         | `string`        | --       |
| style     | 行内样式     | `CSSProperties` | --       |
