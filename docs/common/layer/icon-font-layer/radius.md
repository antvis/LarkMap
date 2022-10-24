`number|SizeStyleAttribute|Function` optional

标注半径大小。

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
  size: { field: 's' },
}
```

#### `radius.`value

`number|number[]|Function` optional

元素大小值映射值。

```js
{
  size: {
    field: 't',
    value: ({ t }) => {
      return t > 20 ? 15 : 12
    }
  }
}
```

#### `radius.`scale

<embed src="../attribute/scale.md"></embed>

```js
{
  radius: {
    field: 't',
    value: [12, 15],
    scale: { type: 'quantile' },
  }
}
```
