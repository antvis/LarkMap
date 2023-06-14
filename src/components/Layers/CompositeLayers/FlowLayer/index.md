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

#### `source`

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

#### `circleRadius`

客流点半径大小

```js
{
  circleRadius: 12;
}
```

#### `circleRadius`.field

`string` optional

客流点半径大小值映射关联字段。

```js
{
    circleRadius: {
    field: 'weight',
    value: [1, 16]
  }
}
```

#### `circleRadius`.value

`number|number[]|Function` optional

客流点大小值映射值。

```js
{
  circleRadius: {
    field: 'weight',
    value: ({ weight }) => {
      return t > 20 ? 15 : 12
    }
  }
}
```

#### `circleColor`.scale

<embed src="../../../../../docs/common/layer/attribute/scale.md"></embed>

```js
{
  circleColor: {
    field: 'weight',
    value: ['#B8E1FF', '#001D70'],
    scale: { type: 'linear' }
  }
}
```

#### `circleOpacity`

`number|[string, (data: any) => number]` optional

客流点透明度

```js
{
  circleOpacity: 0.5;
}
```

#### `circleStrokeColor`

`string` optional default: `#000`

客流点透明度

```js
{
  circleStrokeColor: '#000';
}
```

#### `circleStrokeWidth`

`number` optional default: `1`

客流点透宽度

```js
{
  circleStrokeWidth: 1;
}
```

#### `lineWidth`

`number|SizeStyleAttribute|Function` optional

客流线宽度大小

```js
{
  lineWidth: 12;
}
```

#### `lineWidth`.field

`string` optional

客流线宽度大小值映射关联字段。

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
  lineWidth: {
    field: 'weight',
    value: [1, 16]
  }
}
```

#### `lineWidth`.value

`number|number[]|Function` optional

客流线宽度大小值映射值。

```js
{
  lineWidth: {
    field: 'weight',
    value: ({ weight }) => {
      return t > 20 ? 15 : 12
    }
  }
}
```

#### `lineWidth`.scale

<embed src="../../../../../docs/common/layer/attribute/scale.md"></embed>

```js
{
  lineWidth: {
    field: 'weight',
    value: [12, 15],
    scale: { type: 'quantile' },
  }
}
```

#### `lineColor`

`string|LineColorStyleAttribute|Function` optional default: `'#5FD3A6'`

客流线填充颜色

```js
{
  lineColor: 'red';
}
```

#### `lineColor`.field

`string` optional

客流点填充颜色值映射关联字段。

```js
{
  lineColor: {
    field: 'weight';
  }
}
```

#### `lineColor`.value

`string|string[]|Function` optional

客流点填充颜色值映射值。

```js
{
  lineColor: {
    field: 'weight',
    value: ({ weight }) => {
      return weight > 20 ? 'red': 'blue'
    }
  }
}
```

#### `lineColor`.scale

<embed src="../../../../../docs/common/layer/attribute/scale.md"></embed>

```js
{
  lineColor: {
    field: 'weight',
    value: ['#B8E1FF', '#001D70'],
    scale: { type: 'linear' }
  }
}
```

#### `lineOpacity`

`number` optional

客流点透明度

```js
{
  lineOpacity: 0.5;
}
```

#### `fadeOpacityEnabled`

`boolean` optional default: `true`

客流线是否根据权重开启透明度渐变

#### `fadeOpacityAmount`

`number` optional default: `0`

客流线透明度渐变权重

