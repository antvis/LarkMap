---
toc: false
order: 3
nav:
  title: 区块
  path: /blocks
  order: 4
---

## 城市联级选择器

### 介绍

用于快速查找中国省/市/县行政区域并快速定位的控件，基于 Ant Design 中的 [Cascader](https://ant-design.antgroup.com/components/cascader-cn#api) 组件封装而成

### 代码演示

#### 默认示例

<code src="./administrative-select/demos/default.tsx" compact></code>

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFit | 是否控制地图自动平移到选项对应行政区域 | `boolean` | `true` |
| enableBoundary | 是否在地图上展示行政区域边界 | `boolean` | `true` |
| boundaryLayer | 边界线图层属性，可参考 [LineLayerProps](https://larkmap.antv.antgroup.com/components/layers/base-layers/line-layer#api) | `Omit<LineLayerProps, 'source'>` | `--` |

其他参数可以参照 [Ant Design 5.0 Cascader](https://ant-design.antgroup.com/components/cascader-cn#api)
