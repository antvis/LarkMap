---
toc: content
order: 4
group:
  title: 控件组件
  order: 2
nav:
  title: 组件
  path: /components
---

# 地点搜索 - LocationSearch

## 介绍

调用高德搜索

## 代码演示

### 默认示例

<code src="./demos/default.tsx" defaultShowCode></code>

### 使用场景

<code src="./demos/control.tsx" defaultShowCode></code>

## API

| 属性值 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gaodeParams | 调用高德查询接口时传递的参数 | [GaodeLocationSearchParams](#GaodeLocationSearchParams) | - |
| value | 当前选中地点的 id | `string &#124; undefined` | - |
| onChange | 选中选项发生改变时（包含清空）的回调， | `(id?: string, option?: LocationSearchOption) => void` | - |
| onOptionsChange | 根据关键字搜索得出的选项发生改变时的回调 | `(options: LocationSearchOption[]) => void` | - |
| showAddress | 是否在列表中展示地点选项的地址 | `boolean` | `true` |
| position | 控件所在地图悬停的位置 | `PositionType` | `'topleft'` |
| className | 控件容器自定义样式 | `string` | - |
| style | 控件容器自定义 style | `CSSProperties` | - |

其他配置可参考 Antd 的 [Select 组件](https://ant.design/components/select-cn/#API)。

### GaodeLocationSearchParams

| 属性值 | 描述                              | 类型     | 默认值 |
| ------ | --------------------------------- | -------- | ------ |
| key    | 高德 Web API 服务的 key 值 (必传) | `string` | -      |

该其他配置可以查看高德的 [路径规划](https://lbs.amap.com/api/webservice/guide/api/direction)

### LocationSearchOption

该类型为调用高德接口返回的地点对象的类型描述

```ts
type LocationSearchOption = {
  id: string;
  parent: string | any[];
  childtype: string | any[];
  name: string;
  type: string;
  typecode: string;
  biz_type: any[];
  address: string;
  location: string;
  tel: string | any[];
  pname: string;
  cityname: string;
  adname: string;
  importance: any[];
  shopid: any[];
  shopinfo: string;
  poiweight: any[];
  distance: any[];
  parking_type?: string;
  biz_ext: {
    rating: string | any[];
    cost: any[];
  };
  photos: {
    title: any[];
    url: string;
  }[];
};
```
