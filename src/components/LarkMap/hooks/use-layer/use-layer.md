---
title: useLayer
order: 2
toc: content
group:
  title: 容器组件
---

## useLayer

### 介绍

获取图层实例 Hook，配合图层组件一起使用，用于子组件拿到图层实例，该 Hook 需放到容器组件内部才能使用。

### 默认示例

<code src="./demo/default.tsx" defaultShowCode></code>

### API

```ts
const layer = useLayer<T>(id: string);
```

#### Params

| 参数 | 说明    | 类型     | 默认值   |
| ---- | ------- | -------- | -------- |
| id   | 图层 ID | `string` | `(必选)` |

#### Result

| 参数  | 说明     | 类型    |
| ----- | -------- | ------- |
| layer | 图层实例 | `Layer` |
