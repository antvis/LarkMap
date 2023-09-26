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

用于快速查找省市县位置并迅速定位到指定位置

### 代码演示

#### 默认示例

<code src="./administrative-select/demos/default.tsx" compact></code>

### API

| 参数           | 说明             | 类型                               | 默认值 |
| -------------- | ---------------- | ---------------------------------- | ------ |
| value          | 指定选中项       | `string[]｜number[]`               | `--`   |
| onChange       | 选择完成后的回调 | `(value, selectedOptions) => void` | `--`   |
| enableBoundary | 是否显示边界     | `boolean`                          | `true` |
| autoFit        | 是否平移         | `boolean`                          | `true` |
| boundaryLayer  | 边界 layer 属性  | `Omit<LineLayerProps, 'source'>`   | `--`   |

其他参数可以参照 [Ant Design 5.0 Cascader](https://ant-design.antgroup.com/components/cascader-cn#api)
