---
toc: content
order: 5
group:
  title: 分析组件
  order: 3
nav:
  title: 组件
  path: /components
---

## 行政区域定位 - RegionLocation

### 介绍

展示当前地图所在的行政区域，默认情况下会拾取地图展示区域左上和右下角的经纬度，通过高德 API 分别获取两点对应行政区域（省/市/区/街道），然后自下而上取交集拼接生成行政区域文本。

### 代码演示

<code src="./demos/default.tsx" defaultShowCode compact></code>

### API

| 属性值 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| searchParams | 调用高德查询接口时传递的参数，必传 | [GaodeRegionLocationParams](#gaodeRegionLocationparams) | - |
| transformBounds | 对地图搜索区域对应左上和右下点进行自定义，默认不传则展示整个地图展示区域 | `(bounds: Bounds) => Bounds` | - |
| className | 控件容器自定义样式 | `string` | - |
| style | 控件容器自定义 style | `CSSProperties` | - |
| onChange | 当展示的行政区域发生变更时的回调函数 | `(result: string, bounds: Bounds) => void` | - |

#### GaodeRegionLocationParams

| 属性值 | 描述                              | 类型     | 默认值 |
| ------ | --------------------------------- | -------- | ------ |
| key    | 高德 Web API 服务的 key 值 (必传) | `string` | -      |

该其他配置可以查看高德的 [逆地理编码](https://lbs.amap.com/api/webservice/guide/api/georegeo#/regeo)
