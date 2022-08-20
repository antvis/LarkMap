---
toc: content
order: 1
group:
  title: 复合图层
  order: 1
nav:
  title: 组件
  path: /components
---

# 气泡图层 - BubbleLayer

## 介绍

基于 [BubbleLayer](https://l7plot.antv.vision/zh/docs/api/composite-layers/bubble-layer) 封装，用于点数据以气泡形式展示，支持描边、文本标注、多选等功能。

## 代码演示

### 默认示例

<code src="./demos/default.tsx"></code>

## API

<API hideTitle></API>

### source

<embed src="../../../../../docs/common/layer/point-layer/source.md"></embed>

### fillColor

`string|ColorStyleAttribute|Function` optional default: `'#5FD3A6'`

填充颜色，填充颜色设置为常量如下：

```js
{ fillColor: 'red', }
```

#### `fillColor.`field

`string` optional

填充颜色值映射关联字段。

```js
{
  source: {
    data: [{ c: 'red', t: 20, n: 'chengdu' }],
    // ...
  },
  fillColor: { field: 'c', }
}
```

#### `fillColor.`value

`string|string[]|Function` optional

填充颜色值映射值。

```js
{
  fillColor: {
    field: 't',
    value: ({ t }) => {
      return t > 20 ? 'red': 'blue'
    }
  }
}
```

#### `fillColor.`scale

<embed src="../../../../../docs/common/layer/attribute/scale.md"></embed>

```js
{
  fillColor: {
    field: 't',
    value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
    scale: { type: 'quantile' }
  }
}
```

### radius

`number|SizeStyleAttribute|Function` optional

气泡半径大小

```js
{ radius: 12, }
```

#### `radius.`field

`string` optional

半径大小值映射关联字段。

```js
{
  source: {
    data: [{ s: 12, t: 20, n: 'chengdu' }],
    // ...
  },
  radius: { field: 's' },
}
```

#### `radius.`value

`number|number[]|Function` optional

元素大小值映射值。

```js
{
  radius: {
    field: 't',
    value: ({ t }) => {
      return t > 20 ? 15 : 12
    }
  }
}
```

#### `radius.`scale

<embed src="../../../../../docs/common/layer/attribute/scale.md"></embed>

```js
{
  radius: {
    field: 't',
    value: [12, 15],
    scale: { type: 'quantile' },
  }
}
```

### label

`LabelOptions` optional

标签标注。

#### `label.`field

`string` optional

标签值映射关联字段。

#### `label.`visible

`boolean` optional default: `true`

标签是否可见。

#### `label.`style

标签样式详细配置见 [TextLayerStyleOptions](/components/layers/base-layers/text-layer#style)。

### state

`StateAttribute` optional

元素交互反馈效果。

#### `state.`active

`boolean｜BubbleLayerActiveOptions` optional default: `false`

标签 mousehover 高亮效果，开启 mousehover 元素高亮效果：

```js
{
  state: { active: true, }
}
```

开启 mousehover 元素高亮效果并自定义设置高亮颜色：

```js
{
  state: {
    active: {
      fillColor: false,
      strokeColor: '#2f54eb',
      lineWidth: 1.5,
      lineOpacity: 1,
    },
  }
}
```

BubbleLayerActiveOptions 配置如下：

| 属性        | 描述       | 类型            | 默认值      | 是否必填 |
| ----------- | ---------- | --------------- | ----------- | -------- |
| fillColor   | 填充颜色   | `false｜string` | `false`     | optional |
| strokeColor | 描边颜色   | `false｜string` | `'#2f54eb'` | optional |
| lineWidth   | 描边的宽度 | `number`        | `1.5`       | optional |
| lineOpacity | 描边透明度 | `number`        | `1`         | optional |

#### `state.`select

`boolean｜BubbleLayerActiveOptions` optional default: `false`

元素 mouseclick 选中高亮效果，开启 mouseclick 元素高亮效果：

```js
{
  state: { select: true, }
}
```

开启 mousehover 元素高亮效果并自定义设置高亮颜色：

```js
{
  state: {
    select: {
      fillColor: false,
      strokeColor: '#2f54eb',
      lineWidth: 1.5,
      lineOpacity: 1,
    }
  }
}
```

## Event

<embed src="../../../../../docs/common/layer/composite-common/event.md"></embed>

#### 选择事件

| 事件名   | 类型         | 描述                         |
| -------- | ------------ | ---------------------------- |
| select   | 选择事件     | 鼠标点击选中图层要素事件     |
| unselect | 取消选择事件 | 鼠标点击取消选中图层要素事件 |

## FAQ

### 1. 如何获取图层实例？

1. 通过 onCreated 回调

```tsx | pure
import { BubbleLayer, LarkMap } from '@antv/larkmap';

const source = {
  data: [
    { lng: 120.210792, lat: 30.246026, c: 'red', t: 20, n: '杭州' },
    { lng: 121.473667, lat: 31.230525, c: 'blue', t: 24, n: '上海' },
  ],
  parser: { type: 'json', x: 'lng', y: 'lat' },
};

export default () => {
  const onLayerCreated = (layer) => {
    console.log(layer);
  };

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <BubbleLayer
        ref={bubbleLayerRef}
        source={source}
        autoFit={true}
        radius={40}
        fillColor="#0f9960"
        opacity={0.4}
        strokeColor="blue"
        lineWidth={2}
        onCreated={onLayerCreated}
      />
    </LarkMap>
  );
};
```

2. 挂载到 ref 上

```tsx | pure
import { BubbleLayer, LarkMap } from '@antv/larkmap';
import { useRef } from 'react';

const source = {
  data: [
    { lng: 120.210792, lat: 30.246026, c: 'red', t: 20, n: '杭州' },
    { lng: 121.473667, lat: 31.230525, c: 'blue', t: 24, n: '上海' },
  ],
  parser: { type: 'json', x: 'lng', y: 'lat' },
};

export default () => {
  const bubbleLayerRef = useRef();
  const onLayerCreated = (layer) => {
    console.log(layer);
    console.log(bubbleLayerRef.current);
  };

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <BubbleLayer
        ref={bubbleLayerRef}
        source={source}
        autoFit={true}
        radius={40}
        fillColor="#0f9960"
        opacity={0.4}
        strokeColor="blue"
        lineWidth={2}
        onCreated={onLayerCreated}
      />
    </LarkMap>
  );
};
```

3. 通过 Hooks ，详见 [useLayer](/components/lark-map/hooks/use-layer/use-layer)
