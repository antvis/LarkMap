---
toc: content
order: 4
group:
  title: 分析组件
  order: 3
nav:
  title: 组件
  path: /components
---

## 地点搜索 - LocationSearch

### 介绍

内置调用高德搜索 API 的下拉框组件，支持输入地名进行模糊搜索，可以获取搜索地点结果的名称、地址、经纬度等信息。

**注意：`LocationSearch` 组件在 `1.3.0` 之后将不再基于 `Ant Design` 的 `Select`，因此针对 `Ant Design` 的所有配置和样式覆盖将会失效。**

### 代码演示

<code src="./demos/default.tsx" defaultShowCode compact></code>

### API

| 属性值 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| searchParams | 调用高德查询接口时传递的参数 | [GaodeLocationSearchParams](#GaodeLocationSearchParams) | - |
| value | 当前选中地点的名称 | `string` | - |
| onChange | 选中选项发生改变时（包含清空）的回调， | `(name?: string, option?: LocationSearchOption) => void` | - |
| onSearchFinish | 根据关键字搜索得出的选项发生改变时的回调 | `(options: LocationSearchOption[]) => void` | - |
| showDistrict | 是否展示地点选项的省市区 | `boolean` | `true` |
| showAddress | 是否展示地点选项的详细地址 | `boolean` | `true` |
| className | 控件容器自定义样式 | `string` | - |
| style | 控件容器自定义 style | `CSSProperties` | - |

其他配置可参考 Antd 的 [Select 组件](https://github.com/react-component/select)。

#### GaodeLocationSearchParams

| 属性值     | 描述                              | 类型                      | 默认值      |
| ---------- | --------------------------------- | ------------------------- | ----------- |
| key        | 高德 Web API 服务的 key 值 (必传) | `string`                  | -           |
| privateKey | 高德 Web API 服务数字签名私钥     | `string &#124; undefined` | `undefined` |

该其他配置可以查看高德的 [输入提示](https://lbs.amap.com/api/webservice/guide/api/inputtips)

#### LocationSearchOption

该类型为调用高德接口返回的地点对象的类型描述

```ts
type LocationSearchOption = {
  id: string;
  name: string;
  location: string;
  longitude: number;
  latitude: number;
  district: string;
  adcode: string;
  address: string;
};
```
