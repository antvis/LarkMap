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

## API

| 属性值      | 描述                           | 类型                                                    | 默认值 |
| ----------- | ------------------------------ | ------------------------------------------------------- | ------ |
| gaodeParams | 调用高德查询接口时传递的参数   | [GaodeLocationSearchParams](#GaodeLocationSearchParams) | -      |
| showAddress | 是否在列表中展示地点选项的地址 | `boolean`                                               | `true` |

### GaodeLocationSearchParams

| 属性值 | 描述                       | 类型     | 默认值 |
| ------ | -------------------------- | -------- | ------ |
| key    | 高德 Web API 服务的 key 值 | `string` | -      |

该其他配置可以查看高德的 [路径规划](https://lbs.amap.com/api/webservice/guide/api/direction)
