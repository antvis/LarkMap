---
toc: content
order: 1
group:
  title: 绘制组件
  order: 7
nav:
  title: 组件
  path: /components
---

# 绘制控制条 - DrawControl

## 介绍

基于[L7 Draw](https://antv.vision/l7-draw-2.0-site/)的绘制控制条，当前支持点、线、面、矩形、圆形绘制的开关，以及清除操作。 当前每种类型的绘制物，只能在当前绘制激活的时候才能进行编辑。

## 代码演示

### 默认示例

<code src="./demos/default.tsx" compact></code>

### 初始化绘制数据

<code src="./demos/initData.tsx" compact></code>

## API

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| config | 配置当前展示哪几个 Control 项，以及各个 Control 项的配置 | [DrawConfig](#DrawConfig) | {<br />"point":true,<br />"line":true,<br />"polygon":true,<br />"rect":true,<br />"circle":true,<br />"clear":true<br />} |
| data | 当前展示的绘制数据 | Partial&lt;[DrawData](#DrawData)&gt; or `undefined` | `undefined` |
| onChange | 当数据发生变更的时候的回调函数 | (Partial&lt;[DrawData](#DrawData)&gt;) => void or `undefined` | `undefined` |
| vertical | Control 项 是否垂直排列 | `boolean` | `false` |
| position | Control 位置 | [见 CustomControl 配置的 position 配置](/components/custom-control#api) | `topleft` |
| className | Control 自定义样式 | `string` or `undefined` | `undefined` |
| drawStyle | L7 Draw 中的样式配置 | [见 L7 Draw Style 配置](https://antv.vision/l7-draw-2.0-site/docs/super/style) | `undefined` |
| editable | 绘制后是否支持编辑，会自动赋给每个类型的 Draw 实例 | `boolean` | `true` |
| autoFocus | 绘制后是否自动激活，会自动赋给每个类型的 Draw 实例 | `boolean` | `true` |
| addMultiple | 在单次 enable 激活绘制中，是否支持绘制多个绘制物，会自动赋给每个类型的 Draw 实例 | `boolean` | `true` |
| multiple | 是否始终支持绘制多个绘制物，会自动赋给每个类型的 Draw 实例 | `boolean` | `true` |
| disableEditable | Draw 在禁用状态下是否支持编辑绘制物，建议在只有单个 Draw 项开启该配置，会自动赋给每个类型的 Draw 实例 | `boolean` | `false` |

### DrawConfig

| 属性名 | 描述 | 类型 |
| --- | --- | --- |
| point | 是否展示**绘制点**的 Control 项，传 false 表示不展示该 Control 项，options 配置 [详情可见](https://antv.vision/l7-draw-2.0-site/docs/draw/point) | [DrawItemConfig](#DrawItemConfig) or boolean |
| line | 是否展示**绘制线**的 Control 项，传 false 表示不展示该 Control 项，options 配置 [详情可见](https://antv.vision/l7-draw-2.0-site/docs/draw/line) | [DrawItemConfig](#DrawItemConfig) or boolean |
| polygon | 是否展示**绘制面**的 Control 项，传 false 表示不展示该 Control 项，options 配置 [详情可见](https://antv.vision/l7-draw-2.0-site/docs/draw/polygon) | [DrawItemConfig](#DrawItemConfig) or boolean |
| rect | 是否展示**绘制矩形**的 Control 项，传 false 表示不展示该 Control 项，options 配置 [详情可见](https://antv.vision/l7-draw-2.0-site/docs/draw/rect) | [DrawItemConfig](#DrawItemConfig) or boolean |
| circle | 是否展示**绘制圆形**的 Control 项，传 false 表示不展示该 Control 项，options 配置 [详情可见](https://antv.vision/l7-draw-2.0-site/docs/draw/circle) | [DrawItemConfig](#DrawItemConfig) or boolean |
| clear | 是否展示**清除**的 Control 项，传 false 表示不展示该 Control 项，无 options 配置 | [DrawItemConfig](#DrawItemConfig) or boolean |

### DrawItemConfig

| 属性名 | 描述 | 类型 |
| --- | --- | --- |
| title | 在 Control 项悬停时展示的文本 | string |
| icon | 在 Control 项中展示 React 组件，可以根据参数 isActive 切换展示效果 | React.FC<{isActive: boolean}> |
| options | 对应各个 Draw 绘制类的配置参数，详情可见[L7 Draw](https://antv.vision/l7-draw-2.0-site/docs/draw/point)，非绘制类 Control 无需配置（如 clear） | {} |

### DrawData

以下各个类型的数据均为 GeoJSON 规范中，不同类型的[Geometry Object](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1)数组，当前各个类型均不支持 Multiple 类型的数据。

| 属性名 | 描述 | 类型 |
| --- | --- | --- |
| point | [Point 类型](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.2)的数组 | Feature&lt;Point&gt;[] |
| line | [LineString 类型](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.4)的数组 | Feature&lt;LineString&gt;[] |
| polygon | [Polygon 类型](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6)的数组 | Feature&lt;Polygon&gt;[] |
| rect | [Polygon 类型](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6)的数组 | Feature&lt;Polygon&gt;[] |
| circle | [Polygon 类型](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6)的数组 | Feature&lt;Polygon&gt;[] |

样例

```json
{
  "point": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [120.14219284057617, 30.245573387470007]
      }
    }
  ],
  "line": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [120.14253616333006, 30.26410837298974],
          [120.15609741210938, 30.23889993659824],
          [120.16124725341797, 30.22021186371718]
        ]
      }
    }
  ],
  "polygon": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [120.09876251220703, 30.264701434772807],
            [120.0864028930664, 30.236675352276695],
            [120.12931823730467, 30.22036019573785],
            [120.09876251220703, 30.264701434772807]
          ]
        ]
      }
    }
  ],
  "rect": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [120.13275146484374, 30.18920556366512],
            [120.16313552856445, 30.18920556366512],
            [120.16313552856445, 30.207899526303294],
            [120.13275146484374, 30.207899526303294],
            [120.13275146484374, 30.18920556366512]
          ]
        ]
      }
    }
  ],
  "circle": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [120.112839, 30.369616586042888],
            [120.11839279208594, 30.36938106647049],
            [120.12389301854896, 30.368676779320197],
            [120.12928663269875, 30.367510517285723],
            [120.13452162059423, 30.365893528383655],
            [120.13954750468145, 30.363841407001324],
            [120.14431583229772, 30.36137394286987],
            [120.14878064424623, 30.358514929449957],
            [120.15289891885222, 30.355291933614918],
            [120.1566309871699, 30.351736028895214],
            [120.15994091530717, 30.347881494901767],
            [120.16279685017562, 30.343765485874407],
            [120.16517132534817, 30.33942767159815],
            [120.16704152411516, 30.33490985419426],
            [120.1683894972616, 30.330255564521625],
            [120.1692023335447, 30.325509642114348],
            [120.16947228132194, 30.32071780273318],
            [120.16919682026351, 30.315926197718873],
            [120.16837868257117, 30.31118096940562],
            [120.16702582361725, 30.306527806880585],
            [120.16515134240322, 30.30201150636233],
            [120.16277335271602, 30.29767554041679],
            [120.15991480632617, 30.29356164013502],
            [120.15660327002033, 30.289709394264225],
            [120.1528706586882, 30.286155869113028],
            [120.14875292709004, 30.28293525284691],
            [120.14428972330448, 30.280078527550785],
            [120.13952400720581, 30.277613172166614],
            [120.13450163763197, 30.27556289911699],
            [120.12927093218485, 30.273947427102563],
            [120.12388220384626, 30.272782292217393],
            [120.11838727879814, 30.272078699162257],
            [120.112839, 30.27184341395712],
            [120.10729072120185, 30.272078699162257],
            [120.10179579615372, 30.272782292217393],
            [120.09640706781512, 30.273947427102563],
            [120.09117636236802, 30.27556289911699],
            [120.0861539927942, 30.277613172166614],
            [120.08138827669549, 30.280078527550785],
            [120.07692507290994, 30.28293525284691],
            [120.07280734131177, 30.286155869113028],
            [120.06907472997965, 30.289709394264225],
            [120.0657631936738, 30.29356164013502],
            [120.06290464728396, 30.29767554041679],
            [120.06052665759675, 30.30201150636233],
            [120.05865217638272, 30.306527806880585],
            [120.0572993174288, 30.31118096940562],
            [120.05648117973648, 30.315926197718873],
            [120.05620571867803, 30.32071780273318],
            [120.05647566645527, 30.325509642114348],
            [120.05728850273837, 30.330255564521625],
            [120.05863647588481, 30.33490985419426],
            [120.0605066746518, 30.33942767159815],
            [120.06288114982436, 30.343765485874407],
            [120.0657370846928, 30.347881494901767],
            [120.0690470128301, 30.351736028895214],
            [120.07277908114776, 30.355291933614918],
            [120.07689735575374, 30.358514929449957],
            [120.08136216770225, 30.36137394286987],
            [120.08613049531854, 30.363841407001324],
            [120.09115637940575, 30.365893528383655],
            [120.09639136730122, 30.367510517285723],
            [120.10178498145103, 30.368676779320197],
            [120.10728520791403, 30.36938106647049],
            [120.112839, 30.369616586042888]
          ]
        ]
      }
    }
  ]
}
```
