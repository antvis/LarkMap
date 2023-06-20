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

基于 [FlowLayer](https://l7plot.antv.antgroup.com/api/composite-layers/flow-layer) 封装，用于客流数据以点和线形式展示，渐变色、多选等功能。

### 代码演示

#### 默认示例

<code src="./demos/default.tsx" compact></code>

### API

<API hideTitle></API>

### `source`

数据配置，详见 source [文档](https://l7plot.antv.antgroup.com/api/composite-layers/flow-layer#optionssource)

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

### `circleRadius`

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

### 事件监听

- 通过组件属性

```jsx | pure
<layerName onEventName={(...args) => {}} />
```

如果是子图层的事件可以参照以下案例进行事件名的转换

```jsx | pure
layer.on('circleLayer:click', (event) => {});
// 等价于
<FlowLayer onCircleLayerClick={(event) => {}} />;
```

- 通过实例绑定

```js
// 绑定事件
layer.on(eventName: string, callback: (...args) => void);
// 绑定一次事件
layer.once(eventName: string, callback: (...args) => void);
// 解绑事件
layer.off(eventName: string, callback: (...args) => void);
```

### 事件类别

#### 生命周期事件

| 事件名       | 类型         | 描述                           |
| ------------ | ------------ | ------------------------------ |
| inited       | 生命周期事件 | 图层初始化完成事件             |
| add          | 生命周期事件 | 图层添加到场景 scene 事件      |
| remove       | 生命周期事件 | 图层移除时事件                 |
| dataUpdate   | 生命周期事件 | 图层数据源更新事件             |
| show         | 生命周期事件 | 图层显示事件                   |
| hide         | 生命周期事件 | 图层隐藏事件                   |
| destroy      | 生命周期事件 | 图层摧毁事件                   |
| legend       | 生命周期事件 | 数据映射更新，图例更新事件     |
| legend:color | 生命周期事件 | 数据映射更新，颜色图例更新事件 |
| legend:size  | 生命周期事件 | 数据映射更新，大小图例更新事件 |

#### 客流点图层点击事件

| 事件名                    | 类型     | 描述               |
| ------------------------- | -------- | ------------------ |
| circleLayer:click         | 左键事件 | 左键点击图层事件   |
| circleLayer:unclick       | 左键事件 | 图层外左键点击事件 |
| circleLayer:dblclick      | 双击事件 | 双击图层事件       |
| circleLayer:undblclick    | 双击事件 | 图层外双击事件     |
| circleLayer:contextmenu   | 右键事件 | 右键点击图层事件   |
| circleLayer:uncontextmenu | 右键事件 | 图层外点击右键事件 |

#### 客流点图层鼠标事件

| 事件名                  | 类型     | 描述                       |
| ----------------------- | -------- | -------------------------- |
| circleLayer:mouseenter  | 滑动事件 | 鼠标进入图层要素事件       |
| circleLayer:mousemove   | 滑动事件 | 鼠标在图层上移动时触发事件 |
| circleLayer:unmousemove | 滑动事件 | 图层外鼠标移动事件         |
| circleLayer:mouseout    | 滑动事件 | 鼠标移出图层要素事件       |
| circleLayer:mouseup     | 滑动事件 | 鼠标在图层上单击抬起事件   |
| circleLayer:unmouseup   | 滑动事件 | 图层外鼠标抬起             |
| circleLayer:mousedown   | 滑动事件 | 鼠标在图层上单击按下事件   |
| circleLayer:unmousedown | 滑动事件 | 图层外单击按下事件         |
| circleLayer:unpick      | 鼠标事件 | 图层外的操作的所有事件     |

#### 客流线图层点击事件

| 事件名                  | 类型     | 描述               |
| ----------------------- | -------- | ------------------ |
| lineLayer:click         | 左键事件 | 左键点击图层事件   |
| lineLayer:unclick       | 左键事件 | 图层外左键点击事件 |
| lineLayer:dblclick      | 双击事件 | 双击图层事件       |
| lineLayer:undblclick    | 双击事件 | 图层外双击事件     |
| lineLayer:contextmenu   | 右键事件 | 右键点击图层事件   |
| lineLayer:uncontextmenu | 右键事件 | 图层外点击右键事件 |

#### 客流线图层鼠标事件

| 事件名                | 类型     | 描述                       |
| --------------------- | -------- | -------------------------- |
| lineLayer:mouseenter  | 滑动事件 | 鼠标进入图层要素事件       |
| lineLayer:mousemove   | 滑动事件 | 鼠标在图层上移动时触发事件 |
| lineLayer:unmousemove | 滑动事件 | 图层外鼠标移动事件         |
| lineLayer:mouseout    | 滑动事件 | 鼠标移出图层要素事件       |
| lineLayer:mouseup     | 滑动事件 | 鼠标在图层上单击抬起事件   |
| lineLayer:unmouseup   | 滑动事件 | 图层外鼠标抬起             |
| lineLayer:mousedown   | 滑动事件 | 鼠标在图层上单击按下事件   |
| lineLayer:unmousedown | 滑动事件 | 图层外单击按下事件         |
| lineLayer:unpick      | 鼠标事件 | 图层外的操作的所有事件     |
