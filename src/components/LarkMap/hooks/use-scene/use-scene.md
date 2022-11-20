---
title: useScene
order: 1
toc: content
group:
  title: 容器组件
---

## useScene

### 介绍

获取 scene 实例 Hook，一般用于子组件拿到 scene 实例，**该 Hook 需放到容器组件内部才能使用**。

### 默认示例

<code src="./demos/default.tsx" compact defaultShowCode></code>

### API

```ts
const scene: Scene = useScene();
```

#### Result

| 参数  | 说明                                                                        | 类型    |
| ----- | --------------------------------------------------------------------------- | ------- |
| scene | scene 实例，实例方法详见 [L7 scene](https://l7.antv.antgroup.com/api/scene) | `Scene` |
