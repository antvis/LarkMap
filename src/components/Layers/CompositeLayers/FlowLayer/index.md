---
toc: content
order: 5
group:
  title: 复合图层
  order: 1
nav:
  title: 组件
  path: /components
---

## 客流图层 - FlowLayer

### 介绍

基于 [FlowLayer](https://l7plot.antv.antgroup.com/zh/docs/api/composite-layers/bubble-layer) 封装，用于客流数据以点和线形式展示，渐变色、多选等功能。

### 代码演示

#### 默认示例

<code src="./demos/default.tsx" compact></code>

### API

<API hideTitle></API>

`source`

数据配置，详见 source [文档](https://l7plot.antv.antgroup.com/zh/api/composite-layers/flow-layer)

```js
{
  source: {
    data: [
      {
        weight: 5501,
        f_lon: 121.5838545,
        f_lat: 31.14749588,
        t_lon: 121.6664482,
        t_lat: 31.14343923
      },
      // ...
    ],
    parser: {
      type: 'json',
      x: 'f_lon',
      y: 'f_lat',
      x1: 't_lon',
      y1: 't_lat',
      weight: 'weight',
    }
  },
}
```

`circleRadius`

客流点半径大小

```js
{
  circleRadius: 12;
}
```

`circleRadius`.field

客流点半径大小值映射关联字段。

```js
{
    circleRadius: {
    field: 'weight',
    value: [1, 16]
  }
}
```

`circleRadius`.value
