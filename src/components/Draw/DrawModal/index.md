---
order: 1
toc: content
group:
  title: 绘制组件
  order: 10
---

## 绘制弹框

### 介绍

用于在框内地图上绘制点、线、面等元素的弹框。

### 代码演示

#### 默认演示

<code src="./demos/default.tsx"></code>

#### 编辑面

<code src="./demos/edit.tsx"></code>

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| drawConfig | 地图部分的配置，详情可见 [LarkMapProps](/components/lark-map#api) | `LarkMapProps` | `--` |
| larkmapProps | 地图部分的配置，详情可见 [LarkMapProps](/components/lark-map#api) | `LarkMapProps` | `--` |
| locationSearchProps | 地点搜索框配置，默认关闭，详情可见 [LocationSearchProps](/components/location-search#api) | `LocationSearchProps \| false` | `--` |
| onOk | 点击"提交"按钮的回调，会将当前绘制的 `GeoJSON` 作为参数传入 | `(drawData: DrawGroupData) => void` | `--` |

其他参数可以参照 [Ant Design 4.0 Modal](https://4x-ant-design.antgroup.com/components/modal-cn/#API)
