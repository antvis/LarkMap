#### `icon.`field

`string` optional

图标映射关联字段。

#### `icon.`value

`string|string[]|Function` optional 映射图标类型

```js
{
  icon: {
    field: 't',
    value: ['a','b','c']
  }
}
```

#### `icon.`scale

icon scale 通常使用枚举类型 cat scale

`ScaleConfig` optional default: `{}`

关联字段的映射 scale 类型，有以下 scale 类型：

- linear：线性
- power：指数
- log：对数
- quantile：等分位
- quantize：等间距
- cat：枚举

```js
{
  icon: {
    field: 'name',
    value: ['icon1','icon',],
    scale: { type: 'cat' },
  }
}
```
