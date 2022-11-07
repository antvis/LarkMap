---
toc: content
order: 4
group:
  title: 复合图层
  order: 1
nav:
  title: 组件
  path: /components
  order: 2
---

# 图片标注图层 - IconImageLayer

## 介绍

基于 [IconImageLayer ](https://l7plot.antv.vision/zh/docs/api/composite-layers/icon-image-layer) 封装，用于图标标注，支持自定义高亮、标注。

## 代码演示

### 默认示例

<code src="./demos/default.tsx"></code>

## API

<API hideTitle></API>

### source

<embed src="../../../../../docs/common/layer/point-layer/source.md"></embed>

### icon

`string|ShapeStyleAttribute|Function` optional

映射图片标注。

```js
{ icon: 'icon1', }
```

#### `icon.`field

`string` optional

图标映射关联字段。

#### `icon.`value

`string|string[]|Function` optional 映射图标类型

```js
{
  icon: {
    field: 't',
    value: ['A','B','C']
  }
}
```

#### `icon.`scale

icon scale 通常使用枚举类型 cat scale

<embed src="../../../../../docs/common/layer/attribute/scale.md"></embed>

```js
{
  icon: {
    field: 'name',
    value: ['icon1', 'icon',],
    scale: { type: 'cat' },
  }
}
```

### iconStyle

#### `iconStyle.`opacity

`number` optional default: `1`

图标透明度。

### radius

`number|SizeStyleAttribute|Function` optional

标注半径大小

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

`TextLayerOptions` optional

标签标注。

#### `label.`field

`string` optional

标签值映射关联字段。

#### `label.`visible

`boolean` optional default: `true`

标签是否可见。

#### `label.`style

标签样式详细配置见 [TextLayerStyleOptions](https://l7plot.antv.vision/zh/docs/api/composite-layers/text-layer#code-classlanguage-textoptionscodestyle)。

### state

`StateAttribute` optional

元素交互反馈效果。

#### `state.`active

`StateAttribute` optional

元素交互反馈效果。

#### `state.`active

`boolean｜Pick<IconLayerActiveOptions, 'enable' | 'color'>` optional default: `false`

标签 mousehover 高亮效果，开启 mousehover 元素高亮效果：

```js
{
  state: { active: true, }
}
```

开启 mousehover 元素高亮效果并自定义设置高亮颜色：

```js
{
  state: { active: { color: 'red', enable: true }, }
}
```

#### `state.`select

`boolean｜IconLayerActiveOptions` optional default: `false`

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
    select: { radius: 10, opacity: 1,}
  }
}
```

IconLayerActiveOptions 配置如下：

| 属性    | 描述       | 类型        | 默认值    | 是否必填 |
| ------- | ---------- | ----------- | --------- | -------- |
| enable  | 是否开启   | `boolean`   | `false`   | optional |
| icon    | 高亮图标名 | `ShapeAttr` |           | optional |
| radius  | 图标大小   | `number`    | `10`      | optional |
| color   | 图标颜色   | `string`    | `#2f54eb` | optional |
| opacity | 图标透明度 | `number`    | `1`       | optional |

## Event

<embed src="../../../../../docs/common/layer/core-common/event.md"></embed>

## FAQ

### 1. 如何获取图层实例？

详见 [获取图层实例](/components/layers/composite-layers/bubble-layer#1-如何获取图层实例)
