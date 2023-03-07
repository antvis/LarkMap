---
order: 4
toc: content
group:
  title: 绘制组件
debug: true
---

## useDrawGroup

### 介绍

用于管理多个 L7Draw 实例共存时，Draw 实例的激活互斥、以及数据合集的 Hook。

### 默认示例

<code src="./demos/default.tsx" compact defaultShowCode></code>

### Params

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| config | 配置当前 Hook 需要哪几种类型的 Draw 实例，以及对应 Draw 的具体配置 | [UseDrawGroupConfig](#usedrawgroupconfig) |
| commonOptions | 各个 Draw 的通用配置，Hook 内部会将 commonOptions 下发至所有 Draw 的构造器配置中 | [DrawOptions](https://antv.vision/L7Draw/docs/draw/point#%E9%85%8D%E7%BD%AE) |

#### UseDrawGroupConfig

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| point | 是否开启 **绘制点**，以及对应的配置 | [DrawPointOptions](https://antv.vision/L7Draw/docs/draw/point#%E9%85%8D%E7%BD%AE)` &#124; boolean` |
| line | 是否开启 **绘制线**，以及对应的配置 | [DrawLineOptions](https://antv.vision/L7Draw/docs/draw/line#%E9%85%8D%E7%BD%AE)` &#124; boolean` |
| polygon | 是否开启 **绘制面**，以及对应的配置 | [DrawPolygonOptions](https://antv.vision/L7Draw/docs/draw/polygon#%E9%85%8D%E7%BD%AE)` &#124; boolean` |
| rect | 是否开启 **绘制矩形**，以及对应的配置 | [DrawRectOptions](https://antv.vision/L7Draw/docs/draw/rect#%E9%85%8D%E7%BD%AE)` &#124; boolean` |
| circle | 是否开启 **绘制圆形**，以及对应的配置 | [DrawCircleOptions](https://antv.vision/L7Draw/docs/draw/circle#%E9%85%8D%E7%BD%AE)` &#124; boolean` |

### Result

| 返回值 | 说明 | 类型 |
| --- | --- | --- |
| drawMap | 绘制类型与 Draw 实例的映射 | `Record<DrawType, Draw>` |
| drawGroupData | 绘制类型与 Draw 中绘制数据的映射 | `Record<DrawType, Feature[]>` |
| setDrawGroupData | 设置 Draw 组的绘制数据 | `(newData: Record<DrawType, Feature[]>) => void` |
| activeDraw | 当前激活的 Draw 实例，不存在则返回 `null` | `Draw &#124; null` |
| setActiveDraw | 设置当前激活的 Draw 实例，支持传入 Draw 实例本身或是其类型字符串 | `(activeDraw: Draw &#124; DrawType &#124; null) => void` |

#### DrawType

```ts
type DrawType = 'point' | 'line' | 'polygon' | 'rect' | 'circle';
```
