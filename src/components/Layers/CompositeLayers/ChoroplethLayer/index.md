---
toc: content
order: 2
group:
  title: 复合图层
  order: 1
nav:
  title: 组件
  path: /components
  order: 2
---

# 区域图层 - ChoroplethLayer

## 介绍

基于 [ChoroplethLayer](https://l7plot.antv.vision/zh/docs/api/composite-layers/choropleth-layer) 封装，用于面数据展示，支持描边、文本标注、多选等功能。

## 代码演示

### 默认示例

<code src="./demos/default.tsx"></code>

## API

<API hideTitle></API>

### source

<embed src="../../../../../docs/common/layer/polygon-layer/source.md"></embed>

### fillColor

`string|ColorStyleAttribute|Function` optional default: `'#5FD3A6'`

填充颜色。

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

`object` optional

区域面交互反馈效果。

```js
{
  state: {
    active: {
      fillColor: false,
      strokeColor: '#2f54eb',
      lineWidth: 1,
    },
    select: false,
  }
}
```

#### `state.`active

`boolean｜ChoroplethLayerActiveOptions` optional default: `false`

ChoroplethLayerActiveOptions 配置如下：

| 属性        | 描述       | 类型            | 默认值      | 是否必填 |
| ----------- | ---------- | --------------- | ----------- | -------- |
| fillColor   | 填充颜色   | `false｜string` | `false`     | optional |
| strokeColor | 描边颜色   | `false｜string` | `'#2f54eb'` | optional |
| lineWidth   | 描边的宽度 | `number`        | `1`         | optional |
| lineOpacity | 描边透明度 | `number`        | `1`         | optional |

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
    }
  }
}
```

#### `state.`select

`boolean｜AreaLayerActiveOptions` optional default: `false`

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

详见 [获取图层实例](/components/layers/composite-layers/bubble-layer#1-如何获取图层实例)
