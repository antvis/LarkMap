---
order: 4
toc: content
group:
  title: 绘制组件
---

# useDraw

## 介绍

用 Hook 的方式操作和管理 [L7Draw](https://antv.vision/L7Draw/docs/draw/point) 中的绘制实例，以及实例上的数据和方法，该 Hook 需放到容器组件内部才能使用。

## 默认示例

<code src="./demos/default.tsx" defaultShowCode compact></code>

<!-- <code src="./demos/options.tsx" compact></code> -->

## API

```tsx | pure
const { draw } = useDraw({
  type: DrawType,
  options: DrawOptions,
});
```

## Params

| 参数    | 说明                             | 类型                                                                     |
| ------- | -------------------------------- | ------------------------------------------------------------------------ |
| type    | L7 Draw 中的绘制类型字符串       | `'point' &#124; 'line' &#124; 'polygon' &#124; 'rect' &#124; 'circle'`   |
| options | type 对应绘制类的 `options` 参数 | [Options](https://antv.vision/L7Draw/docs/draw/point#%E9%85%8D%E7%BD%AE) |

## Result

| 返回值      | 说明               | 类型                                                                             |
| ----------- | ------------------ | -------------------------------------------------------------------------------- |
| draw        | 绘制类 Draw 实例   | `DrawPoint &#124; DrawLine &#124; DrawPolygon &#124; DrawRect &#124; DrawCircle` |
| drawData    | 绘制数据           | `Feature[]`                                                                      |
| setDrawData | 设置绘制数据的方法 | `(newData: Feature[]) => void`                                                   |
| getDrawData | 获取绘制数据的方法 | `() => Feature[]`                                                                |
| isEnable    | 当前 Draw 是否激活 | `boolean`                                                                        |
| enable      | 启用绘制           | `() => void`                                                                     |
| disable     | 禁用绘制           | `() => void`                                                                     |
