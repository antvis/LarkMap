---
toc: false
order: 1
nav:
  title: 区块
  path: /blocks
  order: 3
---

## 绘制弹框

### 介绍

用于在框内地图上绘制点、线、面等元素的弹框。

绘制弹框内部使用了 [LarkMap](/components/lark-map) 和 [LocationSearch](/components/location-search) 组件的能力，因此可以通过 [API](#api) 中的 `larkmapProps` 和 `locationSearchProps` 来对以上两组件进行更精细的控制。

### 代码演示

#### 默认演示

<code src="./draw-modal/default.tsx"></code>

#### 编辑面

<code src="./draw-modal/edit.tsx"></code>

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| drawConfig | 绘制部分的配置，详情可见 [DrawConfig](#drawconfig) | `DrawConfig` | `--` |
| larkmapProps | 地图部分的配置，详情可见 [LarkMapProps](/components/lark-map#api) | `LarkMapProps` | `--` |
| locationSearchProps | 地点搜索框配置，默认关闭，详情可见 [LocationSearchProps](/components/location-search#api) | `LocationSearchProps \| false` | `--` |
| onOk | 点击"提交"按钮的回调，会将当前绘制的 `GeoJSON` 作为参数传入 | `(drawData: DrawGroupData) => void` | `--` |
| onCancel | 点击"取消"按钮的回调 | `() => void` | `--` |

其他参数可以参照 [Ant Design 4.0 Modal](https://4x-ant-design.antgroup.com/components/modal-cn/#API)

#### DrawConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| point | 是否开启绘制点，以及绘制点的配置，详情可见 [DrawPointOptions](https://l7draw.antv.vision/docs/draw/point#%E9%85%8D%E7%BD%AE) | `DrawPointOptions \| boolean` | `--` |
| line | 是否开启绘制线，以及绘制线的配置，详情可见 [DrawLineOptions](https://l7draw.antv.vision/docs/draw/line#%E9%85%8D%E7%BD%AE) | `DrawLineOptions \| boolean` | `--` |
| polygon | 是否开启绘制面，以及绘制面的配置，详情可见 [DrawPolygonOptions](https://l7draw.antv.vision/docs/draw/polygon#%E9%85%8D%E7%BD%AE) | `DrawPolygonOptions \| boolean` | `--` |
| rect | 是否开启绘制矩形，以及绘制矩形的配置，详情可见 [DrawRectOptions](https://l7draw.antv.vision/docs/draw/rect#%E9%85%8D%E7%BD%AE) | `DrawRectOptions \| boolean` | `--` |
| circle | 是否开启绘制圆，以及绘制圆的配置，详情可见 [DrawCircleOptions](https://l7draw.antv.vision/docs/draw/circle#%E9%85%8D%E7%BD%AE) | `DrawCircleOptions \| boolean` | `--` |
